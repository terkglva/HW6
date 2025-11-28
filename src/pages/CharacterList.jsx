import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  fetchItems,
  setQuery,
} from "../features/itemsSlice";

import CharacterCard from "../components/CharacterCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

const CharacterList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { list, loadingList, errorList, query } = useSelector((state) => state.items);

  const currentQuery = searchParams.get("q") || "";

  // sync query from URL → Redux
  useEffect(() => {
    dispatch(setQuery(currentQuery));

    const timeout = setTimeout(() => {
      dispatch(fetchItems(currentQuery));
    }, 400);

    return () => clearTimeout(timeout);
  }, [currentQuery, dispatch]);

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    newQuery ? setSearchParams({ q: newQuery }) : setSearchParams({});
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
          value={currentQuery}
          onChange={handleSearchChange}
          className="search-input"
        />

        <p style={{ color: "var(--color-text-dim)", marginTop: "15px" }}>
          {list.length === 0 && currentQuery
            ? `No results found for "${currentQuery}".`
            : `${list.length} entities found across all dimensions.`}
        </p>
      </div>

      <div className="character-grid">
        {list.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
