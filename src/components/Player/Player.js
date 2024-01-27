import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playername, setPlayername] = useState(name);
  function handleClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playername);
    }
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span>
        {isEditing ? (
          <input
            type="text"
            required
            value={playername}
            onChange={(e) => setPlayername(e.target.value)}
          ></input>
        ) : (
          <span className="player-name">{playername}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
