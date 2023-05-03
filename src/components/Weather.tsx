import React from "react";

interface Props {
  weatherForecast: string;
}

function Weather({ weatherForecast }: Props) {
  return (
    <div className="card text-center">
      <div className="card-header fw-bold">Weather</div>
      <div>{weatherForecast}</div>
    </div>
  );
}

export default Weather;
