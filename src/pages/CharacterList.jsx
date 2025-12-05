// src/pages/CharacterList.jsx (UPDATED with debounce and pagination)
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

import { fetchItems } from "../features/itemsSlice";

import CharacterCard from "../components/CharacterCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

const CharacterList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { list, loadingList, errorList } = useSelector((state) => state.items);

  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [itemsPerPage] = useState(10);

  // Debounce search input
  const debouncedSearch = useDebounce(searchInput, 400);

  // Fetch data when debounced search or page changes
  useEffect(() => {
    dispatch(fetchItems(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  // Update URL params
  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.q = debouncedSearch;
    if (currentPage > 1) params.page = currentPage;
    setSearchParams(params);
  }, [debouncedSearch, currentPage, setSearchParams]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedList = list.slice(startIndex, endIndex);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loadingList) return <Spinner />;
  if (errorList) return <ErrorBox message={errorList} />;

  return (
    <div className="character-list-page">
      <div className="list-header">
        <h2>Dimensional Character Roster</h2>

        <input
          type="text"
          placeholder="Search by name (e.g., Rick Sanchez)"
          value={searchInput}
          onChange={handleSearchChange}
          className="search-input"
        />

        <p style={{ color: "var(--color-text-dim)", marginTop: "15px" }}>
          {list.length === 0 && debouncedSearch
            ? `No results found for "${debouncedSearch}".`
            : `${list.length} entities found. Showing ${paginatedList.length} on page ${currentPage}.`}
        </p>
      </div>

      {/* Character Grid */}
      <div className="character-grid">
        {paginatedList.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="cta-button"
            style={{
              padding: '8px 16px',
              fontSize: '0.9rem',
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>

          <span style={{ color: 'var(--color-text-light)', fontWeight: 'bold' }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cta-button"
            style={{
              padding: '8px 16px',
              fontSize: '0.9rem',
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterList;