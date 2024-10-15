import { useAuth } from "@/lib/useAuth";
import { AppShell, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function Layout() {
	const [opened, { toggle }] = useDisclosure();

	const authToken = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!authToken) {
			navigate("/bruh");
		}
	}, [authToken, navigate]);

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">Navbar</AppShell.Navbar>
			<AppShell.Main>
				<Container>
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
