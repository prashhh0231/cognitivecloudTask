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
      carNo: "",
    },
    {
      id: 2,
      entrytime: "",
      carNo: "",
    },
    {
      id: 3,
      entrytime: "",
      carNo: "",
    },
    {
      id: 4,
      entrytime: "",
      carNo: "",
    },
    {
      id: 5,
      entrytime: "",
      carNo: "",
    },
    {
      id: 6,
      entrytime: "",
      carNo: "",
    },
    {
      id: 7,
      entrytime: "",
      carNo: "",
    },
    {
      id: 8,
      entrytime: "",
      carNo: "",
    },
    {
      id: 9,
      entrytime: "",
      carNo: "",
    },
    {
      id: 10,
      entrytime: "",
      carNo: "",
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
