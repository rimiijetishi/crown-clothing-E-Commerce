import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import  { CheckoutContainer, CheckoutHeaderContainer, HeaderBlock , Total } from './checkout.style';
const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeaderContainer>
        <HeaderBlock ><span>Product</span></HeaderBlock >
        <HeaderBlock ><span>Description</span></HeaderBlock >
        <HeaderBlock ><span>Quantity</span></HeaderBlock >
        <HeaderBlock ><span>Price</span></HeaderBlock >
        <HeaderBlock ><span>Remove</span></HeaderBlock >
      </CheckoutHeaderContainer>
      {cartItems.map((cartItem) => (

        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      ))}
      <Total>TOTAL: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;