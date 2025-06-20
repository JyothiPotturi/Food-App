# Food App 

A React-based food ordering application that demonstrates modern UI features, state management, and integration with a real-world API.

---

## Features

- **Restaurant Listing & Menu**
  - Browse restaurants and view their menus.
  - Menu items display images, names, descriptions, and prices.

- **Category Accordion**
  - Menu categories are collapsible accordions.

- **Veg/Non-Veg Toggle**
  - Filter menu items by Veg or Non-Veg with a styled toggle switch.

- **Cart Functionality**
  - Add items to the cart with quantity management.
  - Cart displays item image, name, quantity, and price.
  - Shows total cart price.
  - Clear cart option.

- **Checkout Flow**
  - Delivery address input and payment section.
  - Payment button is enabled only when address is entered.
  - Displays order success message after payment.

- **Responsive UI**
  - Clean, modern layout using CSS Flexbox.
  - Cart and checkout sections are side-by-side on desktop.

- **Loading States**
  - Shimmer effect while menu data is loading.

---

## Tools & Technologies Used

- **React JS**  
  For building the user interface and managing component state.

- **React Router**  
  For routing between pages and handling URL parameters.

- **React Icons**  
  For modern, scalable iconography (e.g., stars, toggles, delete icons).

- **CSS**  
  For custom styling, including flex layouts, buttons, and shimmer effects.

- **Context API**  
  For global state management (cart state).

- **Swiggy Public API**  
  For fetching real restaurant and menu data.

---

## How to Run

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the app in development mode.

---

## Folder Structure

- `/src`
  - `components/`
    - `RestaurantMenu.js`
    - `RestaurantCategory.js`
    - `Cart.js`
    - `Shimmermenu.js`
  - `App.js`
  - `index.css`

---

## Customization

- Update API endpoints or add new features as needed.
- Modify CSS for your own branding or layout preferences.
