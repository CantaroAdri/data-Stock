import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";

const Carrito = ({ carrito = [], setCarrito = () => {} }) => {
  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const finalizarCompra = async () => {
    if (carrito.length === 0) return Alert.alert("El carrito está vacío ❌");
    // Aquí iría la lógica de guardar en Firestore si la tienes configurada
    Alert.alert("✅ Compra finalizada con éxito");
    vaciarCarrito();
  };

  if (carrito.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>El carrito está vacío 🛒</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <FlatList
        data={carrito}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: item.img }} style={styles.img} />
              <Text style={styles.itemText}>
                {item.titulo} - ${item.precio}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => quitarDelCarrito(item.id)}
            >
              <Text style={styles.deleteBtnText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.buyBtn} onPress={finalizarCompra}>
        <Text style={styles.buyBtnText}>✅ Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { fontSize: 18, color: "#888" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  img: { width: 50, height: 50, marginRight: 10, borderRadius: 6 },
  itemText: { fontSize: 16 },
  deleteBtn: { backgroundColor: "#f44336", padding: 8, borderRadius: 6 },
  deleteBtnText: { color: "#fff", fontWeight: "bold" },
  buyBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buyBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default Carrito;