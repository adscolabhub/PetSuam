import { StatusBar } from 'expo-status-bar';
import React from "react";
import { 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  View, 
  ImageBackground, 
  Text,
  TouchableOpacity
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Form from "../components/Form.js";
import Input from "../components/Input.js";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";


export default function Cadastro() {
  const [value, setValue] = React.useState('macho');
  const [especie, setEspecie] = React.useState('cachorro');
  const [nome, setNome] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [nomePet, setNomePet] = React.useState("");
  const [raca, setRaca] = React.useState("");

  const cadastrar = async () => {
  try {
    await addDoc(collection(db, "usuarios"), {
      nome,
      telefone,
      email,
      senha,
      pet: {
        nome: nomePet,
        especie,
        raca,
        sexo: value
      },
      criadoEm: new Date()
    });

    console.log("Cadastro realizado!");
  } catch (error) {
    console.log("Erro:", error);
  }
};

  return (

    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={require('../assets/background4.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Form
            h1="PetSuam"
            h2="Cadastro"
            h3="Crie sua conta no PetSuam"
            btnPlaceholder="Enviar"
            screen1= "Login"
            screen1Text="Já tem conta ? Entrar"
            onPress={cadastrar}
          >
     
            <Input placeholder="Nome Completo" autoCapitalize="words" onChangeText={setNome} />
            <Input placeholder="Número de Telefone" keyboardType="phone-pad" onChangeText={setTelefone} />
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail} />
            <Input placeholder="Senha" secureTextEntry={true} onChangeText={setSenha}/>
            <Input placeholder="Confirmar Senha" secureTextEntry={true} onChangeText={setConfirmarSenha}/>

            <Text style={styles.h2}>Cadastro Pet</Text>

        
            <Input placeholder="Nome do Pet" autoCapitalize="words" onChangeText={setNomePet}/>
            <RadioButton.Group
                onValueChange={setEspecie}
                value={especie}
              >
                <View style={styles.radioContainer}>
                <Text>Espécie:</Text>
                <TouchableOpacity
                  style={styles.radioAlign}
                  onPress={() => setEspecie('Cachorro')}
                >
                  <RadioButton value="Cachorro" />
                  <Text>Cachorro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioAlign}
                  onPress={() => setEspecie('Gato')}
                >
                  <RadioButton value="Gato" />
                  <Text>Gato</Text>
                </TouchableOpacity>
                </View>
              </RadioButton.Group>

            <Input placeholder="Raça" onChangeText={setRaca} />

            
             <RadioButton.Group
                onValueChange={setValue}
                value={value}
              >
                <View style={styles.radioContainer}>
                <Text>Sexo:</Text>
                <TouchableOpacity
                  style={styles.radioAlign}
                  onPress={() => setValue('macho')}
                >
                  <RadioButton value="macho" />
                  <Text>Macho</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioAlign}
                  onPress={() => setValue('femea')}
                >
                  <RadioButton value="femea" />
                  <Text>Fêmea</Text>
                </TouchableOpacity>
                </View>
              </RadioButton.Group>
            
          </Form>
        </ScrollView>
      </ImageBackground>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  image: {
    flex: 1,
    width: '100%',
    
  },
  scrollContent: {
    flexGrow: 1, 
    justifyContent: 'center',
    paddingBottom: 40, 
    paddingTop: 40
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "black",
    marginTop: 25,
    marginBottom: 5,
    textAlign: 'center',
  },
  radioAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioContainer : {
    flexDirection: "row",
    justifyContent: "flexStart",
    alignItems: "center",
    marginTop: 6,
  },
});