import React, { useEffect, useState } from "react";
import FlightCard from "../../Components/FlightCard/FlightCard";
import Navbar from "../../Components/Navbar/Navbar";
import TravelCard from "../../Components/TravelCard/TravelCard";

const MainPage = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [display, setDisplay] = useState(false);
  const [dis, setDis] = useState(false);
  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      if (fetchedData === null) {
        return;
      }
      if (fetchedData.length === 0) {
        setDis(true);
      } else {
        setDisplay(true);
      }
    };
    fetchDataFromLocalStorage();
  }, [fetchedData]);
  console.log(fetchedData);
  console.log(dis);

  return (
    <>
      <Navbar navColor="color2" borColor="color3" />
      <TravelCard onChange={(newData) => setFetchedData(newData)} />
      {dis && (
        <p className="flex justify-center items-center text-2xl">
          Sorry! Flights not found for the specifed...
        </p>
      )}
      {display &&
        fetchedData.map((flights) =>
          flights.FlightAvailDates.map((e) => (
            <FlightCard
              key={e.availDates}
              fid={flights.fid}
              flname={flights.flname}
              fromLoc={flights.fromLoc}
              toLoc={flights.toLoc}
              pricing={flights.pricing}
              seatAvail={e.seatAvail}
              date={e.availDates.split("T")[0]}
            />
          ))
        )}
    </>
  );
};

export default MainPage;
