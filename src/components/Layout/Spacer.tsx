import React from "react";

type Props = {
  x?: number;
  y?: number;
};

function Spacer({ x = 1, y = 1 }: Props) {
  return <div style={{ width: x, height: y }} />;
}

export default Spacer;
