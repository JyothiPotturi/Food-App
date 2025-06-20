import React, { useContext, useMemo, useState } from "react";
import "./Cart.css";
import { globalContext } from "../../App";
import { CDN_URL } from "../utils/constants";

const Cart = () => {
  const { countglobal, setcountglobal } = useContext(globalContext);
  const [address, setaddress] = useState();
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const handlepayment = () => {
    setIsOrderSuccess(true);
    setcountglobal([]);
    localStorage.setItem("quantity", JSON.stringify([]));
  };

  const totalCartPrice = useMemo(() => {
    return countglobal.reduce((accumulator, product) => {
      return (
        accumulator +
        (product.quantity * (product.price || product.defaultPrice)) / 100
      );
    }, 0);
  }, [countglobal]);

  if (isOrderSuccess) {
    return (
      <div className="order-success">
        <h2>Order Successful!</h2>
        <p>Your order has been placed. Thank you!</p>
      </div>
    );
  }

  if (countglobal.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <h2>Your cart is empty.</h2>
        <div>You can go to home page to view more restaurants</div>
      </div>
    );
  }

  return (
    <div className="cartcontainer">
      <div className="cartcont">
        <div className="cart-left">
          <h3>Delivery Address</h3>
          <textarea
            value={address}
            placeholder="Enter your delivery address"
            rows={4}
            onChange={(e) => {
              setaddress(e.target.value);
            }}
          />
          <h3 style={{ marginBottom: "0px" }}>Payment</h3>
          <button
            className="pay-btn"
            disabled={!address}
            onClick={handlepayment}
          >
            Pay ₹{totalCartPrice}
          </button>
        </div>
        <div className="cart-right">
          <ul className="cart-list">
            {countglobal.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={CDN_URL + item.imageId}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-qty">Quantity: {item.quantity}</p>
                  <p className="cart-item-price">
                    Price: ₹{(item.price || item.defaultPrice) / 100}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <h3>TO PAY : ₹ {totalCartPrice}</h3>
          <button
            className="clearcart"
            onClick={() => {
              setcountglobal([]);
              localStorage.setItem("quantity", JSON.stringify([]));
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
