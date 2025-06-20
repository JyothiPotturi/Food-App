import { useContext, useEffect,useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { globalContext } from "../../App";

const CardCart = ({ id, price, name, imageId }) => {
  
  const [count, setCount] = useState(0);
  const { countglobal,setcountglobal } = useContext(globalContext);

  useEffect(() => {
      const index = countglobal.findIndex((element) => element.id === id);
      if (index > -1) {
        setCount(countglobal[index].quantity);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("quantity",JSON.stringify(countglobal))
  }, [countglobal]);

  const CartIncFunction = (prevItems) => {
    //checks item with a specific id already exists in the cart
    let item = prevItems.filter((item) => item.id === id);

    //If item exists → increase quantity
    if (item.length) {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    }
    //If item doesn't exist → add to cart
    else {
      return [...prevItems, { id: id, price: price||defaultPrice, quantity: 1, name:name, imageId:imageId }];
    }
  };

  const CartDecFunction = (prevItems) => {
    return prevItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
  };

  return (
    <div className="Addtocart">
      {count ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {count === 1 ? (
              <button
                onClick={() => {
                  setCount(0);
                  setcountglobal(CartDecFunction);
                }}
              >
                <RiDeleteBin6Fill />
              </button>
            ) : (
              <button
                onClick={() => {
                  setCount(count - 1);
                  setcountglobal(CartDecFunction);
                }}
              >
                <FaMinus />
              </button>
            )}
            <span style={{ padding: 5 }}>{count}</span>
            <button
              onClick={() => {
                setCount(count + 1);
                setcountglobal(CartIncFunction);
              }}
            >
              <FaPlus />
            </button>
          </div>
          <button
            onClick={() => {
              setCount(0);
              setcountglobal((prevItems) =>
                prevItems.filter((item) => item.id !== id)
              );
            }}
          >
            <IoCloseSharp />
          </button>
        </div>
      ) : (
        <div >
        <button
          onClick={() => {
            setCount(count + 1);
            setcountglobal(CartIncFunction);
          }}
        >
          <FaShoppingCart />
          Add to Cart 
        </button>
        </div>
      )}
    </div>
  );
};

export default CardCart;
