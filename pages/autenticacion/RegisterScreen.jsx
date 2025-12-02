import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/authService";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, result] = useRegisterMutation();

  useEffect(() => {
    if (result.status === "fulfilled") {
      navigation.navigate("Login");
    }
    if (result.status === "rejected") {
      alert("Error al registrar el usuario");
    }
  }, [result.status]);

  const onSubmit = () => {
    register({ email, password, confirmPassword });
    alert("Completa todos los campos");

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    register({ email, password });
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.container}>
        <Text style={styles.title}>Data Stock</Text>
        <Text style={styles.subtitle}>Registrate para continuar</Text>

        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="#ffffff"
          style={styles.input}
        />

        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          style={styles.input}
        />

        <TextInput
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Repetir Password"
          placeholderTextColor="#ffffff"
          style={styles.input}
        />
      </View>

      <View style={styles.containerButton}>
        <Text style={styles.textButton}>¿Ya tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textButtonLink}>Inicia Sesión</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={styles.buttonRegister} onPress={onSubmit}>
          <Text>Crear Cuenta</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  containerMain: {
    flex: 0.5,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#790129ff",
  },

  container: {
    alignItems: "center",
    width: "100%",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "lightblue",
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,

    color: "lightblue",
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
    flexDirection: "row",
    marginTop: 10,
  },

  textButton: {
    color: "ffc107",

    fontSize: 14,
  },

  textButtonLink: {
    color: "lightblue",
    marginLeft: 4,
  },

  buttonRegister: {
    marginTop: 20,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
});
