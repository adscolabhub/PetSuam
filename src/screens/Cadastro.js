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
  TouchableOpacity,
  Alert
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Form from "../components/Form.js";
import Input from "../components/Input.js";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome } from '@expo/vector-icons';


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
  const [castrado, setCastrado] = React.useState('nao');

  const [nomeError, setNomeError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = React.useState(false);

  const validar = () => {
  if (nome.length < 5) {
    setNomeError("Nome precisa ter pelo menos 5 caracteres");
    return false;
  }

  setNomeError("");
  return true;
};
 

  const cadastrar = async () => {
    if(validar()) {
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
        sexo: value,
        castrado: castrado
      },
      criadoEm: new Date()
    });

    setValue("");
    setEspecie("");
    setNome("");
    setTelefone("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setNomePet("");
    setRaca("");
    Alert.alert('Status do Cadastro:', 'Cadastro realizado!');
  } catch (error) {
    Alert.alert('Status do Cadastro:', 'Cadastro não realizado. Erro: ', error.message);
  }
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
     
            <Input placeholder="Nome Completo" maxLength={50} autoCapitalize="words" value={nome} onChangeText={setNome} />
            <Text>{nomeError}</Text>
            <TextInputMask
              placeholder='Telefone'
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              value={telefone}
              onChangeText={setTelefone}
              style={styles.inputBox}
            />
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <View style={styles.passwordContainer}>
              <Input placeholder="Senha" maxLength={10} secureTextEntry={!showPassword} value={senha} onChangeText={setSenha} />   
              <TouchableOpacity style={styles.seePassword} onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome 
                  name = {!showPassword ? "eye" : "eye-slash"}
                  size={30} 
                  color="black" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <Input placeholder="Confirmar Senha" maxLength={10} secureTextEntry={!showConfirmationPassword} value={confirmarSenha} onChangeText={setConfirmarSenha} />   
              <TouchableOpacity style={styles.seePassword} onPress={() => setShowConfirmationPassword(!showConfirmationPassword)}>
                <FontAwesome 
                  name = {!showConfirmationPassword ? "eye" : "eye-slash"}
                  size={30} 
                  color="black" 
                />
              </TouchableOpacity>            
            </View>
            <Text style={styles.h2}>Cadastro Pet</Text>

        
            <Input placeholder="Nome do Pet" maxLength={30} autoCapitalize="words" value={nomePet} onChangeText={setNomePet}/>
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

            <Input placeholder="Raça" maxLength={30}  value={raca} onChangeText={setRaca} />

            
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

              <RadioButton.Group
                onValueChange={setCastrado}
                value={castrado}
              >
                <View style={styles.radioContainer}>
                <Text>Castrado:</Text>
                <TouchableOpacity
                  style={styles.radioAlign}
                  onPress={() => setCastrado('sim')}
                >
                  <RadioButton value="sim" />
                  <Text>Sim</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioAlign}
                  onPress={() => setCastrado('nao')}
                >
                  <RadioButton value="nao" />
                  <Text>Não</Text>
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
  inputBox: {
    borderColor: "black",
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    width: 300,
    color: 'black',
    marginTop: 20,
  },
  passwordContainer: {
    position: 'relative',
    width: 300
  },
  seePassword: {
    position: "absolute",
    top: '50%',
    transform: [{translateY: -5}],
    right: 15,
  }
});