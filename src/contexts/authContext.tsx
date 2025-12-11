import { router } from "expo-router";
import { createContext, type PropsWithChildren, useState } from "react";

interface AuthContextProps {
	isFirstAccess: boolean;
	startWithoutLogin: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [isFirstAccess, setIsFirstAccess] = useState(true);

	function startWithoutLogin() {
		setIsFirstAccess(false);
		router.push("/(tabs)");
	}

	return (
		<AuthContext.Provider value={{ isFirstAccess, startWithoutLogin }}>
			{children}
		</AuthContext.Provider>
	);
};
