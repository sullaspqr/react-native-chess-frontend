import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export function ChessDelPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.chessId; // Retrieve chessId from route parameters
  const [chess, setChess] = useState(null);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchChess = async () => {
      setPending(true);
      try {
        const res = await axios.get(`https://chess.sulla.hu/chess/${id}`);
        setChess(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setPending(false);
      }
    };

    fetchChess();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://chess.sulla.hu/chess/${id}`);
      Alert.alert('Success', 'Sakkozó törölve!', [{ text: 'OK', onPress: () => navigation.navigate('ChessList') }]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hiba történt a törlés során.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#E6E6FA' }}>
      {isPending || !chess ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Törlendő elem neve: {chess.name}</Text>
          <Text style={{ fontSize: 16 }}>Születési idő: {chess.birth_date}</Text>
          <Image
            source={{ uri: chess.image_url ? chess.image_url : 'https://via.placeholder.com/400x800' }}
            style={{ width: 300, height: 400, borderRadius: 10, marginVertical: 10 }}
          />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Button title="Mégsem" onPress={() => navigation.navigate('ChessList')} />
            <View style={{ width: 10 }} /> {/* Spacer */}
            <Button title="Törlés" onPress={handleDelete} color="red" />
          </View>
        </View>
      )}
    </View>
  );
}

export default ChessDelPage;
