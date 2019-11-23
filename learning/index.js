const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    type Book {
      title: String
      author: Author
    }

    type Author {
      name: String
      books: [Book]
    }

    
    type Query {
      getBooks: [Book]
      getAuthors: [Author]
    }

    type Mutation {
      addBook(title: String, author: String): Book
    }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const authors = [
  {
    name: 'J.K. Rowling',
    book: 'Harry Potter and the Chamber of Secrets',
  },
];

const resolvers = {
  Query: {
    getBooks: () => books,
    getAuthors: () => authors,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
