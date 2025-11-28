import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useGetCategoriaQuery } from "../service/shopService"; // 👈 IMPORTANTE

import Contador from "../components/contador";

const Home = ({ navigation }) => {
  const { data: categorias, error, isLoading } = useGetCategoriaQuery();

  if (isLoading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Error al cargar productos</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home!</Text>

      <View style={styles.redes}>
        <Image source={require("../assets/Img/icons-facebook.png")} />
        <Image source={require("../assets/Img/icons-instagram.png")} />
        <Image source={require("../assets/Img/icons-whatsapp.png")} />
      </View>
      <Text style={styles.textoSecundario}>Productos disponibles:</Text>

      {/*  LISTA DE PRODUCTOS (desde Firebase) */}
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.Image }} style={styles.productImg} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Contador id={item.id} />
          </View>
        )}
        style={styles.list} //
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
   textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  redes: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    gap: 15,
  },

  addButtonContainer: {
    marginTop: 0, 
   },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    width: "95%",
    padding: 10,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    elevation: 3,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },

  listContent: {
    alignItems: "center",
  },
});
