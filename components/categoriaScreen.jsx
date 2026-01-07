import { StyleSheet, Text, FlatList, Image, Pressable } from "react-native";
import { useGetCategoriaQuery } from "../redux/shopService";
import Contador from "../components/contador";


export default function CategoriaScreen({ navigation }) {
  const { data: categorias, isLoading, error } = useGetCategoriaQuery();

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("ProductList", { id: item.id })}
      style={styles.item}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.categoriaImage}
      />
      <Text style={styles.categoriaTitle}>{item.title}</Text>
       <Contador item={item} />

    </Pressable>
  );

  if (isLoading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <FlatList
      data={categorias || []}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', marginBottom: 8, borderRadius: 6 },
  categoriaImage: { width: 80, height: 80 },
  categoriaTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 12 },
});
