import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const Home = ({ navigation }: { navigation: any }) => {
  const [parkingSpaces, setParkingSpace] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Parking Management</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text: any) => {
          setParkingSpace(text);
        }}
        value={parkingSpaces}
        placeholder="Enter number of parking spaces"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Parkingspace", { parkingSpaces: parkingSpaces });
          setParkingSpace("");
        }}
      >
        <Text style={{ textAlign: "center" }}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "900",
  },
  input: {
    width: "80%",
    backgroundColor: "#f0eeeb",
    marginTop: 15,
    fontSize: 14,
    paddingLeft: 20,
  },
  btn: {
    width: 100,
    backgroundColor: "#f0eeeb",
    marginTop: 30,
    textAlign: "center",
    padding: 10,
  },
});
