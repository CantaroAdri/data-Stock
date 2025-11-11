import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import TabNavigator from "../Navigation/TabNavigator";
import AddProducts from "../components/addProducts";

const ProductList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>
      <View style={styles.redes}>
        <Image source={require("../assets/Img/icons-facebook.png")} />
        <Image source={require("../assets/Img/icons-instagram.png")} />
        <Image source={require("../assets/Img/icons-whatsapp.png")} />
        <TabNavigator />
      </View>

      <AddProducts />

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Ventas")}
        >
          <Text style={styles.buttonText}>Ventas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    justifyContent: "space-between", // 👈 mantiene todo arriba
    alignItems: "center", // 👈 muy poco espacio debajo del título
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  redes: {
    flexDirection: "row",
    margin: 10,
    gap: 15,
  },
  menu: {
    flexDirection: "row", // para poner botones lado a lado
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // espacio horizontal entre botones (RN 0.71+)
    paddingVertical: 10,
    marginTop: 20,
    borderColor: "#000000",
    borderRadius: 15,
    elevation: 10,
    borderBottomWidth: 2,
    backgroundColor: "#E8E8E8",
  },

  addButtonContainer: {
    marginTop: 0, // 👈 elimina separación entre texto y botón
  },
});
