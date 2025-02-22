import mongoose from 'mongoose';

interface GlobalMongoose {
  isConnected?: boolean;
}

declare global {
  var mongoose: GlobalMongoose;
}

if (!global.mongoose) {
  global.mongoose = {};
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
async function dbConnect() {
  try {
    if (global.mongoose.isConnected) {
      return mongoose;
    }

    await mongoose.connect(MONGODB_URI!, {
      bufferCommands: true,
    });

    global.mongoose.isConnected = true;
    return mongoose;
  } catch (e) {
    global.mongoose.isConnected = false;
    throw e;
  }
}

export default dbConnect;