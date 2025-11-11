import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const Ventas = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Ventas</Text>

      <Text style={styles.textoSecundario}>Ventas de productos agregados.</Text>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProductList")}
        >
          <Text style={styles.buttonText}>Lista de Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Ventas;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },

  addButtonContainer: {
    marginTop: 0, //
  },
});
