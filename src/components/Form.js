import { TextInput, View, Text, StyleSheet, Button,Linking, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Form({h1, h2, h3, children, btnPlaceholder, screen1, screen1Text, screen2, screen2Text, onPress}) {
  const navigation = useNavigation();
  return (
        <View style={styles.formContainer}>
          
            <Text style={styles.h1}>{h1}</Text>
            <Text style={styles.h2}>{h2}</Text>
            <Text style={styles.h3}>{h3}</Text>

            <View>
              {children}
            
              
              <View style={styles.buttonContainer}>
                <Button  title={btnPlaceholder} onPress={onPress} />
              </View>
              
              <View style={styles.screen}>
                <TouchableOpacity  onPress={() => navigation.navigate(screen1)}>
                  <Text style={styles.screenText}>
                    {screen1Text}
                  </Text>
                </TouchableOpacity>

                {screen2 && (
                  <TouchableOpacity onPress={() => navigation.navigate(screen2)}>
                    <Text style={styles.screenText}>
                      {screen2Text}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#083068"
  },
  h2: {
    fontSize: 24,
    marginBottom: 5,
    color: "black"
  },
  h3: {
    fontSize: 20,
    color: "black",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    marginTop: 8,
    gap: 8,
    alignItems: "center",
  }
  ,  
  screenText: {
    color: "blue",
  }
  


});