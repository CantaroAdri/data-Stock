import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setProductos } from "../redux/stockSlice";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import Contador from "../components/contador";

const Home = () => {
  const dispatch = useDispatch();

  
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

      <Text style={styles.textoSecundario}>Productos disponibles:</Text>

      <FlatList
        data={lista}
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
    borderColor: "red",
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
