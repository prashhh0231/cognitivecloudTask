import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Button = (props: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.btnLable}>{props.lable}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1429b5",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnLable: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
