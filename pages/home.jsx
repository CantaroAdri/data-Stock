import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { setProductos } from "../redux/stockSlice";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import Contador from "../components/contador";


const Home = () => {
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

  if (!lista) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  if (lista.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No hay productos disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home!</Text>

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
            placeholder="Buscar productos..."
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("") }>
              <MaterialIcons name="close" size={22} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.textoSecundario}>Productos disponibles:</Text>

      <FlatList
        data={lista.filter(item => item.nombre?.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.productTitle, { color: "black" }]}>
              {item.nombre}
            </Text>

            <Text style={{ color: "black" }}>Precio: ${item.precio}</Text>

            <Text style={{ color: "black" }}>
              En Stock: {item.cantidad || 0}
            </Text>

            <Contador item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
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
    marginBottom: 15,
    textAlign: "center",
    width: "100%",
  },
  redes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    gap: 15,
  },
  searchSection: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },
  textoSecundario: {
      margin: 25,
      padding: 30,
  },
  card: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#07c411ff",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },
  listContent: {
    paddingHorizontal: 5,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
  },
});
