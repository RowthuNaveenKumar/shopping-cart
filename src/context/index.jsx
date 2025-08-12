//create context
//provide the state to context
//wrap the provider in root component
//consume the context using useContxet

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);
function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [ListofProducts, setListofProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchProductList() {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();
    if (result && result?.products) {
      setListofProducts(result?.products);
      setLoading(false);
    }
  }

  function handleAddtoCart(getproductDetails) {
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingCartItems.findIndex(
      (cartItem) => cartItem?.id === getproductDetails?.id
    );
    console.log(findIndexOfCurrentItem);
    if (findIndexOfCurrentItem === -1) {
      cpyExistingCartItems.push({
        ...getproductDetails,
        quantity: 1,
        totalPrice: getproductDetails?.price,
      });
    } else {
      cpyExistingCartItems[findIndexOfCurrentItem] = {
        ...cpyExistingCartItems[findIndexOfCurrentItem],
        quantity: cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1) *
          cpyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }
    setCartItems(cpyExistingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    navigate("/cart");
  }

  function handleRemoveFromCart(getproductDetails, isFullyRemovedFromCart) {
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingCartItems.findIndex(
      (cartItem) => cartItem?.id === getproductDetails?.id
    );
    if (isFullyRemovedFromCart) {
      cpyExistingCartItems.splice(findIndexOfCurrentItem, 1);
    } else {
      cpyExistingCartItems[findIndexOfCurrentItem] = {
        ...cpyExistingCartItems[findIndexOfCurrentItem],
        quantity: cpyExistingCartItems[findIndexOfCurrentItem].quantity - 1,
        totalPrice:
          (cpyExistingCartItems[findIndexOfCurrentItem].quantity - 1) *
          cpyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    setCartItems(cpyExistingCartItems);
  }

  useEffect(() => {
    fetchProductList();
    const storedCart = localStorage.getItem("cartItems");
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
    // setCartItems(JSON.parse(localStorage.getItem("cartItems") || []));
  }, []);
  console.log(cartItems, "cartItems");

  return (
    <ShoppingCartContext.Provider
      value={{
        loading,
        setLoading,
        ListofProducts,
        productDetails,
        setProductDetails,
        handleAddtoCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
export default ShoppingCartProvider;
