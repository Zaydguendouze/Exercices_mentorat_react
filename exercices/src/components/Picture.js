import React from "react";

export default function Picture({ imageName, index }) {
  return (
    <div>
      <img className="w-40 mx-auto" alt={imageName} src={imageName}></img>
      <div>{imageName}</div>
    </div>
  );
}
