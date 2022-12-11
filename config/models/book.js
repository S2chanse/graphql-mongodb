import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title : {
    type : String,
    require : true
},
  author: String,
  _id :String,
  timestamps: true,
  
});

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel ;