import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { setProductos } from "../redux/stockSlice";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import Contador from "../components/contador";

const Faltante = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const lista = useSelector((state) => state.productos.lista);

  useEffect(() => {
    const productosRef = ref(database, "categoria/");
    const unsubscribe = onValue(productosRef, (snapshot) => {
      const data = snapshot.val();
      const listaFinal = data
        ? Object.keys(data).map((id) => ({ id, ...data[id] }))
        : [];
      dispatch(setProductos(listaFinal));
    });
    return () => unsubscribe();
  }, []);


  const productosFaltantes = (lista || []).filter((item) => {
    const coincideNombre = item.nombre?.toLowerCase().includes(search.toLowerCase());
    const esFaltante = (item.cantidad || 0) < 2; // Condición de stock crítico
    return coincideNombre && esFaltante;
  });

  if (!lista) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚠️ Reposición Urgente</Text>

      <View style={styles.redes}>
        <Image source={require("../assets/Img/icons-facebook.png")} />
        <Image source={require("../assets/Img/icons-instagram.png")} />
        <Image source={require("../assets/Img/icons-whatsapp.png")} />
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={22} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar en faltantes..."
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <MaterialIcons name="close" size={22} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.textoSecundario}>
        {productosFaltantes.length > 0 
          ? "Productos con stock bajo (menos de 2):" 
          : "✅ Todo el stock está al día."}
      </Text>

      <FlatList
        data={productosFaltantes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: "red" }]}> 
            <Text style={styles.productTitle}>{item.nombre}</Text>
            <Text style={{ color: "black" }}>Precio: ${item.precio}</Text>
            
            <Text style={styles.stockAlert}>
              Stock Crítico: {item.cantidad || 0}
            </Text>

            {/* <Contador item={item} /> */}
          </View>
        )}
      />
    </View>
  );
};

export default Faltante;

const styles = StyleSheet.create({
 
  stockAlert: {
    color: "red",
    fontWeight: "bold",
    marginVertical: 5,
  },
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  redes: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  searchSection: {
    width: "100%",
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 8,

     shadowColor: "#810baf",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
  searchInput: { flex: 1 },
  textoSecundario: {
    marginVertical: 15,
    fontSize: 16,
    color: "#444",
  },
  card: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1.5,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: { width: "100%" },
  listContent: { paddingHorizontal: 5 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { fontSize: 18 },
});