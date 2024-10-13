import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/form/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import { App } from "./App.tsx";
import "./index.css";
import { Auth } from "./Auth.tsx";
import { NotFound } from "./404.tsx";
import { SleepForm } from "./SleepForm.tsx";

const root = document.getElementById("root");
if (!root) {
	throw new Error("Root element not found");
}

const theme = createTheme({
	/** Put your mantine theme override here */
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{ path: "/sleep/:id", element: <SleepForm /> },
	{
		path: "/auth/:authToken",
		element: <Auth />,
	},
	{
		path: "/404",
		element: <NotFound />,
	},
]);
createRoot(root).render(
	<StrictMode>
		<MantineProvider theme={theme}>
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>,
);
