import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { useFetchProducts } from "../utils/useFetchProducts";

function ProductList() {
  const { products, error } = useFetchProducts();
  const search = useSelector((store) => store.cart.search);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        .map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
}

export default ProductList;
