"use client";
import { ChangeEvent, useState } from "react";
import { GameSuggestion, GameSuggestionMessage } from "./GameSuggestion";
import { Game } from "@/db/db-schema";

type Props = {
  callbackSelectedGame: (g: Game | null) => void;
  preSelectedGameTitle?: string;
};

const GameField = ({ callbackSelectedGame, preSelectedGameTitle }: Props) => {
  const [suggestions, setSuggestions] = useState<Game[] | null>([]);
  const [field, setField] = useState(preSelectedGameTitle ?? "");
  const [isFetching, setFetching] = useState(false);

  const queryGame = async (query: string) => {
    setFetching(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_ORIGIN + "/api/game?query=" + query
    );

    if (response.ok) {
      const responseJson: { apps: Game[] | null; error: string | null } =
        await response.json();

      if (responseJson.error) {
        console.error(responseJson.error);
      }

      setSuggestions(responseJson.apps);
    }
    setFetching(false);
  };

  // TODO: maybe add interval to fetch after a certain amount of time without typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // show game suggestions
    if (value.length > 1) {
      queryGame(value);
      callbackSelectedGame(null);
    } else {
      setSuggestions([]);
    }

    setField(value);
  };

  const handleSuggestionClick = (game: Game) => {
    setSuggestions([]); // suggestion selected, remove others
    if (game?.title) {
      setField(game?.title);
      callbackSelectedGame(game);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        className={`w-full mt-2 bg-[var(--input-background)] p-2 rounded-md ${
          suggestions?.length ? "rounded-b-none" : ""
        }`}
        placeholder="Search for Game"
        onChange={handleChange}
        value={field}
      />
      {suggestions?.map((game: Game, i: number) => (
        <GameSuggestion
          key={i}
          game={game}
          handleClick={handleSuggestionClick}
          lastElement={suggestions.length - 1 == i}
        />
      ))}

      {/* Messages about suggestions statuses */}
      {isFetching && <GameSuggestionMessage message="Loading..." />}
    </div>
  );
};
export default GameField;
