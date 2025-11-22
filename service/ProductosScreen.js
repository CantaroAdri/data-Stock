import { useGetProductosQuery } from "../service/shopService";
import { FlatList, Text, Image } from "react-native";

export default function ProductosScreen({ route }) {
  const categoriaId = route.params;

  const { data: productos, isLoading, error } =
    useGetProductosQuery(categoriaId);

  if (isLoading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Error al cargar</Text>;

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <>
          <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
          <Text>{item.title}</Text>
          <Text>${item.price}</Text>
        </>
      )}
    />
  );
}
