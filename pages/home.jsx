import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "react-native";
import TabNavigator from "../Navigation/TabNavigator";

const Home = ({ navigation }) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Home!</Text>
        <View style={styles.redes}>
          <Image source={require("../assets/Img/icons-facebook.png")} />
          <Image source={require("../assets/Img/icons-instagram.png")} />
          <Image source={require("../assets/Img/icons-whatsapp.png")} />
          <TabNavigator />
        </View>
      </View>
      {/*   BOTONES DEL MENU */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProductList")}
        >
          <Text style={styles.buttonText}>Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Ventas")}
        >
          <Text style={styles.buttonText}>Ventas</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textoSecundario}>
        Aquí se mostrarán los productos agregados.
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // centra verticalmente
    alignItems: "center", // centra horizontalmente
    backgroundColor: "rgba(238, 238, 255, 1)",
    paddingVertical: 20,
  },
  title: {
    width: 100,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // espacio entre título y botón
  },

  redes: {
    flexDirection: "row",
    margin: 10,
    gap: 15,
  },

  textoSecundario: {
    marginBottom: 5,
    alignItems: "center",
    left: 30,
    fontSize: 16,
    marginTop: 20,
  },
  menu: {
    flexDirection: "row", // para poner botones lado a lado
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // espacio horizontal entre botones (RN 0.71+)
    paddingVertical: 10,
    marginTop: 20,
    borderBottomColor: "#eee",
    elevation: 4,
    borderBottomWidth: 2,
    backgroundColor: "#E8E8E8",
  },
  buttonText: {
    width: 100,
  },
});
