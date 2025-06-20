import React, {  useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import About from "./src/components/About";
import Offers from "./src/components/Offers";
import Cart from "./src/components/Cart";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
import useOnlineStatus from "./src/utils/useOnlineStatus";


export const globalContext = React.createContext()

const AppLayout = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [topRestaurants, settopRestaurants] = useState(false);

  const localStoragequantity = localStorage.getItem("quantity");

  const[countglobal,setcountglobal]=useState(
    localStoragequantity ? JSON.parse(localStoragequantity):[])

  const onlineStatus = useOnlineStatus();

  if (onlineStatus == false)
    return (
      <div>
        <h1>No Connection</h1>
        <h2>Please check your internet connectivity and try again</h2>
      </div>
    );
 
  return (
    <globalContext.Provider value={{countglobal,setcountglobal}}>

    <div className="app">
      <Header
        setsearchTerm={setsearchTerm}
        settopRestaurants={settopRestaurants}
        topRestaurants={topRestaurants}
        
      />
      <Outlet context={{ searchTerm, topRestaurants }} />
    </div>
     </globalContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurants/:resid",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
