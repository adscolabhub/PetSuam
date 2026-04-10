import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Form from "../components/Form.js";
import Input from "../components/Input.js";

export default function Cadastro() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background4.png')} // Local image
        resizeMode="cover" // Options: cover, contain, stretch, repeat, center
        style={styles.image}
        >
      <Form
        h1="PetSuam"
        h2="cadastro"
        h3="Crie sua conta no PetSuam"
        btnPlaceholder="Enviar"
      >

        <Input
            placeholder="Nome Completo"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
        />

        <Input
            placeholder="Número de Telefone"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="telephoneNumber"
            returnKeyType="done"
        />
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

        <Input
          placeholder="Confirmar Senha"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.h2}>Cadastro Pet</Text>

        <Input
            placeholder="Nome"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
        />

        <Input
            placeholder="Espécie"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
        />

        <Input
            placeholder="Raça"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
        />
        <Input
            placeholder="Sexo"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
        />
        

      </Form>
      </ImageBackground>
      <StatusBar style="auto" />
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
  h2: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
    textAlign: 'center',
  },
});