import { useEffect, useState } from 'react';
import './App.css';
import { Sleep, getSleeps } from './api';
import { diffInHours, formatDate, toFixed } from './dates';

export function App() {
  const [sleeps, setSleeps] = useState<Sleep[]>([]);
  useEffect(() => {
    getSleeps().then((response) => {
      setSleeps(response);
    });
  }, []);

  return (
    <div>
      {sleeps.map((sleep) => (
        <div key={sleep.id}>
          {formatDate(sleep.goToBedAt)} - {formatDate(sleep.wakeUpAt)} (
          {toFixed(diffInHours(sleep.wakeUpAt, sleep.goToBedAt), 2)} hours sleep)
        </div>
      ))}
    </div>
  );
}
