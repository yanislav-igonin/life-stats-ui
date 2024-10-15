import { useAuth } from "@/lib/useAuth";
import { AppShell, Burger, Container, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const navLinks = [{ label: "Сон", href: "/sleep/list" }];

export function Layout() {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();

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
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger
						opened={mobileOpened}
						onClick={toggleMobile}
						hiddenFrom="sm"
						size="sm"
					/>
					<Burger
						opened={desktopOpened}
						onClick={toggleDesktop}
						visibleFrom="sm"
						size="sm"
					/>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">a</AppShell.Navbar>
			<AppShell.Main>
				<Container size={"xl"}>
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
