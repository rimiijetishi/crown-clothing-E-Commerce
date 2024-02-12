import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productsToAdd) => {
  const addExistingItem = cartItems.find(cartItem => cartItem.id === productsToAdd.id);

  if(addExistingItem) {
    return cartItems.map((cartItem) => 
    cartItem.id === productsToAdd.id 
    ? {...cartItem, quantity: cartItem.quantity + 1,}
    : cartItem
    )
  }
  return [{...productsToAdd, quantity: 1}, ...cartItems]
};



const removeCartItem = (cartItems, cartItemToRemove) => {
  const removeitemFromCart = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if(removeitemFromCart.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id 
    ? {...cartItem, quantity: cartItem.quantity - 1,}
    : cartItem
  );
};


const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(removedItem => removedItem.id !== cartItemToClear.id);
};


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}, 
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});


export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal,setCartTotal] = useState(0);
 

  useEffect(() => {
    const newCartCount = cartItems.reduce((itemCaount, indexOfItem) => itemCaount + indexOfItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])



  const addItemToCart = (productsToAdd) => {
    setCartItems(addCartItem(cartItems, productsToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove)); 
  };

  const clearItemFromCart =(cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

 

  const value = { 
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};