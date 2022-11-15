import React, { useState, useEffect } from "react";

export interface AppContextInterface {
  parkingSpace: any;
  _parkingData: any;
}

const sampleAppContext: AppContextInterface = {
  parkingSpace: null,
  _parkingData: () => {},
};

export const CTX = React.createContext<AppContextInterface>(sampleAppContext);

export default function Store(props: any) {
  const [parkingSpace, setParkingspace] = useState<any>([
    {
      id: 1,
      entrytime: "",
      carNo: "MH28BC3423",
    },
    {
      id: 2,
      entrytime: "",
      carNo: "MH28BC3423",
    },
    {
      id: 3,
      entrytime: "",
      carNo: "MH28BC3423",
    },
    {
      id: 4,
      entrytime: "",
      carNo: "MH28BC3423",
    },
    {
      id: 5,
      entrytime: "",
      carNo: "MH28BC3423",
    },
    {
      id: 6,
      entrytime: "",
      carNo: "MH28BC3423",
    },
    {
      id: 7,
      entrytime: "",
      carNo: "MH28BC3423",
    },
    {
      id: 8,
      entrytime: "",
      carNo: "MH28BC3423",
    },
    {
      id: 9,
      entrytime: "00:01",
      carNo: "MH28BC3423",
    },
    {
      id: 10,
      entrytime: "",
      carNo: "MH28BC3423",
    },
  ]);

  const _parkingData = async (data: any) => {
    setParkingspace(() => data);
  };

  return (
    <CTX.Provider
      value={{
        parkingSpace,
        _parkingData,
      }}
    >
      {props.children}
    </CTX.Provider>
  );
}
