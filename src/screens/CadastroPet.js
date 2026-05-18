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
import Form from "../components/Form.js";
import Input from "../components/Input.js";
import { db } from "../firebase/config";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from "../firebase/config"; // Used to detect the active logged-in user
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CadastroPet({ navigation }) {
  const [value, setValue] = React.useState('macho');
  const [especie, setEspecie] = React.useState('cachorro');
  const [nomePet, setNomePet] = React.useState("");
  const [raca, setRaca] = React.useState("");
  const [castrado, setCastrado] = React.useState('nao');
  const [errors, setErrors] = React.useState({});

  const validarCampo = (campo, valor) => {
    let mensagem = "";

    switch(campo) {
      case "nomePet":
        if (!valor.trim()) mensagem = "Nome do pet é obrigatório";
        break;
      case "raca":
        if (!valor.trim()) mensagem = "A raça do pet é obrigatória";
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [campo]: mensagem
    }));
  };

  const validar = () => {
    let valido = true;
    const newErrors = { nomePet: "", raca: "" };
    
    if (!nomePet.trim()) { newErrors.nomePet = "Nome do pet é obrigatório"; valido = false; }
    if (!raca.trim()) { newErrors.raca = "A raça do pet é obrigatória"; valido = false; }

    setErrors(newErrors);
    return valido;
  };

  const salvarPet = async () => {
    if (validar()) {
      const nomePetNormalizado = nomePet.trim();
      const racaNormalizada = raca.trim();

      try {
        // 1. Check if there is an active logged-in user session
        const usuarioAtual = auth.currentUser;
        
        if (!usuarioAtual) {
          Alert.alert("Erro", "Sessão expirada. Por favor, faça login novamente.");
          navigation.navigate('Login');
          return;
        }

        const uid = usuarioAtual.uid;

        // 2. Direct injection into subcollection: usuarios -> current UID -> pets
        await addDoc(collection(db, "usuarios", uid, "pets"), {
          nome: nomePetNormalizado,
          especie: especie,
          raca: racaNormalizada,
          sexo: value,
          castrado: castrado,
          criadoEm: serverTimestamp()
        });

        // 3. Clear form states
        setValue("macho");
        setEspecie("cachorro");
        setNomePet("");
        setRaca("");
        setCastrado("nao");
        
        Alert.alert('Sucesso!', '🐾 Novo pet cadastrado com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home'); 
            }
          }
        ]);
      } catch (error) {
        Alert.alert("Erro ao salvar", "Não foi possível cadastrar o pet: " + error.message);
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
            h2="Cadastro do Pet"
            h3="Adicione um pet ao PetSuam"
            btnPlaceholder="Salvar Pet"
            screen1="Home"
            screen1Text="Voltar"
            onPress={salvarPet} // Changed to the corrected function name
          >
            
            {/* --- SEÇÃO: DADOS DO PET --- */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Dados do Pet</Text>

              <Input 
                placeholder="Nome do Pet" 
                maxLength={30} 
                autoCapitalize="words" 
                value={nomePet} 
                onChangeText={setNomePet}
                onBlur={() => validarCampo("nomePet", nomePet)}
              />
              {errors.nomePet ? <Text style={styles.errorStyle}>{errors.nomePet}</Text> : null}

              {/* Selector de Espécie */}
              <Text style={styles.labelSelect}>Espécie</Text>
              <View style={styles.toggleRow}>
                <TouchableOpacity 
                  style={[styles.toggleButton, especie === 'cachorro' && styles.toggleButtonActive]}
                  onPress={() => setEspecie('cachorro')}
                >
                  <MaterialCommunityIcons name="dog" size={20} color={especie === 'cachorro' ? '#FFF' : '#4A5568'} />
                  <Text style={[styles.toggleText, especie === 'cachorro' && styles.toggleTextActive]}>Cachorro</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleButton, especie === 'gato' && styles.toggleButtonActive]}
                  onPress={() => setEspecie('gato')}
                >
                  <MaterialCommunityIcons name="cat" size={20} color={especie === 'gato' ? '#FFF' : '#4A5568'} />
                  <Text style={[styles.toggleText, especie === 'gato' && styles.toggleTextActive]}>Gato</Text>
                </TouchableOpacity>
              </View>

              <Input 
                placeholder="Raça" 
                maxLength={30}  
                value={raca} 
                onChangeText={setRaca} 
                onBlur={() => validarCampo("raca", raca)}
              />
              {errors.raca ? <Text style={styles.errorStyle}>{errors.raca}</Text> : null}

              {/* Selector de Sexo */}
              <Text style={styles.labelSelect}>Sexo</Text>
              <View style={styles.toggleRow}>
                <TouchableOpacity 
                  style={[styles.toggleButton, value === 'macho' && styles.toggleButtonActive]}
                  onPress={() => setValue('macho')}
                >
                  <MaterialCommunityIcons name="gender-male" size={20} color={value === 'macho' ? '#FFF' : '#4A5568'} />
                  <Text style={[styles.toggleText, value === 'macho' && styles.toggleTextActive]}>Macho</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleButton, value === 'femea' && styles.toggleButtonActive]}
                  onPress={() => setValue('femea')}
                >
                  <MaterialCommunityIcons name="gender-female" size={20} color={value === 'femea' ? '#FFF' : '#4A5568'} />
                  <Text style={[styles.toggleText, value === 'femea' && styles.toggleTextActive]}>Fêmea</Text>
                </TouchableOpacity>
              </View>

              {/* Selector de Castrado */}
              <Text style={styles.labelSelect}>O Pet é Castrado?</Text>
              <View style={styles.toggleRow}>
                <TouchableOpacity 
                  style={[styles.toggleButton, castrado === 'sim' && styles.toggleButtonActive]}
                  onPress={() => setCastrado('sim')}
                >
                  <MaterialCommunityIcons name="check" size={18} color={castrado === 'sim' ? '#FFF' : '#4A5568'} />
                  <Text style={[styles.toggleText, castrado === 'sim' && styles.toggleTextActive]}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleButton, castrado === 'nao' && styles.toggleButtonActive]}
                  onPress={() => setCastrado('nao')}
                >
                  <MaterialCommunityIcons name="close" size={18} color={castrado === 'nao' ? '#FFF' : '#4A5568'} />
                  <Text style={[styles.toggleText, castrado === 'nao' && styles.toggleTextActive]}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </Form>
        </ScrollView>
      </ImageBackground>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { flex: 1, width: '100%' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingBottom: 40, paddingTop: 40 },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 20,
    padding: 20,
    width: 320,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2D3748', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 5 },
  labelSelect: { fontSize: 14, fontWeight: '600', color: '#4A5568', marginTop: 15, marginBottom: 8 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  toggleButton: { flex: 1, flexDirection: 'row', height: 44, backgroundColor: '#EDF2F7', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: '#CBD5E0' },
  toggleButtonActive: { backgroundColor: '#4A90E2', borderColor: '#4A90E2' },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#4A5568', marginLeft: 6 },
  toggleTextActive: { color: '#FFFFFF' },
  errorStyle: { color: "#E53E3E", fontSize: 12, marginTop: 4, marginLeft: 4, fontWeight: '500' }
});