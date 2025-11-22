import { StyleSheet, Text, FlatList, Image, Pressable } from "react-native";
import { useGetCategoriaQuery } from "../service/shopService";
import Contador from "../components/contador";


export default function CategoriaScreen({ navigation }) {
  const { data: categorias, isLoading, error } = useGetCategoriaQuery();

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("productos", item.id)}
      style={styles.item}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.categoriaImage}
      />
      <Text style={styles.categoriaTitle}>{item.title}</Text>
       <Contador id={item.id} />

    </Pressable>
  );

  if (isLoading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error</Text>;
}

const styles = StyleSheet.create({
  categoriaImage: { width: 80, height: 80 },
  categoriaTitle: { fontSize: 18, fontWeight: "bold" },
});
