import type { PropsWithChildren } from "react";
import { AuthProvider } from "./authContext";
import { TransactionsProvider } from "./TransactionsContext";

export default function Provider({ children }: PropsWithChildren) {
	return (
		<AuthProvider>
			<TransactionsProvider>{children}</TransactionsProvider>
		</AuthProvider>
	);
}
