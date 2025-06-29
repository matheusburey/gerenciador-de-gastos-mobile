import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Fingerprint } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { loginService } from "@/services/users";

export default function LoginScreen() {
	const { t } = useTranslation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleLogin() {
		try {
			const user = await loginService({ email, password });
			await AsyncStorage.setItem("user", JSON.stringify(user));
			router.push("/(tabs)");
		} catch (error) {
			console.log(error);
			Alert.alert(t("login.error"), t("login.serverError"));
		}
	}

	return (
		<View className="flex-1 bg-gray-100 dark:bg-zinc-800 justify-center">
			<View className="w-full max-w-md px-10 gap-4">
				<Text className="text-3xl dark:text-zinc-200 font-bold">
					{t("login.title")}
				</Text>
				<Input
					placeholder={t("login.email")}
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					placeholder={t("login.password")}
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<Button title={t("login.button")} onPress={handleLogin} />

				<TouchableOpacity className="mx-auto p-4" activeOpacity={0.8}>
					<Text className="text-lg text-zinc-600">{t("login.forgot")}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="mx-auto p-6 my-4 rounded-full"
					activeOpacity={0.8}
				>
					<Fingerprint size={50} color="#52525B" />
				</TouchableOpacity>

				<TouchableOpacity
					className="mx-auto gap-2 flex-row p-4"
					activeOpacity={0.8}
					onPress={() => {
						router.push("/register");
					}}
				>
					<Text className="text-lg text-zinc-400">
						{t("login.createAccountQuestion")}
					</Text>
					<Text className="text-lg text-zinc-600 font-bold">
						{t("login.createAccount")}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
