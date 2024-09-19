import { ResponsiveBar } from '@nivo/bar';
import { Sleep } from './models/sleep.model';

type Data = {
  hoursSlept: number;
  date: string;
};

export function NivoChart({ data }: { data: Sleep[] }) {
  return (
    <ResponsiveBar
      data={data}
      keys={['hoursSlept']}
      indexBy="hoursSlept"
    />
  );
}
