import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux"; 
import { agregarAlCarrito, quitarDelCarrito, agregarConStock, quitarConStock } from "../redux/carritoSlice";


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
      {/* BOTÓN RESTAR */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => dispatch(quitarConStock(item.id))}
        disabled={cantidadActual === 0}
      >
        <Text style={styles.btnText}>➖</Text>
      </TouchableOpacity>

      {/* CANTIDAD CORRECTA */}
      <Text style={styles.numero}>{cantidadActual}</Text>

      {/* BOTÓN SUMAR */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => dispatch(agregarConStock(item))}
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
