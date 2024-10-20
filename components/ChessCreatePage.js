import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export function ChessCreatePage() {
  const [form, setForm] = useState({
    name: '',
    birth_date: '',
    world_ch_won: '',
    profile_url: '',
    image_url: ''
  });
  const navigation = useNavigation();

  const handleSubmit = () => {
    axios.post('https://chess.sulla.hu/chess', form)
      .then(() => {
        Alert.alert('Success', 'Sakkozó added successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('ChessList') }
        ]);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'Something went wrong while adding sakkozó.');
      });
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Új sakkozó</Text>

      <TextInput
        style={styles.input}
        placeholder="Sakkozó neve"
        value={form.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Születési dátuma (YYYY-MM-DD)"
        value={form.birth_date}
        onChangeText={(value) => handleInputChange('birth_date', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Nyert világbajnokságai"
        value={form.world_ch_won}
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('world_ch_won', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Profil URL-je"
        value={form.profile_url}
        onChangeText={(value) => handleInputChange('profile_url', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Kép URL-je"
        value={form.image_url}
        onChangeText={(value) => handleInputChange('image_url', value)}
      />

      <Button title="Küldés" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ChessCreatePage;
