import React, { useState } from "react";
import { shopApi } from "../service/shopService";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { database } from "../firebase"; 
import { ref, push } from "firebase/database";

const AddProducts = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // 👉 Referencia correcta a Realtime Database
  const categoriaRef = ref(database, "categoria");

  const handleAgregar = async () => {
    if (!nombre.trim() || !precio || !cantidad) {
      alert("Por favor completa todos los campos");
      return;
    }

    const nuevo = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      precio: parseFloat(precio) || 0,
      cantidad: parseInt(cantidad, 10) || 0,
    };

    try {
      const referencia = await push(categoriaRef, nuevo);
      console.log("Producto guardado con ID:", referencia.key);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }

    setProductos((p) => [nuevo, ...p]);
    setNombre("");
    setPrecio("");
    setCantidad("");
    setMostrarFormulario(false);
  };

  const handleEliminar = (id) => {
    setProductos((p) => p.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar / Listado</Text>

      {!mostrarFormulario ? (
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setMostrarFormulario(true)}
        >
          <Text style={styles.primaryText}>➕ Crear producto</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.form}>
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
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, styles.save]}
              onPress={handleAgregar}
            >
              <Text style={styles.btnText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.cancel]}
              onPress={() => setMostrarFormulario(false)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={shopApi.useGetCategoriaQuery().data || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.nombre} — ${item.precio} — x{item.cantidad}
            </Text>
            <TouchableOpacity
              onPress={() => handleEliminar(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  primaryButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 8 },
  primaryText: { color: "#fff", textAlign: "center", fontSize: 18 },
  form: { marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  btn: { flex: 1, padding: 10, marginHorizontal: 5, borderRadius: 6 },
  save: { backgroundColor: "green" },
  cancel: { backgroundColor: "red" },
  btnText: { textAlign: "center", color: "#fff", fontSize: 16 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f5f5f5",
    marginTop: 10,
    borderRadius: 6,
  },
  itemText: { fontSize: 16 },
  deleteButton: { paddingHorizontal: 10 },
  deleteText: { fontSize: 18 },
});

export default AddProducts;
