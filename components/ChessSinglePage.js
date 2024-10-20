import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export function ChessSinglePage() {
  const [chess, setChess] = useState(null);
  const [isPending, setPending] = useState(false);
  
  const navigation = useNavigation();
  const route = useRoute();
  const { chessId } = route.params; // Access chessId passed from the previous screen

  useEffect(() => {
    setPending(true);
    axios.get(`https://chess.sulla.hu/chess/${chessId}`)
      .then(res => setChess(res.data))
      .catch(console.error)
      .finally(() => setPending(false));
  }, [chessId]);

  return (
    <View style={styles.container}>
      {isPending || !chess ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.card}>
          <Text style={styles.title}>Sakkozó neve: {chess.name}</Text>
          <Text style={styles.detail}>Születési dátuma: {chess.birth_date}</Text>
          <Text style={styles.detail}>Nyert világbajnokságok: {chess.world_ch_won}</Text>

          <Image
            source={{ uri: chess.image_url || "https://via.placeholder.com/400x800" }}
            style={styles.image}
          />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WebViewScreen', { url: chess.profile_url })}>
            <Text style={styles.buttonText}>Wikipédia profil</Text>
          </TouchableOpacity>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Vissza</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChessMod', { chessId: chess.id })}>
              <Text style={styles.buttonText}>Módosítás</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E6FA',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF', // Gomb háttérszín
    borderRadius: 20, // Lekerekítés
    paddingVertical: 10, // Felső és alsó padding
    paddingHorizontal: 20, // Bal és jobb padding
    marginVertical: 5, // Függőleges távolság a gombok között
    alignItems: 'center', // Középre igazítás
    flex: 1, // Kitölti a rendelkezésre álló helyet
    marginHorizontal: 5, // Hely a gombok között
  },
  buttonText: {
    color: '#FFFFFF', // Gomb szöveg színe
    fontSize: 16,
    textAlign: 'center', // Középre igazítás
  },
});

export default ChessSinglePage;
