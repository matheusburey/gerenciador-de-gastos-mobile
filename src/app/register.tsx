import Checkbox from "expo-checkbox";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterScreen() {
	const { t } = useTranslation();
	const { register } = useAuth();
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	async function handleRegisterNewUser() {
		try {
			const { confirmPassword, ...payload } = userData;
			if (confirmPassword !== userData.password) {
				Alert.alert(t("register.error"), t("register.errorPassword"));
				return;
			}
			await register(payload);
			Alert.alert(t("register.successTitle"), t("register.success"));
		} catch (_error) {
			Alert.alert(t("register.error"), t("register.serverError"));
		}
	}

	const isFormOk = useMemo(() => {
		return (
			acceptedTerms &&
			userData.name &&
			userData.email &&
			userData.password &&
			userData.confirmPassword
		);
	}, [acceptedTerms, userData]);

	return (
		<View className="flex-1 bg-blue-50 dark:bg-zinc-800 justify-center">
			<View className="w-full max-w-md mx-auto px-10 gap-4">
				<Image
					source={require("@/assets/images/logo-full.png")}
					style={{ width: 280, height: 80 }}
					className="text-blue-400 mx-auto"
				/>
				<Text className="text-2xl dark:text-zinc-200 font-bold">
					{t("register.title")}
				</Text>
				<Input
					placeholder={t("register.name")}
					autoCapitalize="words"
					value={userData.name}
					onChangeText={(name) => setUserData({ ...userData, name })}
				/>
				<Input
					placeholder={t("register.email")}
					autoCapitalize="none"
					keyboardType="email-address"
					value={userData.email}
					onChangeText={(email) => setUserData({ ...userData, email })}
				/>
				<Input
					placeholder={t("register.password")}
					value={userData.password}
					onChangeText={(password) => setUserData({ ...userData, password })}
					secureTextEntry
				/>
				<Input
					placeholder={t("register.confirmPassword")}
					value={userData.confirmPassword}
					onChangeText={(confirmPassword) =>
						setUserData({ ...userData, confirmPassword })
					}
					secureTextEntry
				/>

				<View className="gap-2 flex-row py-2">
					<Checkbox
						value={acceptedTerms}
						onValueChange={setAcceptedTerms}
						color={acceptedTerms ? "#155dfc" : undefined}
					/>
					<Text className="text-lg text-zinc-400">{t("register.terms")}</Text>
					<TouchableOpacity activeOpacity={0.8}>
						<Text className="text-lg text-blue-600 font-bold">
							{t("register.termsLink")}
						</Text>
					</TouchableOpacity>
				</View>

				<Button
					disabled={!isFormOk}
					title={t("register.button")}
					onPress={handleRegisterNewUser}
				/>
			</View>
		</View>
	);
}
