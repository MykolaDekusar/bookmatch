import { useState } from "react";

type Props = {
  bookId: number;
  onRated?: () => void; // facoltativo: callback da chiamare dopo il voto
};

export default function StarRating({ bookId, onRated }: Props) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(false);

  const handleVote = async (value: number) => {
    try {
      setSelected(value);
      setVoted(true);

      await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, value }),
      });

      if (onRated) onRated();
    } catch (error) {
      console.error("Errore durante il voto:", error);
    }
  };

  return (
    <div className="flex-center gap-2 mt-2">
      <span className="mr-5 text-gray-900">Vota:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-xl transition ${
            (hovered || selected) >= star ? "text-yellow-500" : "text-gray-400"
          } ${voted ? "pointer-events-none opacity-50" : ""}`}
          onMouseEnter={() => !voted && setHovered(star)}
          onMouseLeave={() => !voted && setHovered(0)}
          onClick={() => !voted && handleVote(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
