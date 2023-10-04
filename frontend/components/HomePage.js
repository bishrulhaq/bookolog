import NavBar from "./NavBar"
const HomePage = ({ books }) => {

  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {books && books.slice(0, 50).map((book, index) => (
          <div key={index} className="col-span-1">
            <p>Title: {book?.title}</p>
            <p>Sub Title: {book?.subtitle}</p>
            <p>Book ID: {book?.book_uid}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage