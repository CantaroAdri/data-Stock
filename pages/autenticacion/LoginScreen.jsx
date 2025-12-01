import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { useLoginMutation } from "../../redux/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";

const textInputWidth = Dimensions.get("window").width * 0.8;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [login, result] = useLoginMutation(); 

  const onSubmit = () => {
    login({ email, password });
    alert("Completa todos los campos");
  };
  useEffect(() => {
    if (result.status == "fulfilled") {
      dispatch(setUser(result.data));
    } else if (result.status == "rejected") {
      alert("Error al registrar el usuario");
    }
  });

return (
  <View style={styles.containerMain}>
    <View style={styles.container}>
      <Text style={styles.title}>Data Stock</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        placeholderTextColor="#ffffff"
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="password"
        placeholderTextColor="#ffffff"
        style={styles.input}
      />
    </View>

    <View style={styles.containerButton}>
      <Text style={styles.textButton}>No tiene cuenta?</Text>
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.textButtonLink}>Registrarse</Text>
      </Pressable>
    </View>
    <Pressable style={styles.buttonRegister} onPress={onSubmit}>
      <Text>Iniciar</Text>
    </Pressable>
  </View>
);
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerMain:{
    backgroundColor: "#790129ff",
    flex: 0.5,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    alignItems: "center",
    width: "100%",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",

  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#ffffff",

  },

  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: "#ffffff",
    color: "#ffffff",
  },

  containerButton: {
    flexDirection: "column",
    marginTop: 50,
    alignItems: "center",
  },

  textButton: {
    fontSize: 14,
    color: "#ffffff",
    
  },

  textButtonLink: {
    color: "ffc107",
    marginLeft: 4,
  },

  buttonRegister: {
    marginTop: 20,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
});
