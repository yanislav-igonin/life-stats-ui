import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../api";

export function Auth() {
	const authToken = useParams().authToken;
	const navigate = useNavigate();

	useEffect(() => {
		auth(authToken)
			.then(() => {
				/** If we get here, the auth was successful */
				localStorage.setItem("authToken", authToken as string);
				navigate("/");
			})
			.catch(() => {
				navigate("/404");
			});
	});

	return <></>;
}
