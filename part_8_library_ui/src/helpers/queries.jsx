import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
      id
      name
      born
      bookCount
  }
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
      id
      title
      published
      genres
      author {
        ...AuthorDetails
      }
      id
  }
  ${AUTHOR_DETAILS}
`
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`
const EDIT_AUTHOR = gql`
  mutation setBornYear(
    $author: String!
    $born: Int!
  ) {
      editAuthor(name: $author, setBornTo: $born) {
        ...AuthorDetails
      }
    }
  ${AUTHOR_DETAILS}
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
const FILTER_BOOKS = gql`
  query filterBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
       }
  }
  ${BOOK_DETAILS}
`
const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
  }
}
  ${BOOK_DETAILS}
`

const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      ...AuthorDetails
  }
}
  ${AUTHOR_DETAILS}
`


export default { AUTHOR_DETAILS, BOOK_DETAILS, ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS, FILTER_BOOKS, ADD_BOOK, LOGIN, ME, BOOK_ADDED, AUTHOR_ADDED }