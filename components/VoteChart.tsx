import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    stars: number;
    count: number;
  }[];
};

export default function VoteChart({ data }: Props) {
  return (
    <div className="w-full h-20 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="stars" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#facc15" /> {/* giallo per le stelle */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
