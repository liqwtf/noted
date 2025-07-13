import { Outlet } from "react-router";
import { TitleBar } from "~/components/title-bar";

export default function () {
	return (
		<>
			<TitleBar className="z-50" />
			<Outlet />
		</>
	);
}
