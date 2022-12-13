import Dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import db from './config/mongoDB.js';

// import bookModel from './config/models/book.js';
// import authorModel from './config/models/author.js';
import schema from './config/schema.js';

Dotenv.config();
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
  title: String
  author: [Author]
  _id : String
}
  type Author{
    name : String
    career : Int
    age : Int
  }

  type Result{
    result : String
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books:[Book]
    booksFind(title:String,author:String): [Book]
    authors : [Author]
  }
  type Mutation{
    insertAuthor(
      name : String
      career : Int
      age : Int
    ):Author

    insertBook(
      title : String
      author : String
    ):Result
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
/**
 * @type {import(ApolloServer)}
 */
const resolvers = {
  Query: {
    books: async () => {
      const booksList = await schema.bookModel.find().populate('author');
      return booksList;
    },
    booksFind: async (parent, args, contextValue, info) => {
      Object.keys(args).forEach((key) => {
        args[key] = { $regex: args[key] };
      });
      return await schema.bookModel.find(args);
    },
    authors: async () => await schema.authorModel.find(),
  },
  
  Mutation: {
    insertAuthor: async (parent, args, contextValue, info) => {
      const newAuthor = new authorModel(args);
      await newAuthor.save();
      return newAuthor;
    },
    insertBook: (parent, args, contextValue, info) =>{
      authorModel.findOne({name : args.author}).exec().then((res)=>{
          if(res){
          const body = {
            title : args.title,author : res._id
          }
          console.log(body);
          const newBook = new bookModel(body);
          newBook.save().then((res)=>{
            console.log(res);
          })
        }else{
          console.log("Is Null")
        }
        });

    } 
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
});

console.log(`🚀  Server ready at: ${url}`);
