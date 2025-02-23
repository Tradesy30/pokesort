import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/db/connect";
import User from "@/lib/models/User";
import { isRateLimited, getRateLimitResponse } from "@/lib/rate-limit";
import { headers } from 'next/headers';

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0] || 'unknown';

    if (isRateLimited({ ip, route: 'signup' })) {
      return getRateLimitResponse();
    }

    await dbConnect();

    const body = await request.json();
    const validatedFields = signUpSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          details: validatedFields.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const { username, email, password } = validatedFields.data;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return NextResponse.json(
        {
          error: "DUPLICATE_ERROR",
          field,
          message: `This ${field} is already registered`
        },
        { status: 409 }
      );
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        error: "SERVER_ERROR",
        message: "An unexpected error occurred"
      },
      { status: 500 }
    );
  }
}