import { ResponsiveContainer, BarChart, Bar, XAxis } from 'recharts';
import { Sleep } from './models/sleep.model';

export function RechartChart({ data }: { data: Sleep[] }) {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <Bar
          dataKey="hoursSlept"
          fill="#8884d8"
        />
        <XAxis dataKey="date" />
      </BarChart>
    </ResponsiveContainer>
  );
}
