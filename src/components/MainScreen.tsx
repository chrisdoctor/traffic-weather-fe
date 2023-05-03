import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import "../App.css";
import DateTimeEntry from "./DateTimeEntry";
import Locations from "./Locations";
import Weather from "./Weather";
import Screenshot from "./Screentshot";

function MainScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [trafficData, setTrafficData] = useState([] as any);
  const [param, setParam] = useState("");
  const [loading, setLoading] = useState(false);

  const urlTraffic = "http://localhost:5000/traffic/traffic/"; // This can be placed in an dot env file

  useEffect(() => {
    const isoDate = DateTime.fromISO(
      startDate.toISOString().replace(/\.\d+Z/, "Z") // zero out milliseconds
    ).toISO();

    setParam(isoDate ? isoDate.replace(".000", "") : ""); // remove milliseconds
  }, [startDate]);

  const handleSearchClick = () => {
    setLoading(true);
    setTrafficData([]);
    setSelectedIndex(-1);

    fetch(urlTraffic + param)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTrafficData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <DateTimeEntry
        selected={startDate}
        setSelected={setStartDate}
        loading={loading}
        onClick={handleSearchClick}
      ></DateTimeEntry>

      {trafficData.length > 0 && (
        <div className="container ms-1 mt-3">
          <div className="row">
            <div className="col-9">
              <Locations
                trafficData={trafficData}
                selected={selectedIndex}
                onClick={handleItemClick}
              ></Locations>
            </div>
            <div className="col-3">
              {trafficData && selectedIndex !== -1 && (
                <Weather
                  weatherForecast={trafficData[selectedIndex].weather}
                ></Weather>
              )}
            </div>
          </div>
        </div>
      )}
      {trafficData && selectedIndex !== -1 && (
        <Screenshot imgSrc={trafficData[selectedIndex].image}></Screenshot>
      )}
    </>
  );
}

export default MainScreen;
