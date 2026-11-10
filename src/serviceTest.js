import { bookService } from "./service/openLibraryService";

async function test() {

  try {

    const result = await bookService.searchBooks("1984");

    console.log("Total results:", result.total);

    console.log("Books:", result.books);

  } catch (error) {

    console.error("Something went wrong:", error);

  }

}

test();
