import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";

function MainScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [trafficData, setTrafficData] = useState([]);
  const [param, setParam] = useState("");

  const url = "http://localhost:5000/traffic/traffic/abc"; // This can be placed in an dot env file

  useEffect(() => {
    const isoDate = DateTime.fromISO(
      startDate.toISOString().replace(/\.\d+Z/, "Z")
    ).toISO();

    setParam(isoDate ? isoDate.replace(".000", "") : "");
  }, [startDate]);

  const handleClick = () => {
    console.log("PARAM", param);
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTrafficData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="p-3">
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showTimeSelect
          timeFormat="p"
          timeIntervals={1}
          dateFormat="Pp"
        />
      </div>
      <div className="ps-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleClick()}
        >
          Search
        </button>
      </div>
      <ul className="list-group p-3">
        {trafficData &&
          trafficData.map((item: any, index) => {
            return (
              <li
                key={index}
                className={
                  selectedIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                aria-current="true"
                onClick={() => setSelectedIndex(index)}
              >
                {item.displayName}
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default MainScreen;
