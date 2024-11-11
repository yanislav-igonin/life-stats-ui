import { Auth } from "@/pages/Auth";
import { NotAuthorized } from "@/pages/NotAuthorized";
import { NotFound } from "@/pages/NotFound";
import { SleepForm } from "@/pages/SleepForm";
import { SleepList } from "@/pages/SleepList";
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import { Layout } from "./Layout";
import { BoozeList } from "@/pages/BoozeList";
import { BoozeForm } from "@/pages/BoozeForm";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Layout />}>
				<Route path="sleep">
					<Route path="list" element={<SleepList />} />
					<Route path=":id" element={<SleepForm />} />
				</Route>
				<Route path="booze">
					<Route path="list" element={<BoozeList />} />
					<Route path=":id" element={<BoozeForm />} />
				</Route>
			</Route>
			<Route path="/auth/:authToken" element={<Auth />} />
			<Route path="/404" element={<NotFound />} />
			<Route path="/bruh" element={<NotAuthorized />} />
		</>,
	),
);

export function Router() {
	return <RouterProvider router={router} />;
}
