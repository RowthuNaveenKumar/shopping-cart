import { useContext } from "react";
import { ShoppingCartContext } from "../../context";

const CartTile = ({ singleCartItem }) => {
  const { handleRemoveFromCart, handleAddtoCart } =
    useContext(ShoppingCartContext);
  return (
    <div className="grid grid-cols-3 items-start gap-5 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="col-span-2 flex items-start gap-4">
        <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-100 p-2 rounded-md border border-gray-200">
          <img
            src={singleCartItem?.thumbnail}
            alt={singleCartItem?.title}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {singleCartItem?.title}
          </h3>
          <p className="text-sm text-gray-500">
            Brand: {singleCartItem?.brand || "Unknown"}
          </p>
          <button
            onClick={() => handleRemoveFromCart(singleCartItem, true)}
            className="cursor-pointer self-start text-sm px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200 active:scale-95"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <h3 className="text-xl font-bold text-gray-900">
          ${singleCartItem?.totalPrice.toFixed(2)}
        </h3>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              className="disabled:opacity-65 cursor-pointer w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out active:scale-95"
              disabled={singleCartItem?.quantity === 1}
            >
              -
            </button>
            <span className="w-6 text-center font-medium">
              {singleCartItem?.quantity || 1}
            </span>
            <button
              onClick={() => handleAddtoCart(singleCartItem)}
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 ease-in-out active:scale-95"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTile;
