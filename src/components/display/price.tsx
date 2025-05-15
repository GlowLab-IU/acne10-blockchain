import React, { FC } from "react";
import { getConfig } from "../../utils/config";

export const DisplayPrice: FC<{ children: number }> = ({ children }) => {
  if (typeof children !== "number" || isNaN(children)) {
    console.error("Invalid price provided to DisplayPrice:", children);
    return <>Invalid price</>;
  }

  const symbol = getConfig((config) => config.template.currencySymbol);
  const prefixSymbol = getConfig(
    (config) => config.template.prefixCurrencySymbol
  );

  if (prefixSymbol) {
    return (
      <>
        {symbol}
        {children.toLocaleString()}
      </>
    );
  } else {
    return (
      <>
        {children.toLocaleString()}
        {symbol}
      </>
    );
  }
};
