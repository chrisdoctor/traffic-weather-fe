import React from "react";

interface Props {
  imgSrc: string;
}

function Screenshot({ imgSrc }: Props) {
  return (
    <div className="card text-center ms-3 mt-3 me-5 mb-3">
      <div className="card-header fw-bold">Screenshot</div>
      <img src={imgSrc} className="card-img-top" alt="traffic-image"></img>
    </div>
  );
}

export default Screenshot;
