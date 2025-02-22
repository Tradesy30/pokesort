import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import Pokemon, { IPokemon } from '@/lib/models/Pokemon';

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const generation = searchParams.get('generation');
    const type = searchParams.get('type');
    const isCollected = searchParams.get('isCollected');

    // Build query
    const query: any = {};
    if (generation) query.generation = parseInt(generation);
    if (type) query.types = type;
    if (isCollected) query.isCollected = isCollected === 'true';

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const pokemon = await Pokemon.find(query)
      .sort({ number: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Pokemon.countDocuments(query);

    return NextResponse.json({
      pokemon,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const pokemon = await Pokemon.create(body);

    return NextResponse.json(pokemon, { status: 201 });
  } catch (error: any) {
    console.error('Database error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A Pokemon with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}