
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/home";
import ProductList from "../pages/productList";
import Ventas from "../pages/ventas";
import ScreenStart from "../pages/screenStart";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Ventas" component={Ventas} />
      <Stack.Screen name="incio " component={ScreenStart} />
    </Stack.Navigator>
  );
}