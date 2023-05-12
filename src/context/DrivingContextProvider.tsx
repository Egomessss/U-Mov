import { createContext, useState } from 'react';

type DrivingContextProviderProps = {
  children: React.ReactNode;
};

export const DrivingContext = createContext([]);

export default function DrivingContextProvider(props: DrivingContextProviderProps) {
  const [drivingDirections, setDrivingDirections] = useState([]);

  return (
    <DrivingContext.Provider value={{ drivingDirections, setDrivingDirections }}>
      {props.children}
    </DrivingContext.Provider>
  );
}