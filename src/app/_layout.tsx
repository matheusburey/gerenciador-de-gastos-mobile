import Provider from "@/contexts";
import "../../global.css";

import "@/lib/i18n";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
	/*const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  */

	return (
		<>
			<Provider>
				<Stack screenOptions={{ headerShown: false }} />
			</Provider>
			<StatusBar style="auto" />
		</>
	);
}
