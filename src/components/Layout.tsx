import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function Layout({ children }: React.PropsWithChildren) {
	const [opened, { toggle }] = useDisclosure();

	return (
		// <AppShell
		// 	header={{ height: 60 }}
		// 	navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
		// 	padding="md"
		// >
		// 	<AppShell.Header>
		// 		<Group h="100%" px="md">
		// 			<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
		// 		</Group>
		// 	</AppShell.Header>
		// 	<AppShell.Navbar p="md">
		// 		Navbar
		// 		{/* {Array(15)
		// 			.fill(0)
		// 			.map((_, index) => (
		// 				<Skeleton key={index} h={28} mt="sm" animate={false} />
		// 			))} */}
		// 	</AppShell.Navbar>
		// 	<AppShell.Main>{children}</AppShell.Main>
		// </AppShell>
		{ children }
	);
}
