import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation setBornYear(
    $author: String!
    $born: Int!
  ) {
      editAuthor(name: $author, setBornTo: $born) {
        name
        born
        id
      }
    }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
      published
      genres
      id
    }
  }
`

export default { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS, ADD_BOOK }