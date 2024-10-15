import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import "./index.css";
import { Auth } from "./pages/Auth.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { SleepList } from "./pages/SleepList.tsx";
import { SleepForm } from "./pages/SleepForm.tsx";
import { NotAuthorized } from "./pages/NotAuthorized.tsx";
import { Layout } from "./components/Layout.tsx";

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
		element: <Layout />,
		children: [
			{
				path: "sleep",
				children: [
					{ path: "list", element: <SleepList /> },
					{ path: ":id", element: <SleepForm /> },
				],
			},
		],
	},
	{
		path: "auth/:authToken",
		element: <Auth />,
	},
	{
		path: "404",
		element: <NotFound />,
	},
	{
		path: "bruh",
		element: <NotAuthorized />,
	},
]);
createRoot(root).render(
	<StrictMode>
		<MantineProvider theme={theme}>
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>,
);
