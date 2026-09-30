import React, { useState } from "react";

const Search = ({ data, onSearch }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-500 py-1.5 placeholder:px-4"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-1.5 bg-blue-950 rounded-md text-white"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
