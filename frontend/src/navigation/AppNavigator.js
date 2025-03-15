import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen/AddProductScreen';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: 'white',
                }}
            >
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        title: 'Lista zakupów',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddProduct')}
                            >
                                <Text style={{ color: 'white' }}>Dodaj</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen 
                    name="AddProduct" 
                    component={AddProductScreen}
                    options={{ title: 'Dodaj produkt' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;