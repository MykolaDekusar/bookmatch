import { useState } from "react";

type Props = {
  bookId: number;
  onRated: (newAverage: number) => void;
};

export default function StarRating({ bookId, onRated }: Props) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  function handleVote(value: number) {
    fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value, bookId }),
    })
      .then((res) => res.json())
      .then((data) => {
        onRated(data.newAverage);
      });
  }

  return (
    <div
      className="flex items-center justify-center gap-1 mt-2"
      onMouseLeave={() => setHoveredStar(null)}
    >
      <span className="text-gray-400">Vota: </span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleVote(star)}
          onMouseEnter={() => setHoveredStar(star)}
          className={`transition text-2xl ${
            hoveredStar !== null && star <= hoveredStar
              ? "text-yellow-400"
              : "text-gray-400"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
