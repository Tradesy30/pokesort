import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import dbConnect from "@/lib/db/connect";
import User from "@/lib/models/User";
import { authOptions } from "@/app/api/auth/auth.config";

const updateSettingsSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
  email: z.string().email("Invalid email address"),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    newFeatures: z.boolean(),
    deckUpdates: z.boolean(),
  }),
  preferences: z.object({
    theme: z.enum(["light", "dark", "system"]),
    cardDisplayStyle: z.enum(["grid", "list"]),
    enableAnimations: z.boolean(),
    compactMode: z.boolean(),
  }),
});

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "You must be logged in" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const validatedFields = updateSettingsSchema.safeParse(body);

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

    const { username, email } = validatedFields.data;

    // Check if username or email is already taken by another user
    const existingUser = await User.findOne({
      _id: { $ne: session.user.id },
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return NextResponse.json(
        {
          error: "DUPLICATE_ERROR",
          field,
          message: `This ${field} is already taken`
        },
        { status: 409 }
      );
    }

    // Update user settings
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        $set: validatedFields.data
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "NOT_FOUND", message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: updatedUser._id.toString(),
        username: updatedUser.username,
        email: updatedUser.email,
        notifications: updatedUser.notifications,
        preferences: updatedUser.preferences,
      },
    });
  } catch (error: any) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      {
        error: "SERVER_ERROR",
        message: "An unexpected error occurred"
      },
      { status: 500 }
    );
  }
}