import Link from "next/link";
import SavedMoviesList from "@/components/saved/SavedMoviesList";
import { SavedMoviesCount } from "@/components/saved/SavedMoviesList";
import "@/styles/App.css";
import UserProfileDropdown from "@/components/user/UserProfileDropdown";

export default function SavedMoviesPage() {
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className="w-full sm:py-5 px-3 md:px-10 mb-9">
          <div className="flex items-center justify-between w-full relative">
            <Link
              href="/"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden md:inline">Back</span>
            </Link>
            <div className=" flex items-center pl-4 md:pl-8  md:w-15 md:h-15  z-50">
            <UserProfileDropdown  align="left" leftOffset="left-23 sm:left-30" />
          </div>
            <h1 className="m-0 absolute left-1/2 -translate-x-1/2 text-sm md:text-6xl">Your <span className="text-gradient text-sm md:text-6xl">Saved</span> Movies</h1>
           
            <div className="flex items-center gap-3 shrink-0 ml-auto">
                <SavedMoviesCount />
            </div>
          </div>
        </header>

        <section className="all-movies max-w-md sm:max-w-7xl mx-auto w-full">
          <SavedMoviesList />
        </section>
      </div>
    </main>
  );
}
