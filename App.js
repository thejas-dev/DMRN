import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { NativeWindStyleSheet } from "nativewind";


NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
      <AppNavigation />
  );
}
