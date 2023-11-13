import NavBar from "@/components/NavBar"
import SearchBar from "@/components/SearchBar"
import GenreCarousel from "@/components/GenreCarousel"

const Header = () => {
  return (
    <>
      <NavBar />
      <SearchBar />
      <GenreCarousel className="mx-auto max-w-screen-xl" />
    </>
  )
}

export default Header