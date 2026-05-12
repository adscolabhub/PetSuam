import React from "react";
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground,TextInput,Alert } from 'react-native';
import Form from "../components/Form.js";
import Input from "../components/Input.js";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState({});

  const validar = () => {
    let valido = true;

    const newErrors = {
      email: "",
      senha: "",
    };

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Email inválido";
      valido = false;
    }

    if (senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
      valido = false;
    } 

    setError(newErrors);
    return valido;
  };

  const entrar = async () => {

    const emailNormalizado = email.toLowerCase().trim();
    if(validar()) {

    try {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailNormalizado,
        senha
      );

      console.log("Usuário logado:", userCredential.user);

      Alert.alert("Sucesso", "Login realizado!");

      // navegar para home
      // navigation.navigate("Home");

    } catch (error) {

      if (error.code === "auth/invalid-credential") {
        Alert.alert("Erro", "Email ou senha inválidos.");
        return;
      }

      console.log("Erro", error.message);
    }
  };
  };

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
        onPress={entrar}
      >
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        {error && <Text style={styles.errorStyle}>{error.email}</Text>}

        <Input
          placeholder="Senha"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={senha} 
          onChangeText={setSenha}
          maxLength={10}
        />
        {error && <Text style={styles.errorStyle}>{error.senha}</Text>}

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
  errorStyle: {
    color: "red",
  }
});