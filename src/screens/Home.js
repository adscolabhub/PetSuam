import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Platform
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


export default function Home({ navigation }) {
  
  // Dummy data mirroring your design structure
  const pets = [
    {
      id: '1',
      nome: 'Rex',
      raca: 'Vira Lata',
      especie: 'Canina',
      foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '2',
      nome: 'Pipoca',
      raca: 'Pinscher',
      especie: 'Canina',
      foto: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=150&auto=format&fit=crop'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/background4.png')}
        resizeMode="cover"
        style={styles.image}
      >
        {/* Main Content Area */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headerText}>Meus Pets</Text>

          {/* Render Pet List */}
          {pets.map((pet) => (
            <TouchableOpacity 
              key={pet.id} 
              style={styles.petCard}
              activeOpacity={0.8}
            >
              <Image source={{ uri: pet.foto }} style={styles.petAvatar} />
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.nome}</Text>
                <Text style={styles.petDetail}><Text style={styles.boldLabel}>Raça:</Text> {pet.raca}</Text>
                <Text style={styles.petDetail}><Text style={styles.boldLabel}>Espécie:</Text> {pet.especie}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Add New Pet Interactive Button */}
          <TouchableOpacity 
            style={styles.addPetButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CadastroPet') }
          >
            <MaterialCommunityIcons name="plus-circle-outline" size={36} color="#083068" />
            <Text style={styles.addPetText}>ADICIONAR NOVO PET</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Global Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.6}>
            <MaterialCommunityIcons name="paw" size={32} color="#4A90E2" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} activeOpacity={0.6}>
            <FontAwesome5 name="map-marked-alt" size={28} color="#A0AEC0" />
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 100, // Keeps cards from slipping under the navbar
  },
  headerText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#083068',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  petCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    // Elegant soft shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  petAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#CBD5E0',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  petInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  petName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    textDecorationLine: 'underline', // Kept from your wireframe concept
    marginBottom: 4,
  },
  petDetail: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 2,
  },
  boldLabel: {
    fontWeight: '600',
    color: '#2D3748',
  },
  addPetButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 2,
    borderColor: '#083068',
    borderStyle: 'dashed', // Changes button style to a smart actionable element
    borderRadius: 18,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  addPetText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#083068',
    letterSpacing: 0.5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: Platform.OS === 'ios' ? 15 : 0, // Extra cushion for iOS home indicators
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 10,
  },
  navItem: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }
});