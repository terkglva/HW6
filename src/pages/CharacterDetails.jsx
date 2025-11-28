import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchItemById,
  clearSelected,
} from "../features/itemsSlice";

import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { selectedItem, loadingItem, errorItem } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(fetchItemById(id));

    return () => {
      dispatch(clearSelected());
    };
  }, [id, dispatch]);

  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;

  const character = selectedItem;

  if (!character) return null;

  const statusClass = `status-${character.status.replace(/\s/g, "")}`;

  return (
    <div className="character-details-page" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        className="cta-button"
        style={{ marginBottom: "30px", padding: "10px 20px", fontSize: "1rem" }}
      >
        ← Back to List
      </button>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
          backgroundColor: "var(--color-card-bg)",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <img
          src={character.image}
          alt={character.name}
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "8px",
            border: "2px solid var(--color-portal-green)",
          }}
        />

        <div>
          <h1 style={{ color: "var(--color-acid-purple)", textShadow: "none" }}>
            {character.name}
          </h1>

          <div className={`card-status ${statusClass}`}>{character.status}</div>

          <h3
            style={{
              color: "var(--color-portal-green)",
              marginTop: "20px",
              textShadow: "none",
            }}
          >
            Details
          </h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>Species: {character.species}</li>
            <li>Gender: {character.gender}</li>
            <li>Origin: {character.origin.name}</li>
            <li>Last Seen Location: {character.location.name}</li>
            <li>Type: {character.type || "N/A"}</li>
            <li>Episode Count: {character.episode.length}</li>
            <li>
              Created Date: {new Date(character.created).toLocaleDateString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
