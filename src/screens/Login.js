import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from "../components/Form.js";
import Input from "../components/Input.js";

export default function Login() {
  return (
    <View style={styles.container}>

      <Form
        h1="PetSuam"
        h2="Login"
        h3="Bem-vindos ao PetSuam"
        btnPlaceholder="Enviar"
      >
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          placeholder="Senha"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

      </Form>

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