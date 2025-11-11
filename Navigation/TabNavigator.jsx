import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CarritoScreen from '../components/carrito';


const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
        
      <Tab.Screen
        name="Carrito"
        component={CarritoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="shopping-cart"
              size={30}
              color={focused ? '#50AD5C' : '#999999ff'}
            />
          ),
          tabBarLabel: 'Carrito',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    borderRadius: 15,
    height: 40,
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 10,
  },
});