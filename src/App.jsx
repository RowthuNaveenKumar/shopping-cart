import "./index.css";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductList";
import ProductDetailsPage from "./pages/ProductDetails";
import CartListPage from "./pages/CartList";
import Layout from "./components/Layout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductListPage />} />
          <Route path="product-details/:id" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartListPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
