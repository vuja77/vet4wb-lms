import React from "react";
export const ItemCounter = ({number}: {number:number}) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
  </div>
);
