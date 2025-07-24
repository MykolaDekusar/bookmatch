import StarRating from "./StarRating";
type Props = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  averageRating: number;
  img: string;
  onVote: (bookId: number, newAverage: number) => void;
};

export default function BookCard({
  id,
  title,
  author,
  genre,
  year,
  averageRating,
  img,
  onVote,
}: Props) {
  return (
    <div className="w-full max-w-sm rounded-2xl shadow-md border p-4 bg-white">
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-contain bg-white rounded mb-4"
      />
      <h2 className="text-lg text-gray-900 font-bold">{title}</h2>
      <p className="text-sm text-gray-700">di {author}</p>
      <p className="text-sm text-gray-500 italic">{genre}</p>
      <p className="text-sm text-gray-400">{year}</p>
      <p className="text-sm text-yellow-500">
        Media: {(averageRating ?? 0).toFixed(1)} ★
      </p>
      <StarRating bookId={id} onRated={(newAvg) => onVote(id, newAvg)} />
    </div>
  );
}
