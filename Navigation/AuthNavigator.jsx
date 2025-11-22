import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../pages/autenticacion/LoginScreen.jsx";     
import RegisterScreen from "../pages/autenticacion/RegisterScreen";


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
