import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import "./index.css";
import { Router } from "./components/Router.tsx";

const root = document.getElementById("root");
if (!root) {
	throw new Error("Root element not found");
}

const theme = createTheme({});

createRoot(root).render(
	<StrictMode>
		<MantineProvider theme={theme}>
			<Router />
		</MantineProvider>
	</StrictMode>,
);
