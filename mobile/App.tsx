import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack, Text } from "native-base";

import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <VStack flex={1} bgColor="gray.300" alignItems="center" justifyContent="center">
        <Text color="white" fontSize={24}>Hello World! Setup Mobile</Text>
        <StatusBar style="auto" />
      </VStack>
    </NativeBaseProvider>
  );
}

