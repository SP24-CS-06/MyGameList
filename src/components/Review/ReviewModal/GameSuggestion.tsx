import { Game } from "@/db/db-schema";

type Props = {
  handleClick: (game: Game) => void;
  game: Game;
  lastElement: boolean;
};

const style = `w-full bg-[var(--input-background)] p-3 hover:bg-[var(--input-background-hover)] cursor-pointer`;

export const GameSuggestion = ({ game, handleClick, lastElement }: Props) => {
  return (
    <div
      className={`${style} ${lastElement ? "rounded-b-md" : "rounded-none"}`}
      onClick={() => handleClick(game)}
    >
      {game.title}
    </div>
  );
};

/**
 *  placeholder component to inform user about game suggestion queries
 */
export const GameSuggestionMessage = ({ message }: { message: string }) => {
  return <div className={`${style} rounded-b-md`}>{message}</div>;
};
