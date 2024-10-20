import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


// Import your pages
import { ChessListPage } from './components/ChessListPage';
import { ChessSinglePage } from './components/ChessSinglePage';
import { ChessCreatePage } from './components/ChessCreatePage';
import { ChessModPage } from './components/ChessModPage';
import { ChessDelPage } from './components/ChessDelPage';
import  WebViewScreen from './components/WebViewScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator()  {
  return (
      <Stack.Navigator initialRouteName="ChessList">
        <Stack.Screen 
          name="ChessList" 
          component={ChessListPage} 
          options={{ title: '', headerShown: false }} 
        />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        <Stack.Screen 
          name="ChessSingle" 
          component={ChessSinglePage} 
          options={{ title: 'Sakkozó Részletek' }} 
        />
        <Stack.Screen 
          name="ChessCreate" 
          component={ChessCreatePage} 
          options={{ title: 'Új sakkozó' }} 
        />
        <Stack.Screen 
          name="ChessMod" 
          component={ChessModPage} 
          options={{ title: 'Sakkozó Módosítása' }} 
        />
        <Stack.Screen 
          name="ChessDel" 
          component={ChessDelPage} 
          options={{ title: 'Sakkozó Törlése' }} 
        />
      </Stack.Navigator>

  );
}
export default App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ChessList">
        <Drawer.Screen name="Home" component={StackNavigator} options={{ title: 'Sakkozók' }} />
        <Drawer.Screen 
          name="ChessCreate" 
          component={ChessCreatePage} 
          options={{ title: 'Új Sakkozó' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


