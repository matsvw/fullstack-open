
import queries from '../helpers/queries'

const getUniqueListById = (list) => {
  // This approach will keep the last entry
  const map = new Map();
  for (const item of list) {
    map.set(item?.id, item);
  }
  return Array.from(map.values());
}

const updateAllBooks = (cache, newBook) => {
  cache.updateQuery({ query: queries.ALL_BOOKS }, (data) => {
    const allBooks = data?.allBooks
    console.log('Cached books: ', allBooks)
    return {
      allBooks: allBooks ? getUniqueListById(allBooks.concat(newBook)) : null,
    }
  })
  updateBooksByGenre(cache, newBook)
}

const updateBooksByGenre = (cache, newBook) => {
  newBook.genres.forEach((g) => {
    cache.updateQuery(
      {
        query: queries.FILTER_BOOKS,
        variables: { author: null, genre: g }, //format needs to match exactly what is used in other places
      },
      (data) => {
        const allBooks = data?.allBooks
        return {
          allBooks: allBooks ? getUniqueListById(allBooks.concat(newBook)) : null,
        }
      }
    )
  })
}

const updateAllAuthors = (cache, newAuthor) => {
  cache.updateQuery({ query: queries.ALL_AUTHORS }, (data) => {
    const allAuthors = data?.allAuthors
    console.log('Cached authors: ', allAuthors)
    return {
      allAuthors: allAuthors ? getUniqueListById(allAuthors.concat(newAuthor)) : null,
    }
  })
}

export const bookAdded = (data, client) => {
  const addedBook = data.data.bookAdded
  console.log("Book added: ", addedBook)
  alert(`The book ${addedBook.title} was just added`)
  updateAllBooks(client.cache, addedBook)
}

export const authorAdded = (data, client) => {
  const addedAuthor = data.data.authorAdded
  console.log("Author added: ", addedAuthor)
  updateAllAuthors(client.cache, addedAuthor)
}