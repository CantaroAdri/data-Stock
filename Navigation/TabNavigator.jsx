
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Home from "../pages/home";
import Ventas from "../pages/ventas";
import ProductList from "../pages/productList";
import ScreenContacto from "../pages/ScreenContacto";
import Facturacion from "../pages/facturacion";

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
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home"
              size={30}
              color={focused ? "#50AD5C" : "#999999ff"}
            />
          ),
          tabBarLabel: "Inicio",
        }}
      />
      
      <Tab.Screen
        name="Listado"
        component={ProductList}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="add-to-queue"
              size={30}
              color={focused ? "#50AD5C" : "#999999ff"}
            />
          ),
          tabBarLabel: "Productos",
        }}
      />

      <Tab.Screen
        name="Contactos"
        component={ScreenContacto}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
             name="location-pin"
              size={30}
              color={focused ? "#50AD5C" : "#999999ff"}
            />
          ),
          tabBarLabel: "Contactos",
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={Ventas}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
            name="shopping-cart"
              
              size={30}
              color={focused ? "#50AD5C" : "#999999ff"}
            />
          ),
          tabBarLabel: "Carrito",
        }}
      />
       <Tab.Screen
        name="Promedio"
        component={Facturacion}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
            name="attach-money"
              
              size={30}
              color={focused ? "#50AD5C" : "#999999ff"}
            />
          ),
          tabBarLabel: "Facturacion",
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
    backgroundColor: "#eee",
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 10,
  },
});
