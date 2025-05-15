import React, { FC } from "react";

export const DisplayDay: FC<{ value: number }> = ({ value }) => {
  return (
    <>
      {
        [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ][value - 1]
      }
    </>
  );
};
