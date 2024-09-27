import { useEffect, useState } from "react";
import "./App.css";
import { getSleeps } from "./api";
import { SleepsChart } from "./components/charts/SleepsChart";
import { Sleep } from "./models/sleep.model";
import { Container } from "./components/Container";

export function App() {
	const [sleeps, setSleeps] = useState<Sleep[]>([]);
	useEffect(() => {
		getSleeps().then((response) => {
			setSleeps(response.map((sleep) => new Sleep(sleep)));
		});
	}, []);

	return (
		<Container>
			<SleepsChart data={sleeps} />
		</Container>
	);
}
