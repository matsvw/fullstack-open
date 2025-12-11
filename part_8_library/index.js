const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = /* GraphQL */`
  type Book {
    title: String!
    published: Int
    author: String!
    genres: [String]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation { 
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => async () => Book.collection.countDocuments(),
    authorCount: () => async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}

      //TODO - currently this is not case insensitive
      if (args.author) {
        filter.author = args.author
      }
      if (args.genre) {
        filter.genres = args.genre //this should match any
      }
      const filteredBooks = Book.find(filter)
      return filteredBooks
    },

    allAuthors: async (root, args, context, info) => {

      const selections = info.fieldNodes?.[0]?.selectionSet?.selections ?? []
      const requestedBookCount = selections.some(sel => sel.kind === 'Field' && sel.name.value === 'bookCount')

      //TODO - could this be done with a single roundtrip?
      const authors = Author.find({})
      if (!requestedBookCount) {
        return authors
      }
      console.log('Calculating book count for each author')
      const authorBookCount = authors.map(a => {
        const books = Book.find({})
        const bookCount = books.filter(b => b.author === a.name).length
        return { ...a, bookCount }
      })
      return authorBookCount
    },
  },
  Mutation: {
    addBook: async (root, args) => {

      // Apparently the default check treats an empty string as a valid value
      if (!args.title || !args.author) {
        throw new GraphQLError('Title and author are mandatory', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [args.title, args.author]
          }
        })
      }

      // Unique check for title removed as MongoDB should handle that

      //TODO - this is now not case insensitive
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author }) //birthyear not known
        newAuthor.save()
      }

      const newBook = new Book({ ...args })
      newBook.save()
      return newBook
    },
    editAuthor: async (root, args) => {
      //TODO - this is now not case insensitive
      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        author.save()
      }
      return author
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})