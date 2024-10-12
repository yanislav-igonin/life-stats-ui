import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSleep, saveSleep } from "./api";
import { Sleep } from "./models/sleep.model";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import { Container } from "./components/Container";

export function SleepForm() {
	const navigate = useNavigate();
	const [sleep, setSleep] = useState<Sleep | undefined>(undefined);

	const sleepId = useParams().id;
	if (!sleepId) {
		return navigate("/");
	}

	useEffect(() => {
		getSleep(Number(sleepId)).then((response) => {
			setSleep(new Sleep(response));
		});
	}, [sleepId]);

	function onInput(event: React.ChangeEvent<HTMLInputElement>) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		setSleep((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

	function onSelect(name: string, value: string) {
		setSleep((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!sleep) {
			return;
		}
		saveSleep(sleep).then(() => {
			navigate("/");
		});
	}

	if (!sleep) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<h1 className="mb-5">Изменить запись сна</h1>

			<form onSubmit={handleSubmit} className="flex flex-col gap-3 md:w-2/4">
				<Label htmlFor="id">ID</Label>
				<Input name="id" value={sleep.id} disabled />

				<Label htmlFor="goToBedAt">
					Время отхода ко сну (часовая зона +00:00)
				</Label>
				<Input name="goToBedAt" value={sleep.goToBedAt} />

				<Label htmlFor="wakeUpAt">Время подъема (часовая зона +00:00)</Label>
				<Input name="wakeUpAt" value={sleep.wakeUpAt} />

				<Label htmlFor="quality">Качество сна</Label>
				<Select
					name="quality"
					value={sleep.quality}
					onValueChange={(value) => onSelect("quality", value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Выбери качество сна" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{Object.entries(sleep.qualityEmojiMap).map(([key, value]) => (
								<SelectItem key={key} value={key}>
									{value}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Label htmlFor="moodOfDay">Настроение за день</Label>
				<Select
					name="moodOfDay"
					value={sleep.moodOfDay}
					onValueChange={(value) => onSelect("moodOfDay", value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Выбери настроение" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{Object.entries(sleep.moodEmojiMap).map(([key, value]) => (
								<SelectItem key={key} value={key}>
									{value}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Button type="submit" className="mt-5">
					Сохранить
				</Button>
			</form>
		</Container>
	);
}
