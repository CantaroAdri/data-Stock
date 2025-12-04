import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import * as Location from "expo-location";
import PreMap from "../components/PreMap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { clearUser } from "../redux/authSlice";

const ScreenContacto = ({ navigation }) => {
  const db = useSQLiteContext();

  const dispatch = useDispatch();


  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("Ubicación no cargada");
  const [imageUri, setImageUri] = useState(null);

  const user = useSelector((state) => state.authReducer.value.email);
  const password = useSelector((state) => state.authReducer.value.password);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesita permiso de ubicación para mostrar el mapa.");
      setLocationText("Permiso de ubicación denegado");
      return;
    }
    try {
      const currentPosition = await Location.getCurrentPositionAsync({});

      const newLocation = {
        lat: currentPosition.coords.latitude,
        lon: currentPosition.coords.longitude,
      };

      setLocation(newLocation);
      setLocationText(
        `Lat: ${newLocation.lat.toFixed(4)}, Lon: ${newLocation.lon.toFixed(4)}`
      );
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      setLocationText("Error al obtener la ubicación.");
    }
  };
  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos Insuficientes",
        "Necesitas dar permisos para usar la cámara.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };
  const pickImage = async () => {
    const isPermissionGranted = await verifyPermissions();
    if (!isPermissionGranted) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    console.log("Logout ejecutado");
  };

  const logoutUser = async () => {
    try {
      await db.runAsync("DELETE FROM usuarios WHERE email = ?;", [user]);
      dispatch(clearUser());
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Contacto</Text>

        <View style={styles.redes}>
          <Image source={require("../assets/Img/icons-facebook.png")} />
          <Image source={require("../assets/Img/icons-instagram.png")} />
          <Image source={require("../assets/Img/icons-whatsapp.png")} />
        </View>
        <Text style={styles.textoSecundario}>
          Podes encontrarnos en nuestras redes sociales!!
        </Text>
      </View>

      <View style={styles.contentArea}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <MaterialIcons name="person" size={100} color="#ddd" />
          )}
        </View>

        <Pressable
          onPress={logoutUser}
          style={[styles.actionButton, styles.logoutButton]}
        >
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </Pressable>

        {/*  BOTÓN CÁMARA */}
        <Pressable onPress={pickImage} style={styles.cameraButton}>
          <MaterialIcons name="photo-camera" size={30} color="#fff" />
        </Pressable>

        {/*  MAPA  */}
        <Text style={styles.subTitle}>Ubicación:</Text>
        <Text style={styles.locationText}>{locationText}</Text>
        <PreMap location={location} />

        {/* BOTONES DE ACCIÓN */}
        <Pressable
          onPress={requestLocationPermission}
          style={styles.actionButton}
        >
          <Text style={styles.buttonText}>Obtener mi Ubicación</Text>
        </Pressable>

        <Pressable
          onPress={handleLogout}
          style={[styles.actionButton, styles.logoutButton]}
        >
          <MaterialIcons name="add-location" size={20} color="#fff" />
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ScreenContacto;

const styles = StyleSheet.create({
  container: {
    flex: null,
    paddingBottom: 20,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  contentArea: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    width: "100%",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    marginBottom: 10,
  },
  redes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    gap: 15,
  },

  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: "#790129ff",

    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  cameraButton: {
    position: "absolute",
    top: 65,
    left: "55%",
    backgroundColor: "#007bff",
    borderRadius: 25,
    padding: 8,
    elevation: 5,
    zIndex: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    gap: 5,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
