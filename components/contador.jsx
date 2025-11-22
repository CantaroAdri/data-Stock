import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Contador = () => {
  const [cantidad, setCantidad] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => setCantidad(Math.max(0, cantidad - 1))}
      >
        <Text style={styles.btnText}>➖</Text>
      </TouchableOpacity>

      <Text style={styles.numero}>{cantidad}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => setCantidad(cantidad + 1)}
      >
        <Text style={styles.btnText}>➕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contador;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  numero: {
    fontSize: 18,
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
  },
});
