import Review from "@/components/Review/Review";
import { gameByAppid } from "@/db/games";
import { reviewByAppid } from "@/db/reviews";
import Image from "next/image";

type Props = {
  params: { appid: string };
};

const page = async ({ params: { appid } }: Props) => {
  if (Number.isNaN(parseInt(appid))) return <h1>Not a valid appid</h1>;

  const game = await gameByAppid(parseInt(appid));
  const reviews = await reviewByAppid(parseInt(appid));

  if (!game) return <h1>Game does not exist!</h1>;

  return (
    <div className="flex w-full h-full">
      {/* profile section */}
      <div className="flex flex-col bg-[var(--card)] min-w-[400px]">
        <Image
          width={400}
          height={200}
          src={game.image_url}
          alt={`${game.title} cover art`}
        />
        <h1 className="font-bold mx-auto py-4 text-2xl">{game.title}</h1>
        <button className="p-3 mx-5 bg-[var(--button-background)] hover:bg-[var(--button-background-hover)]">
          Leave a review
        </button>
      </div>

      <div className="flex flex-col w-full mt-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl mb-4 font-bold">Synopsis</h2>
          <div className="bg-[var(--card)] p-6 rounded-md">
            <p>{game.synopsis}</p>
          </div>
        </div>
        {/* review container */}
        <div className="flex w-full mt-6 max-w-[1200px] mx-auto flex-col">
          <h2 className="text-2xl mb-4 font-bold">Reviews</h2>
          {(reviews || []).map(r => (
            <Review
              key={r.appid}
              review={r}
              user={{ username: r.username, picture: r.picture }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
