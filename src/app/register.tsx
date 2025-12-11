import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createUser } from "@/services/users";

export default function RegisterScreen() {
	const { t } = useTranslation();

	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		confirmPassword: "",
	});

	async function handleRegisterNewUser() {
		try {
			const { confirmPassword, ...payload } = userData;
			if (confirmPassword !== userData.password) {
				Alert.alert(t("register.error"), t("register.errorPassword"));
				return;
			}
			await createUser(payload);
			Alert.alert(t("register.successTitle"), t("register.success"), [
				{
					text: t("register.buttonSuccess"),
					onPress: () => {
						router.push("/login");
					},
				},
			]);
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
			userData.phone &&
			userData.confirmPassword
		);
	}, [acceptedTerms, userData]);

	return (
		<View className="flex-1 bg-gray-100 dark:bg-zinc-800 justify-center">
			<View className="w-full max-w-md mx-auto px-10 gap-4">
				<Text className="text-3xl dark:text-zinc-200 font-bold">
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
					placeholder={t("register.phone")}
					keyboardType="phone-pad"
					autoCapitalize="none"
					autoCorrect={false}
					value={userData.phone}
					onChangeText={(phone) => setUserData({ ...userData, phone })}
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

				<View className="gap-2 flex-row p-4">
					<Checkbox
						value={acceptedTerms}
						onValueChange={setAcceptedTerms}
						color={acceptedTerms ? "#6B21A8" : undefined}
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
