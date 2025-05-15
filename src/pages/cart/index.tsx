import React, { FC } from "react";
import { Divider } from "../../components/divider";
import { Header, Page } from "zmp-ui";
import { CartItems } from "./cart-items";
import { CartPreview } from "./preview";
import { TermsAndPolicies } from "./term-and-policies";
import { Delivery } from "./delivery";
import { useVirtualKeyboardVisible } from "../../hooks";

const CartPage: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();

  return (
    <Page className="flex flex-col">
      <Header title="Shopping" showBackIcon={false} />
      <div className="flex justify-center bg-white pt-2">
        <div
          className="relative text-center py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-lg shadow-lg mb-5"
          style={{ width: "96%" }}
        >
          <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase">
            <span className="drop-shadow-lg">Shopping</span>
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-white rounded-full opacity-30"></div>
        </div>
      </div>
      <CartItems />
      <Delivery />
      <Divider size={12} />
      <TermsAndPolicies />
      <Divider size={32} className="flex-1" />
      {!keyboardVisible && <CartPreview />}
    </Page>
  );
};

export default CartPage;
