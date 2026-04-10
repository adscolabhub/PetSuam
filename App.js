import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./src/screens/Login.js";
import Cadastro from "./src/screens/Cadastro.js";

export default function App() {
  return (
    <View style={styles.container}>
      <Cadastro/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});