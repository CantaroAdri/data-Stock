import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const AddProducts = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleAgregar = () => {
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
        style={styles.list}
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.meta}>
                ${item.precio} · qty {item.cantidad}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => handleEliminar(item.id)}
            >
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay productos</Text>}
      />
    </View>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    justifyContent: "center", // centra verticalmente
    alignItems: "center", // centra horizontalmente
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: 280,
    marginBottom: 10,
    elevation: 3,
    alignItems: "center",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    paddingVertical: 140,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
    elevation: 4,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    width: "100%",
    backgroundColor: "white",
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
});
