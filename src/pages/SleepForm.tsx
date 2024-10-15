import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSleep, saveSleep } from "@/api";
import { Sleep } from "@/models/sleep.model";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export function SleepForm() {
	const navigate = useNavigate();
	const [sleep, setSleep] = useState<Sleep | undefined>(undefined);

	const sleepId = useParams().id;
	if (!sleepId) {
		navigate("/");
		return null;
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

		// @ts-expect-error - 2 lame to fix type error rn
		setSleep((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

	function onSelect(name: string, value: string) {
		// @ts-expect-error - 2 lame to fix type error rn
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
		<>
			<h1 className="mb-5">Изменить запись сна</h1>

			<form onSubmit={handleSubmit}>
				<Input label="ID" name="id" value={sleep.id} disabled />

				<Input
					label="Время отхода ко сну (часовая зона +00:00)"
					name="goToBedAt"
					value={sleep.goToBedAt}
					onInput={onInput}
				/>

				<Input
					label="Время подъема (часовая зона +00:00)"
					name="wakeUpAt"
					value={sleep.wakeUpAt}
					onInput={onInput}
				/>

				<Select
					label="Качество сна"
					name="quality"
					value={sleep.quality}
					data={Object.entries(sleep.qualityEmojiMap).map(([key, value]) => ({
						value: key,
						label: value,
					}))}
					onChange={(event) => onSelect("quality", event.currentTarget.value)}
				/>

				<Select
					label="Настроение за день"
					name="moodOfDay"
					value={sleep.moodOfDay}
					data={Object.entries(sleep.moodEmojiMap).map(([key, value]) => ({
						value: key,
						label: value,
					}))}
					onChange={(event) => onSelect("moodOfDay", event.currentTarget.value)}
				/>

				<Button type="submit" className="mt-5">
					Сохранить
				</Button>
			</form>
		</>
	);
}
