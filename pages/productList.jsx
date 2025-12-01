import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Image } from "react-native";
import { useGetProductsQuery } from "../redux/shopService";
import AddProducts from "../components/addProducts";

const ProductList = ({  }) => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Ocurrió un error: {error.message}</Text>;


  <FlatList
  data={Object.values(products || {})}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <Text>{item.nombre}</Text>
  )}
/>


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>
      <View style={styles.redes}>
        <Image source={require("../assets/Img/icons-facebook.png")} />
        <Image source={require("../assets/Img/icons-instagram.png")} />
        <Image source={require("../assets/Img/icons-whatsapp.png")} />
      </View>
     
      <AddProducts />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    justifyContent: "space-between", // 👈 mantiene todo arriba
    alignItems: "center", // 👈 muy poco espacio debajo del título
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  redes: {
    flexDirection: "row",
    margin: 10,
    gap: 15,
  },
  menu: {
    flexDirection: "row", // para poner botones lado a lado
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // espacio horizontal entre botones (RN 0.71+)
    paddingVertical: 10,
    marginTop: 20,
    borderColor: "#000000",
    borderRadius: 15,
    elevation: 10,
    borderBottomWidth: 2,
    backgroundColor: "#E8E8E8",
  },

  addButtonContainer: {
    marginTop: 0, // 👈 elimina separación entre texto y botón
  },
});
