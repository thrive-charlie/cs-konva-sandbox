import React from "react";
import Element from "./element";

export default function ElementRenderer({
  elements,
  setSelected,
  setSelectedRef
}) {
  let elementJsx = ``;

  elementJsx = elements.map((element, index) => (
    <Element
      key={index}
      setSelected={setSelected}
      setSelectedRef={setSelectedRef}
      {...element}
    />
  ));

  return elementJsx;
}
