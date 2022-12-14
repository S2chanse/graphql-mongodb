export default bookQueryResolve = {
  books: async () => {
    const booksList = await bookModel.find().populate('author');
    return booksList;
  },
  booksFind: async (parent, args, contextValue, info) => {
    Object.keys(args).forEach((key) => {
      args[key] = { $regex: args[key] };
    });
    return await bookModel.find(args);
  },
};
