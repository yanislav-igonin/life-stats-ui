import { Auth } from "@/pages/Auth";
import { NotAuthorized } from "@/pages/NotAuthorized";
import { NotFound } from "@/pages/NotFound";
import { SleepForm } from "@/pages/SleepForm";
import { SleepList } from "@/pages/SleepList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Layout } from "./Layout";

const sleepListRoutes: RouteObject[] = [
	{
		path: "sleep",
		children: [
			{ path: "list", element: <SleepList /> },
			{ path: ":id", element: <SleepForm /> },
		],
	},
];

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: sleepListRoutes,
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

export function Router() {
	return <RouterProvider router={router} />;
}
