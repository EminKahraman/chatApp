import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profileDetail"
        options={{ headerBackTitle: "Back", headerTitle: "Detail" }}
      />
    </Stack>
  );
}