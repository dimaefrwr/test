import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import AddProductScreen from './src/screens/AddProductScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="ShoppingList" 
            component={ShoppingListScreen} 
            options={{ title: 'Lista zakupów' }}
          />
          <Stack.Screen 
            name="AddProduct" 
            component={AddProductScreen} 
            options={{ title: 'Dodaj produkt' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}