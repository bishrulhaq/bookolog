import Link from "next/link"

const page = () => {
  return (
    <div>
      <h1>This is my about page</h1>
      <Link href='/'><button className="border border-black font-bold">Back to home page</button></Link>
    </div>
  )
}

export default page 