import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react";
import { createUser, loginService } from "@/services/users";

interface AuthContextProps {
	token: string;
	user: IUser;
	isFirstAccess: boolean;
	firstAccessPerformed: () => void;
	register: (payload: IRegisterUserParams) => void;
	login: (payload: ILoginParams) => void;
	logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [token, setToken] = useState("");
	const [isFirstAccess, setIsFirstAccess] = useState(false);
	const [user, setUser] = useState({} as IUser);

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
			const userWithToken = JSON.parse(userRaw);
			setToken(userWithToken.token);
			setUser(userWithToken.user);
		}
	}, []);

	async function register(payload: IRegisterUserParams) {
		const user = await createUser(payload);
		setUserWithToken(user);
		setToken(user.token);
		await AsyncStorage.setItem("moneyFlow:userWithToken", JSON.stringify(user));

		firstAccessPerformed();
	}

	async function login(payload: ILoginParams) {
		const userWithToken = await loginService(payload);
		setUser(userWithToken.user);
		setToken(userWithToken.token);
		await AsyncStorage.setItem(
			"moneyFlow:userWithToken",
			JSON.stringify(userWithToken),
		);

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
			value={{
				token,
				user,
				isFirstAccess,
				firstAccessPerformed,
				register,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
