import { router } from "expo-router";
import {
	createContext,
	type PropsWithChildren,
	useEffect,
	useState,
	useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUser, loginService } from "@/services/users";

interface AuthContextProps {
	isFirstAccess: boolean;
	firstAccessPerformed: () => void;
	register: (payload: IRegisterUserParams) => void;
	login: (payload: ILoginParams) => void;
	logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [isFirstAccess, setIsFirstAccess] = useState(false);
	const [userWithToken, setUserWithToken] = useState({} as IUserWithToken);

	async function firstAccessPerformed() {
		await AsyncStorage.setItem("isFirstAccess", "false");
		setIsFirstAccess(false);
		router.push("/(tabs)");
	}

	const startLoading = useCallback(async () => {
		const getIsFirstAccess = await AsyncStorage.getItem("isFirstAccess");
		setIsFirstAccess(getIsFirstAccess !== "false");
		const userRaw = await AsyncStorage.getItem("moneyFlow:userWithToken");
		if (userRaw) {
			const user = JSON.parse(userRaw);
			setUserWithToken(user);
		}
	}, []);

	async function register(payload: IRegisterUserParams) {
		const user = await createUser(payload);
		setUserWithToken(user);
		await AsyncStorage.setItem("moneyFlow:userWithToken", JSON.stringify(user));

		firstAccessPerformed();
	}

	async function login(payload: ILoginParams) {
		const user = await loginService(payload);
		setUserWithToken(user);
		await AsyncStorage.setItem("moneyFlow:userWithToken", JSON.stringify(user));

		firstAccessPerformed();
	}

	async function logout() {
		await AsyncStorage.removeItem("moneyFlow:isFirstAccess");
		await AsyncStorage.removeItem("moneyFlow:userWithToken");
		router.push("/login");
	}

	useEffect(() => {
		startLoading();
	}, [startLoading]);

	return (
		<AuthContext.Provider
			value={{ isFirstAccess, firstAccessPerformed, register, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
