import { useSetRecoilState } from "recoil";
import { cartState } from "../state";
import { SelectedOptions } from "../types/cart";
import { Product } from "../types/product";
import { isIdentical } from "../utils/product";

interface UseAddToCartProps {
  product?: Product;
  options: SelectedOptions;
  quantity: number;
  selected?: {
    options: SelectedOptions;
    quantity: number;
  };
  setVisible: (visible: boolean) => void;
}

export const useAddToCart = () => {
  const setCart = useSetRecoilState(cartState);

  const addToCart = ({
    product,
    options,
    quantity,
    selected,
    setVisible,
  }: UseAddToCartProps) => {
    if (product) {
      setCart((cart) => {
        let res = [...cart];
        if (selected) {
          // updating an existing cart item, including quantity and size, or remove it if new quantity is 0
          const editing = cart.find(
            (item) =>
              item.product.id === product.id &&
              isIdentical(item.options, selected.options)
          )!;
          if (quantity === 0) {
            res.splice(cart.indexOf(editing), 1);
          } else {
            const existed = cart.find(
              (item, i) =>
                i !== cart.indexOf(editing) &&
                item.product.id === product.id &&
                isIdentical(item.options, options)
            )!;
            res.splice(cart.indexOf(editing), 1, {
              ...editing,
              options,
              quantity: existed ? existed.quantity + quantity : quantity,
            });
            if (existed) {
              res.splice(cart.indexOf(existed), 1);
            }
          }
        } else {
          // adding new item to cart, or merging if it already existed before
          const existed = cart.find(
            (item) =>
              item.product.id === product.id &&
              isIdentical(item.options, options)
          );
          if (existed) {
            res.splice(cart.indexOf(existed), 1, {
              ...existed,
              quantity: existed.quantity + quantity,
            });
          } else {
            res = res.concat({
              product,
              options,
              quantity,
            });
          }
        }
        return res;
      });
    }
    setVisible(false);
  };

  return { addToCart };
};
