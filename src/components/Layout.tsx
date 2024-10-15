import { useAuth } from "@/lib/useAuth";
import { AppShell, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Layout({ children }: React.PropsWithChildren) {
	const [opened, { toggle }] = useDisclosure();

	const authToken = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!authToken) {
			navigate("/auth");
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
			<AppShell.Navbar p="md">
				Navbar
				{/* {Array(15)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} h={28} mt="sm" animate={false} />
					))} */}
			</AppShell.Navbar>
			<AppShell.Main>
				<Container>{children}</Container>
			</AppShell.Main>
		</AppShell>
	);
}
