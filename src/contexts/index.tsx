import type { PropsWithChildren } from "react";
import { AuthProvider } from "./authContext";
import { DataProvider } from "./dataContext";

export default function Provider({ children }: PropsWithChildren) {
	return (
		<AuthProvider>
			<DataProvider>{children}</DataProvider>
		</AuthProvider>
	);
}
