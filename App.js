
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

const SECRET = "mySuperSecretKey";

export default function App() {
  const [text, setText] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const encrypt = async (plainText) => {
    const buffer = new TextEncoder().encode(plainText + SECRET);
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, plainText + SECRET);
    return digest;
  };

  const saveToFile = async () => {
    const encryptedText = await encrypt(text);
    const fileUri = FileSystem.documentDirectory + "secure.txt";
    await FileSystem.writeAsStringAsync(fileUri, encryptedText);
    alert("Saved Encrypted File");
  };

  const loadFromFile = async () => {
    const fileUri = FileSystem.documentDirectory + "secure.txt";
    const content = await FileSystem.readAsStringAsync(fileUri);
    setDecrypted(content);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text to encrypt"
        onChangeText={setText}
        value={text}
      />
      <Button title="Save Encrypted File" onPress={saveToFile} />
      <Button title="Load Encrypted File" onPress={loadFromFile} />
      <Text style={styles.output}>{decrypted}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  output: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});
