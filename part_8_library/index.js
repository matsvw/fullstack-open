const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books
      if (args.author) {
        const auth = args.author.toLowerCase()
        filteredBooks = filteredBooks.filter(b => b.author.toLowerCase().includes(auth)) // partial, case insensitive, match ok for author
      }
      if (args.genre) {
        const genre = args.genre.toLowerCase()
        filteredBooks = filteredBooks.filter(b => b.genres.map(g => g.toLowerCase()).includes(genre)) // genre name must match, but is not case sensitive
      }

      return filteredBooks
    },

    allAuthors: (root, args, context, info) => {

      const selections = info.fieldNodes?.[0]?.selectionSet?.selections ?? []
      const requestedBookCount = selections.some(sel => sel.kind === 'Field' && sel.name.value === 'bookCount')

      if (!requestedBookCount) {
        return authors
      }
      console.log('Calculating book count for each author')
      const authorBookCount = authors.map(a => {
        const bookCount = books.filter(b => b.author === a.name).length
        return { ...a, bookCount }
      })
      return authorBookCount
    },
  },
  Mutation: {
    addBook: (root, args) => {

      // Apparently the default check treats an empty string as a valid value
      if (!args.title || !args.author) {
        throw new GraphQLError('Title and author are mandatory', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [args.title, args.author]
          }
        })
      }

      if (books.find(p => p.title.toLowerCase() === args.title.toLowerCase())) { //keeping this as it makes sense.
        throw new GraphQLError('Title must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }

      let author = authors.find(a => a.name.toLowerCase() === args.author.toLowerCase())
      if (!author) {
        author = { name: args.author, id: uuid() } //birthyear not known
        authors = authors.concat(author)
      }

      const book = { ...args, author: author.name, id: uuid() } // update author name to ensure case matches
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => args.name.toLowerCase() === a.name.toLowerCase())
      if (author) {
        author.born = args.setBornTo
        authors = authors.map(a => a.id === author.id ? author : a)
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