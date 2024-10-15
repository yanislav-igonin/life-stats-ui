import { Auth } from "@/pages/Auth";
import { NotAuthorized } from "@/pages/NotAuthorized";
import { NotFound } from "@/pages/NotFound";
import { SleepForm } from "@/pages/SleepForm";
import { SleepList } from "@/pages/SleepList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Layout } from "./Layout";

const sleepRoutes: RouteObject[] = [
	{
		path: "sleep",
		children: [
			{ path: "list", element: <SleepList /> },
			{ path: ":id", element: <SleepForm /> },
		],
	},
];

const authedRoutes: RouteObject[] = [...sleepRoutes];

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: authedRoutes,
	},
	{
		path: "auth/:authToken",
		element: <Auth />,
	},
	{
		path: "/404",
		element: <NotFound />,
	},
	{
		path: "/bruh",
		element: <NotAuthorized />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
