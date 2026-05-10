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
import { TextInputMask } from 'react-native-masked-text';
import { FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";




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

  const [errors, setErrors] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = React.useState(false);

  const validar = () => {
  let valido = true;

   const newErrors = {
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    nomePet: "",
    raca: "",
  };

  if (!nome.trim()) {
    newErrors.nome = "Nome é obrigatório";
    valido = false;
  }

  if (!telefone || telefone.length < 14) {
    newErrors.telefone = "Telefone inválido";
    valido = false;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    newErrors.email = "Email inválido";
    valido = false;
  }

  if (senha.length < 6) {
    newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
    valido = false;
  }

  if (senha !== confirmarSenha) {
    newErrors.confirmarSenha = "As senhas não coincidem";
    valido = false;
  }

  if (!nomePet.trim()) {
    newErrors.nomePet = "Nome do pet é obrigatório";
    valido = false;
  }

  if (!raca.trim()) {
    newErrors.raca = "A raça do pet é obrigatório";
    valido = false;
  }

  setErrors(newErrors);
  return valido;
};
 

  const cadastrar = async () => {
    if(validar()) {

    const emailNormalizado = email.toLowerCase().trim();
    const nomeNormalizado = nome.trim();
    const nomePetNormalizado = nomePet.trim();

    

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailNormalizado,
        senha
      );

      //previne de enviar um usuario "vazio"
      
      try {
      //cria um usuario por documento pra facilitar as consultas
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        uid: userCredential.user.uid,
        nome: nomeNormalizado,
        telefone,
        email: emailNormalizado,
        pet: {
          nome: nomePetNormalizado,
          especie,
          raca,
          sexo: value,
          castrado: castrado
        },
        //usa o tempo do firebase pra evitar problemas de consistencia em horarios
        criadoEm: serverTimestamp()
      });
    }catch(firestoreError) {
      await userCredential.user.delete();
      throw firestoreError;
    }


    setValue("macho");
    setEspecie("cachorro");
    setNome("");
    setTelefone("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setNomePet("");
    setRaca("");
    setCastrado("nao");
    Alert.alert('Status do Cadastro:', 'Cadastro realizado!');
  } catch (error) {
     if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro", "Este email já está em uso.");
        return;
      }

  Alert.alert("Erro", error.message);
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
            {errors.nome && <Text style={styles.errorStyle}>{errors.nome}</Text>}
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
            {errors.telefone && <Text style={styles.errorStyle}>{errors.telefone}</Text>}
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            {errors.email && <Text style={styles.errorStyle}>{errors.email}</Text>}

            <View style={styles.passwordContainer}>
              <Input placeholder="Senha" maxLength={10} secureTextEntry={!showPassword} value={senha} onChangeText={setSenha} /> 
              
              <TouchableOpacity style={styles.seePassword} onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome 
                  name = {showPassword ? "eye-slash" : "eye"}
                  size={30} 
                  color="black" 
                />
              </TouchableOpacity>
            </View>
            {errors.senha && <Text style={styles.errorStyle}>{errors.senha}</Text>}


            <View style={styles.passwordContainer}>
              <Input placeholder="Confirmar Senha" maxLength={10} secureTextEntry={!showConfirmationPassword} value={confirmarSenha} onChangeText={setConfirmarSenha} />   
              
              
              <TouchableOpacity style={styles.seePassword} onPress={() => setShowConfirmationPassword(!showConfirmationPassword)}>
                <FontAwesome 
                  name = {showConfirmationPassword ? "eye-slash" : "eye"}
                  size={30} 
                  color="black" 
                />
              </TouchableOpacity>            
            </View>
            {errors.confirmarSenha && <Text style={styles.errorStyle}>{errors.confirmarSenha}</Text>}
            <Text style={styles.h2}>Cadastro Pet</Text>

        
            <Input placeholder="Nome do Pet" maxLength={30} autoCapitalize="words" value={nomePet} onChangeText={setNomePet}/>
            {errors.nomePet && <Text style={styles.errorStyle}>{errors.nomePet}</Text>}
            <RadioButton.Group
                onValueChange={setEspecie}
                value={especie}
              >
                <View style={styles.radioContainer}>
                <Text>Espécie:</Text>
                <TouchableOpacity
                  style={styles.radioAlign}
                  onPress={() => setEspecie('cachorro')}
                >
                  <RadioButton value="cachorro" />
                  <Text>Cachorro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioAlign}
                  onPress={() => setEspecie('gato')}
                >
                  <RadioButton value="gato" />
                  <Text>Gato</Text>
                </TouchableOpacity>
                </View>
              </RadioButton.Group>

            <Input placeholder="Raça" maxLength={30}  value={raca} onChangeText={setRaca} />
            {errors.raca && <Text style={styles.errorStyle}>{errors.raca}</Text>}

            
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
    justifyContent: "flex-Start",
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
  },
  errorStyle: {
    color: "red"
  }
});