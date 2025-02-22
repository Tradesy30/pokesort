import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for a Pokemon document
export interface IPokemon extends Document {
  number: string;
  name: string;
  types: string[];
  rarity: string;
  variant?: string;
  isCollected: boolean;
  imageUrl?: string;
  generation: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema
const PokemonSchema = new Schema<IPokemon>(
  {
    number: {
      type: String,
      required: [true, 'Please provide a Pokémon number'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a Pokémon name'],
      trim: true,
    },
    types: {
      type: [String],
      required: [true, 'Please provide at least one type'],
      validate: {
        validator: function(v: string[]) {
          return v.length > 0;
        },
        message: 'A Pokémon must have at least one type',
      },
    },
    rarity: {
      type: String,
      required: [true, 'Please provide a rarity'],
      enum: ['Common', 'Uncommon', 'Rare', 'Ultra Rare'],
    },
    variant: {
      type: String,
      required: false,
    },
    isCollected: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    generation: {
      type: Number,
      required: [true, 'Please provide a generation number'],
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
// Removing duplicate number index since it's already defined in the schema
PokemonSchema.index({ name: 1 });
PokemonSchema.index({ types: 1 });
PokemonSchema.index({ rarity: 1 });
PokemonSchema.index({ isCollected: 1 });
PokemonSchema.index({ generation: 1 });

// Export the model
export default mongoose.models.Pokemon || mongoose.model<IPokemon>('Pokemon', PokemonSchema);