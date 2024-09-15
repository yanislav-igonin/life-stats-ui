import { useEffect, useState } from 'react';
import './App.css';
import { Sleep, getSleeps } from './api';
import { formatDate } from './dates';

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
          {formatDate(sleep.wakeUpAt)} - {formatDate(sleep.goToBedAt)}
        </div>
      ))}
    </div>
  );
}
