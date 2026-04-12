import { TextInput, View, Text, StyleSheet, Button,Linking, TouchableOpacity} from 'react-native';

export default function Form({h1, h2, h3, children, btnPlaceholder}) {
    return (
        <View style={styles.formContainer}>
          
            <Text style={styles.h1}>{h1}</Text>
            <Text style={styles.h2}>{h2}</Text>
            <Text style={styles.h3}>{h3}</Text>

            <View>
              {children}

              <View style={styles.buttonContainer}>
                <Button  title={btnPlaceholder} onPress={() => {}} />
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
  


});