import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../components/tiles";

const ProductListPage = () => {
  const { loading, ListofProducts } = useContext(ShoppingCartContext);
  if (loading) return <h2>Page is Loading, please wait!</h2>;
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Our Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {ListofProducts && ListofProducts?.length > 0 ? (
            ListofProducts.map((singleProductTile) => <ProductTile  singleProductTile={singleProductTile} />)
          ) : (
            <h3>No Product found</h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
