import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import "../App.css";

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
      <div className="card ms-3 mt-3 me-5">
        <div className="card-header fw-bold">Enter date and time</div>
        <div className="ps-3 pb-3 mt-3">
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showTimeSelect
            timeFormat="p"
            timeIntervals={1}
            dateFormat="Pp"
          />
        </div>
        <div className="ps-3 mb-3">
          {!loading && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSearchClick()}
              disabled={loading}
            >
              Search
            </button>
          )}
          {loading && (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          )}
        </div>
      </div>

      {trafficData.length > 0 && (
        <div className="container ms-1 mt-3">
          <div className="row">
            <div className="col-9">
              <div className="card">
                <div className="card-header fw-bold">List of locations</div>
                <div
                  className="scroll-div"
                  style={{ display: trafficData.length ? "block" : "none" }}
                >
                  <ul className="list-group">
                    {trafficData.map((item: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className={
                            selectedIndex === index
                              ? "list-group-item active"
                              : "list-group-item"
                          }
                          aria-current="true"
                          onClick={() => handleItemClick(index)}
                        >
                          {item.displayName}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-3">
              {trafficData && selectedIndex !== -1 && (
                <div className="card text-center">
                  <div className="card-header fw-bold">Weather</div>
                  <div>{trafficData[selectedIndex].weather}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {trafficData && selectedIndex !== -1 && (
        <div className="card text-center ms-3 mt-3 me-5">
          <div className="card-header fw-bold">Screenshot</div>
          <img
            src={trafficData[selectedIndex].image}
            className="card-img-top"
            alt="traffic-image"
          ></img>
        </div>
      )}
    </>
  );
}

export default MainScreen;
