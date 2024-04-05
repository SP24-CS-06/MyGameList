"use client";
import React, { ChangeEvent, useState } from "react";
import { Game } from "./ReviewModal";
import { GameSuggestion } from "./GameSuggestion";

type Props = {
  callbackSelectedGame: (g: Game) => void;
};

const games: Game[] = [
  { appid: 474762, name: "Sniper Elite 4 - Covert Heroes Character Pack" },
  { appid: 473810, name: "Killbot" },
  { appid: 473840, name: "Diib's Dilemma" },
];

const GameField = ({ callbackSelectedGame }: Props) => {
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [field, setField] = useState("");

  // TODO: replace with a real query
  const queryGame = (query: string) => {
    const filteredGames = games.filter(g =>
      g.name?.toLowerCase().includes(query.toLowerCase())
    );
    setAvailableGames(filteredGames);
  };

  // TODO: maybe add interval to fetch after a certain amount of time without typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // show game suggestions
    if (value.length > 0) {
      queryGame(value);
    } else {
      setAvailableGames([]);
    }

    setField(value);
  };

  const handleSuggestionClick = (game: Game) => {
    console.log(game?.name);

    setAvailableGames([]); // suggestion already selected, remove others
    if (game?.name) {
      setField(game?.name);
      console.log("should work");
    }

    // pass onto callback
    callbackSelectedGame(game); // TODO: maybe query for game cover art to show user something that field is satisfied and we have a valid object
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        className={`w-full mt-2 bg-[var(--input-background)] p-2 rounded-md ${availableGames.length ? "rounded-b-none" : ""}`}
        placeholder="Search for Game"
        onChange={handleChange}
        value={field}
      />
      {availableGames.map((game: Game, i: number) => (
        <GameSuggestion
          key={i}
          game={game}
          handleClick={handleSuggestionClick}
          lastElement={availableGames.length - 1 == i}
        />
      ))}
    </div>
  );
};
export default GameField;
