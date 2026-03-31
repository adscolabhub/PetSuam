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
                <Button  title={btnPlaceholder}/>
              </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#083068"
  },
  h2: {
    fontSize: 20,
    marginBottom: 5,
    color: "#C8DBEF"
  },
  h3: {
    fontSize: 18,
    color: "#C8DBEF"
  },
  buttonContainer: {
    marginTop: 10,
  },
  formContainer: {
  }


});