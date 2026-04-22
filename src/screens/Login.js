import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground,TextInput } from 'react-native';
import Form from "../components/Form.js";
import Input from "../components/Input.js";

export default function Login() {
  return (
    <View style={styles.container}>

      <ImageBackground
              source={require('../assets/background4.png')}
              resizeMode="cover"
              style={styles.image}
            >
      
      <Form
        h1="PetSuam"
        h2="Login"
        h3="Bem-vindos ao PetSuam"
        btnPlaceholder="Enviar"
        screen1= "Cadastro"
        screen1Text="Criar conta"
        screen2= "Cadastro"
        screen2Text="Esqueci minha senha"
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* backgroundColor: 'green', */
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1, // Fills container
    width: '100%',
    justifyContent: 'center',
  },
});