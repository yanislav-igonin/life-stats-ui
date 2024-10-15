import { Center } from "@/components/ui/Center";
import { Stack } from "@mantine/core";

export function NotAuthorized() {
	return (
		<Center h={"100vh"}>
			<Stack style={{ textAlign: "center" }}>
				<h1>Not Authorized</h1>
				<h2>Use TG Bot to authorize</h2>
			</Stack>
		</Center>
	);
}
