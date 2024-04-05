import { Game } from "./ReviewModal";

type Props = {
  handleClick: (game: Game) => void;
  game: Game;
  lastElement: boolean;
};

export const GameSuggestion = ({ game, handleClick, lastElement }: Props) => {
  return (
    <div
      className={`w-full bg-slate-600 p-3 ${lastElement ? "rounded-b-md" : ""}`}
      onClick={() => handleClick(game)}
    >
      {game.name}
    </div>
  );
};
