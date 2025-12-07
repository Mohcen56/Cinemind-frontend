"use client";

import React from 'react'
import Image from 'next/image'

interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

const Search: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <Image src="/search.svg" alt="search" width={20} height={20} />

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search
