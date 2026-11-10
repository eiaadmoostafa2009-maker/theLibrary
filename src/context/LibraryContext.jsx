
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

// Create Context
const LibraryContext = createContext(null);


// Provider
export function LibraryProvider({ children }) {

  // Load saved favourites from localStorage
  const [favourites, setFavourites] = useState(() => {

    try {

      const saved = localStorage.getItem("favourites");

      return saved ? JSON.parse(saved) : [];

    } catch {

      return [];

    }

  });


  // Save favourites whenever they change
  useEffect(() => {

    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites)
    );

  }, [favourites]);


  // Add or remove a favourite
  function toggleFavourite(book) {

    setFavourites((currentFavourites) => {

      const alreadyExists = currentFavourites.some(
        (item) => item.id === book.id
      );

      if (alreadyExists) {

        return currentFavourites.filter(
          (item) => item.id !== book.id
        );

      }

      return [...currentFavourites, book];

    });

  }


  // Check whether a book is favourite
  function isFavourite(bookId) {

    return favourites.some(
      (book) => book.id === bookId
    );

  }


  const value = {
    favourites,
    toggleFavourite,
    isFavourite
  };


  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );

}


// Custom Hook
export function useLibrary() {

  const context = useContext(LibraryContext);

  if (!context) {

    throw new Error(
      "useLibrary must be used inside LibraryProvider"
    );

  }

  return context;

}
