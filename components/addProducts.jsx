// 

import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from "react-native";

import {
  useAddCategoriaMutation,
  useGetCategoriaQuery,
  useDeleteCategoriaMutation,
} from "../service/shopService";

const AddProducts = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");

  const { data: categorias } = useGetCategoriaQuery();
  const [addCategoria] = useAddCategoriaMutation();
  const [deleteCategoria] = useDeleteCategoriaMutation();

  const handleAgregar = async () => {
    if (!nombre.trim()) return;

    await addCategoria({
      nombre,
      precio,
      cantidad,
    });

    setNombre("");
    setPrecio("");
    setCantidad("");
  };

  return (
    <View>
      <Text style={styles.title}>Agregar Producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <TouchableOpacity style={styles.btn} onPress={handleAgregar}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>

      {/* LISTADO */}
      {categorias?.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text>{item.nombre} — ${item.precio} x{item.cantidad}</Text>
          <TouchableOpacity onPress={() => deleteCategoria(item.id)}>
            <Text>❌</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  btn: { backgroundColor: "green", padding: 10, marginVertical: 10 },
  btnText: { color: "#fff", textAlign: "center" },
  item: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});
