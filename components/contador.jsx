import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Item } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Necesarios para conectar a Redux
import { agregarAlCarrito, quitarDelCarrito } from "../redux/carritoSlice"; // Importa las acciones del carrito

const Contador = ({ item }) => {
  const dispatch = useDispatch();

  const cantidadActual = useSelector(
    (state) => state.carritoReducer.items[item.id]?.cantidad || 0
  );

  const handleIncrementar = () => {
    dispatch(agregarAlCarrito(item));
  };

  const handleDecrementar = () => {
    dispatch(quitarDelCarrito(item.id));
  };

  return (
    <View style={styles.container}>
      {/* BOTÓN DECREMENTAR */}
      <TouchableOpacity
        style={styles.btn}
        onPress={handleDecrementar}
        disabled={cantidadActual === 0}
      >
        <Text style={styles.btnText}>➖</Text>
      </TouchableOpacity>

      {/* MOSTRAR CANTIDAD ACTUAL DEL CARRITO */}
      <Text style={styles.numero}>{cantidadActual}</Text>

      {/* BOTÓN INCREMENTAR */}
      <TouchableOpacity style={styles.btn} onPress={handleIncrementar}>
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
