import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { database } from "../firebase";
import { ref, push, onValue, remove, update } from "firebase/database";

export default function AddProducts() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
const [editId, setEditId] = useState (null)
  const categoriaRef = ref(database, "categoria/");

  useEffect(() => {
    const unsubscribe = onValue(categoriaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setProductos(lista.reverse());
      } else {
        setProductos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // GUARDAR PRODUCTO
  const handleAgregar = async () => {
    if (!nombre.trim() || !precio || !cantidad) {
      alert("Por favor completa todos los campos");
      return;
    }

    const nuevo = {
      nombre,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad),
    };

    try {
      if (editId) {
        // MODO EDICIÓN: Actualizamos el nodo existente
        const productoRef = ref(database, `categoria/${editId}`);
        await update(productoRef, nuevo);
        setEditId(null); 
        // Limpiamos el modo edición
      } else {
      await push(categoriaRef, nuevo);}
      setNombre("");
      setPrecio("");
      setCantidad("");
      setMostrarFormulario(false);
    } catch (e) {
      console.error("Error agregando producto:", e);
      alert("Error al guardar el producto.");
    }
  };

  //EDITAR PRODUCTO
  const handleEdit = (item) => {
    setEditId(item.id); // Guardamos el ID que vamos a modificar
    setNombre(item.nombre);
    setPrecio(item.precio.toString());
    setCantidad(item.cantidad.toString());
    setMostrarFormulario(true); // Abrimos el formulario con los datos cargados
  };

  // ELIMINAR PRODUCTO
  const handleEliminar = (id) => {
    remove(ref(database, "categoria/" + id));
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
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.nombre} — ${item.precio} — x{item.cantidad}
            </Text>

            <TouchableOpacity onPress={() => handleEliminar(item.id)}>
              <Text style={{ fontSize: 22 }}>❌</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleEdit(item)}>
              <MaterialIcons name="edit" size={24} color="#527dff" margin={5} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 10, fontWeight: "bold" },
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
});
