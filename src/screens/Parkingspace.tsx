import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Button from "../components/Button";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";

import { CTX } from "../context/index";

const Parkingspace = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  // get value from context
  const { parkingSpaces }: any = route.params;
  const userInfoContex = useContext(CTX);
  const { parkingSpace, _parkingData }: any = userInfoContex;

  // create state for app
  const [parkingHour, setParkingHour] = useState<any>();
  const [parkingMin, setParkingMin] = useState<any>();
  const [registationNo, setRegistrationNo] = useState<any>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [noOfCar, setNoOfCar] = useState<number>(10);
  const isFocused = useIsFocused();

  const openFormHandler = () => {
    setShowForm(!showForm);
    setParkingHour("");
    setParkingMin("");
    setRegistrationNo("");
  };

  useEffect(() => {
    let value = 0;
    parkingSpace.map((val: any) => {
      if (val.carNo !== "") {
        value++;
      }
    });
    setNoOfCar(10 - value);
  }, [isFocused]);

  useEffect(() => {
    if (parkingSpaces > noOfCar) {
      alert("No space available");
    }
  }, [noOfCar]);

  const parkingAllocationHandler = () => {
    // variable for storing parking time and current
    let parkHour = parseInt(parkingHour);
    let parkMin = parseInt(parkingMin);
    let hours = new Date().getHours();
    let min = new Date().getMinutes();

    // calculate parking hours
    let parkedTime = Math.floor(
      (hours * 60 + min - (parkHour * 60 + parkMin)) / 60
    );

    // 1st if block is for check form validation

    if (
      parkHour >= 0 &&
      parkHour <= 24 &&
      parkMin >= 0 &&
      parkMin <= 60 &&
      registationNo !== "" &&
      parkedTime >= 0
    ) {
      let isAdded = false;
      const newArr = parkingSpace.map((val: any) => {
        if (val?.carNo === "" && !isAdded) {
          isAdded = true;
          return {
            id: val.id,
            entrytime: `${parkingHour}:${parkingMin}`,
            carNo: registationNo,
          };
        } else {
          return val;
        }
      });

      if (!isAdded) {
        Toast.show({
          type: "error",
          text1: "Opps !",
          text2: "No space available in parking",
        });
      } else {
        _parkingData(newArr);
        setNoOfCar(noOfCar - 1);
        Toast.show({
          type: "success",
          text1: "Hureeyy !",
          text2: "Your car is added in parking",
        });
      }
      openFormHandler();
    } else {
      if (parkedTime < 0) {
        alert(
          "Time is not greater than current time or please field valid time"
        );
      } else {
        alert("please fill all required field");
      }
    }
  };

  const parkingDeallocationHandler = (item: any) => {
    if (item?.carNo) {
      navigation.navigate("ParkingDallocation", {
        parkingTime: item?.entrytime,
        registationNo: item?.carNo,
      });
    }
  };

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.boxContainer,
          item?.item?.carNo && { backgroundColor: "#4287f5" },
        ]}
        onPress={() => parkingDeallocationHandler(item?.item)}
      >
        <Text style={[styles.noTxt, item?.item?.carNo && styles.whiteTxt]}>
          {item?.item?.id}
        </Text>
        {item?.item?.carNo && (
          <View>
            <Text style={styles.whiteTxt}>{item?.item?.carNo}</Text>
            <Text style={styles.whiteTxt}>Tap to checkout</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headTxt}>create parking spaces</Text>
      <Text style={styles.headTxt}>Available space: {noOfCar} of 10</Text>
      <View style={styles.list_container}>
        <FlatList data={parkingSpace} renderItem={renderItem} numColumns={2} />
      </View>
      <View style={styles.btnStyle}>
        {showForm && (
          <View>
            <Text style={{ marginVertical: 4 }}>
              Parking Time(Tap to change):
            </Text>
            <View
              style={{
                width: "100%",
                borderWidth: 0.8,
                borderColor: "gray",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.smallInput}
                onChangeText={(text: any) => {
                  setParkingHour(text);
                }}
                value={parkingHour}
                placeholder="HH"
                keyboardType="numeric"
              />
              <Text style={{ fontSize: 25 }}>: </Text>
              <TextInput
                style={styles.smallInput}
                onChangeText={(text: any) => {
                  setParkingMin(text);
                }}
                value={parkingMin}
                placeholder="MM"
                keyboardType="numeric"
              />
            </View>
            <Text style={{ marginVertical: 4 }}>Car Registration:</Text>

            <TextInput
              style={styles.input}
              onChangeText={(text: any) => {
                setRegistrationNo(text);
              }}
              value={registationNo}
              placeholder="Enter car registration"
              keyboardType="default"
            />
            <View style={styles.btnWrapper}>
              <Button lable={"CANCEL"} onPress={openFormHandler} />
              <Button lable={"SUBMIT"} onPress={parkingAllocationHandler} />
            </View>
          </View>
        )}

        {!showForm && (
          <Button lable={"Add New Parking"} onPress={openFormHandler} />
        )}
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default Parkingspace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  headTxt: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
  },
  boxContainer: {
    backgroundColor: "#e1e9f0",
    borderColor: "green",
    borderWidth: 2,
    borderStyle: "dotted",
    width: 120,
    height: 80,
    margin: 10,
    textAlign: "center",
    paddingTop: 10,
    alignItems: "center",
  },
  list_container: {
    backgroundColor: "#f5f6f7",
    justifyContent: "center",
    alignItems: "center",
  },
  noTxt: {
    fontSize: 12,
    fontWeight: "800",
  },
  btnStyle: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "90%",
    paddingBottom: 30,
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    marginBottom: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 4,
  },
  whiteTxt: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  smallInput: {
    width: "20%",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "lightgray",
    paddingVertical: 4,
    marginRight: 6,
    textAlign: "center",
  },
});
