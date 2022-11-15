import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Button from "../components/Button";

import { CTX } from "../context/index";

const ParkingDallocation = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { parkingTime, registationNo }: any = route.params; // take vakue from routes
  const userInfoContex = useContext(CTX);
  const { parkingSpace, _parkingData }: any = userInfoContex; // value from context

  let parkingHour = parseInt(parkingTime[0] + parkingTime[1]); //convert hour
  let parkingMin = parseInt(parkingTime[3] + parkingTime[4]); // convert minuits

  let hours = new Date().getHours(); // get current time
  let min = new Date().getMinutes();

  const [deregister_charge, setParkingCharge] = useState<number>(10);

  // calculate hour spend in parking
  let deregister_time_spent = Math.floor(
    (hours * 60 + min - (parkingHour * 60 + parkingMin)) / 60
  );

  useEffect(() => {
    if (deregister_time_spent <= 2) {
      setParkingCharge(10);
    } else {
      setParkingCharge((deregister_time_spent - 2) * 10 + 10);
    }
  }, []);

  const goBack = () => {
    navigation.pop();
  };

  // payment api call

  const payment = async () => {
    try {
      const response = await fetch("https://httpstat.us/200", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "car-registration": registationNo,
          charge: deregister_charge,
        }),
      });

      if (response.status === 200) {
        let newArr = parkingSpace.map((val: any) => {
          if (val?.carNo === registationNo) {
            return {
              id: val.id,
              entrytime: "",
              carNo: "",
            };
          } else {
            return val;
          }
        });
        _parkingData(newArr);
        goBack();
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.btnWrapper}>
        <Button lable={"Go Back"} onPress={goBack} />
      </View>
      <View style={styles.billWrapper}>
        <View style={styles.txtWrapper}>
          <Text>Car Registration</Text>
          <Text>{registationNo}</Text>
        </View>
        <View style={styles.txtWrapper}>
          <Text>Time spent</Text>
          <Text>{deregister_time_spent} hour</Text>
        </View>
        <View style={styles.txtWrapper}>
          <Text>Parking Charges</Text>
          <Text>$ {deregister_charge}</Text>
        </View>
      </View>
      <Button lable={"PAYMENT TAKEN"} onPress={payment} />
    </View>
  );
};

export default ParkingDallocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  btnWrapper: {
    width: 100,
  },
  billWrapper: {
    borderWidth: 2,
    borderColor: "#9ca9d9",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
  },
  txtWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#edeef2",
    paddingBottom: 10,
    paddingTop: 10,
  },
});
