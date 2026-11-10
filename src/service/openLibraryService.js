
const BASE_URL = "https://openlibrary.org";

export const bookService = {

  async searchBooks(query, options = {}) {

    if (!query.trim()) {
      return {
        books: [],
        total: 0
      };
    }

    const {
      limit = 20,
      page = 1
    } = options;

    // 1. Construct the query parameters
    const params = new URLSearchParams({
      q: query,
      fields: [
        "key",
        "title",
        "author_name",
        "first_publish_year",
        "cover_i",
        "edition_count"
      ].join(","),
      limit: String(limit),
      page: String(page)
    });

    // 2. Send the HTTP request
    const response = await fetch(
      `${BASE_URL}/search.json?${params}`
    );
    
    // 3. Check whether the request succeeded
    if (!response.ok) {
      throw new Error(
        `Open Library error: ${response.status}`
      );
    }

    // 4. Convert JSON into JavaScript
    const data = await response.json();

    // 5. Normalize the API response
    const books = (data.docs ?? [])
    .map((book) => normalizeBook(book))
    .filter((book) => book !== null);

    return {
      books,
      total: data.numFound
    };
  },

  async getBookById(workId) {

    const response = await fetch(
      `${BASE_URL}${workId}.json`
    );

    if (!response.ok) {
      throw new Error(
        `Could not retrieve book: ${response.status}`
      );
    }

    return response.json();
  }

};


// Convert Open Library data into our application's format
function normalizeBook(book) {

  if (!book.key || !book.title) {
    return null;
  }

  return {
    id: book.key,

    title: book.title,

    author: book.author_name?.join(", ")
      || "Unknown author",

    firstPublishYear:
      book.first_publish_year ?? null,

    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : null,

    editionCount: book.edition_count ?? 0
  };
}
