import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name?: string;
  image?: string;
  notifications: {
    email: boolean;
    push: boolean;
    newFeatures: boolean;
    deckUpdates: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    cardDisplayStyle: 'grid' | 'list';
    enableAnimations: boolean;
    compactMode: boolean;
  };
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      index: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      index: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    notifications: {
      type: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
        newFeatures: {
          type: Boolean,
          default: true,
        },
        deckUpdates: {
          type: Boolean,
          default: true,
        },
      },
      default: {
        email: true,
        push: true,
        newFeatures: true,
        deckUpdates: true,
      },
    },
    preferences: {
      type: {
        theme: {
          type: String,
          enum: ['light', 'dark', 'system'],
          default: 'system',
        },
        cardDisplayStyle: {
          type: String,
          enum: ['grid', 'list'],
          default: 'grid',
        },
        enableAnimations: {
          type: Boolean,
          default: true,
        },
        compactMode: {
          type: Boolean,
          default: false,
        },
      },
      default: {
        theme: 'system',
        cardDisplayStyle: 'grid',
        enableAnimations: true,
        compactMode: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);