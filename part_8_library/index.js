const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int
    author: Author!
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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const isAuthenticated = (context, throwError = true) => {
  const isAuth = Boolean(context?.currentUser)
  if (!isAuth && throwError) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
    });
  }
  return isAuth
}

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
    },
    allBooks: async (root, args) => {
      const filter = {}

      if (args.genre) {
        filter.genres = { $regex: args.genre, $options: "i" }
      }
      console.log(filter)
      let filteredBooks = await Book
        .find(filter)
        .populate('author')

      //console.log(filteredBooks)
      if (args.author) {
        // cannot filter in Mongo on linked object as populate comes after filter (possible using pipeline)
        filteredBooks = filteredBooks.filter(b => b.author?.name && b.author.name.toLowerCase().includes(args.author.toLowerCase()))
      }

      return filteredBooks
    },

    allAuthors: async (root, args, context, info) => {

      const selections = info.fieldNodes?.[0]?.selectionSet?.selections ?? []
      const requestedBookCount = selections.some(sel => sel.kind === 'Field' && sel.name.value === 'bookCount')

      let authors = await Author.find({}).lean() //need to convert to lean here for the mapping below to work
      if (requestedBookCount) {
        console.log('Calculating book count for each author')
        const books = await Book.find({}).lean()
        authors = authors.map(a => {
          const bookCount = books.filter(b => b.author.equals(a._id)).length
          return { ...a, id: a._id, bookCount }
        })
      }
      else {
        authors = authors.map(a => ({ ...a, id: a._id }))
      }
      //console.log(authors)
      return authors
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      isAuthenticated(context)

      // Apparently the default check treats an empty string as a valid value
      if (!args.title || !args.author) {
        throw new GraphQLError('Title and author are mandatory', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [args.title, args.author]
          }
        })
      }

      let author = await Author.findOne({ name: { $regex: args.author, $options: "i" } })
      if (!author) {
        author = new Author({ name: args.author }) //birthyear not known
        try {
          await author.save()
        } catch (error) {
          console.log(error)
          console.log(error.message)
          throw new GraphQLError(error.message ?? 'Adding new author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const newBook = new Book({ ...args, author: author })

      try {
        await newBook.save()
      } catch (error) {
        console.log(error)
        console.log(error.message)
        throw new GraphQLError(error.message ?? 'Adding new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: newBook,
            error
          }
        })
      }
      return newBook
    },
    editAuthor: async (root, args, context) => {
      isAuthenticated(context)

      //Case insensitive partial match might not be the best here
      const author = await Author.findOne({ name: { $regex: args.name, $options: "i" } })
      if (author) {
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(error.message ?? 'Updating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo,
              error
            }
          })
        }
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError(error.message ?? 'Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('W rong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})