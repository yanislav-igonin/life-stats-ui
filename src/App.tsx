import { useEffect, useState } from 'react';
import './App.css';
import { getSleeps } from './api';
import { RechartChart } from './RechartChart';
import { Sleep } from './models/sleep.model';

export function App() {
  const [sleeps, setSleeps] = useState<Sleep[]>([]);
  useEffect(() => {
    getSleeps().then((response) => {
      setSleeps(response.map((sleep) => new Sleep(sleep)));
    });
  }, []);

  return (
    <>
      <RechartChart data={sleeps} />
    </>
  );
}
