import { StatusBar } from 'expo-status-bar';
import { 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  View, 
  ImageBackground, 
  Text 
} from 'react-native';
import Form from "../components/Form.js";
import Input from "../components/Input.js";

export default function Cadastro() {
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
          >
     
            <Input placeholder="Nome Completo" autoCapitalize="words" />
            <Input placeholder="Número de Telefone" keyboardType="phone-pad" />
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
            <Input placeholder="Senha" secureTextEntry={true} />
            <Input placeholder="Confirmar Senha" secureTextEntry={true} />

            <Text style={styles.h2}>Cadastro Pet</Text>

        
            <Input placeholder="Nome do Pet" autoCapitalize="words" />
            <Input placeholder="Espécie" />
            <Input placeholder="Raça" />
            <Input placeholder="Sexo" />
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
    paddingTop: 30
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "black",
    marginTop: 25,
    marginBottom: 5,
    textAlign: 'center',
  },
});