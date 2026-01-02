import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


const pickImage = async () => {
  const isPermissionGranted = await verifyPermissions();
  if (!isPermissionGranted) {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      dispatchEvent(
        setProfileImage({
          uri: result.assets[0].uri,
          base64: result.assets[0].base64,
        })
      );
    }
  }
};

const PreMap = ({ location }) => {
  const hasLocation = location && location.lat && location.lon;

  const API_KEY = "AIzaSyDrY6b7X8fdZdq8iXHAWDSlgR5FpVlWXGI";

  let mapImageUrl = "";

  if (hasLocation) {
    
    const { lat, lon } = location;
    const size = "300x300";
    const zoom = 15;

    mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=${size}&markers=color:red%7C${lat},${lon}&key=${API_KEY}`;
  }

  return (
    <View>
      {hasLocation ? (
        <Image source={{ uri: mapImageUrl }} style={styles.map} />
      ) : (
        <View style={styles.map}>
          {" "}
     
          <Text>
            {" "}
            <Icon name="map" size={128} color={"#eee"} />{" "}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PreMap;

const styles = StyleSheet.create({
  mapContainer: {
   
    alignItems: "center",
    marginVertical: 15,
  },
  map: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
});
