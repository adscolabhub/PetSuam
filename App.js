import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Input from './components/Input';

export default function App() {
  return (
    <View style={styles.container}>

      <Text>Open up App.js to stdsfsdfsdfsdap!</Text>
      <Input placeholder="Email" keyboardType="email-address"/>
      <Input 
        placeholder="Senha" 
        secureTextEntry={true}
        autoCapitalize="none"
        autoComplete="password"
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
});