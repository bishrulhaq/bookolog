const fetchBooks = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/book');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch books');
    }
  } catch (error) {
    throw error;
  }
};

export default fetchBooks;