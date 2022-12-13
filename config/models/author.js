import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    career: Number,
    age: Number,
  },
  {
    timestamps: true,
  }
);

const authorModel = mongoose.model('Author', authorSchema);

export default authorModel;
