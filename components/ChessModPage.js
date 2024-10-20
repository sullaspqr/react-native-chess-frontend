import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export function ChessModPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.chessId; // Retrieve chessId from route parameters
  const [chess, setChess] = useState({
    name: '',
    birth_date: '',
    world_ch_won: 0,
    profile_url: '',
    image_url: ''
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChessData = async () => {
      try {
        const response = await axios.get(`https://chess.sulla.hu/chess/${id}`);
        setChess(response.data);
      } catch (error) {
        console.log('Error fetching chess data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChessData();
  }, [id]);

 const handleInputChange = (name, value) => {
    setChess(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://chess.sulla.hu/chess/${id}`, chess);
      Alert.alert('Success', 'Sakkozó módosítva!', [{ text: 'OK', onPress: () => navigation.navigate('ChessList') }]);
    } catch (error) {
      console.log('Error updating chess data:', error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F5F5F5' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Egy sakkozó módosítása</Text>
      <TextInput
        placeholder="Sakkozó név"
        value={chess.name}
        onChangeText={value => handleInputChange('name', value)}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Születési dátum"
        value={chess.birth_date}
        onChangeText={value => handleInputChange('birth_date', value)}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Nyert világbajnokságok"
        keyboardType="numeric"
        value={chess.world_ch_won.toString()}
        onChangeText={value => handleInputChange('world_ch_won', parseInt(value))}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Profil URL-je"
        value={chess.profile_url}
        onChangeText={value => handleInputChange('profile_url', value)}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Kép URL-je"
        value={chess.image_url}
        onChangeText={value => handleInputChange('image_url', value)}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      {chess.image_url ? (
        <Image
          source={{ uri: chess.image_url }}
          style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 15 }}
          resizeMode="cover"
        />
      ) : null}
      <Button title="Küldés" onPress={handleSubmit} color="#28a745" />
    </View>
  );
}

export default ChessModPage;
