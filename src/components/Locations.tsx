import React from "react";

interface Props {
  trafficData: any;
  selected: number;
  onClick: Function;
}

function Locations({ trafficData, selected, onClick }: Props) {
  return (
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
                  selected === index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                aria-current="true"
                onClick={() => onClick(index)}
              >
                {item.displayName}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Locations;
