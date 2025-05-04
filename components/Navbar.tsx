import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
        <Link href={'/'} className="text-stone font-bold text-white">TODOLIST</Link>
        <Link href={'/addTopic'} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.25 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add</Link>
    </nav>
      )
}
