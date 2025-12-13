import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
	const { t } = useTranslation();
	const { login } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleLogin() {
		try {
			await login({ email, password });
		} catch (_error) {
			Alert.alert(t("login.error"), t("login.serverError"));
		}
	}

	return (
		<View className="flex-1 bg-blue-50 dark:bg-zinc-800 justify-center">
			<View className="w-full max-w-md mx-auto px-10 gap-4">
				<Image
					source={require("@/assets/images/logo-full.png")}
					style={{ width: 280, height: 80 }}
					className="text-blue-400 mx-auto"
				/>
				<Text className="text-2xl dark:text-zinc-200 font-bold">
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
					<Icon size={50} name="FingerprintPattern" color="#52525B" />
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
