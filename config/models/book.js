import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel;
