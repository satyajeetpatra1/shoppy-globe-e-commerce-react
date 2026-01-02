import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <img
        loading="lazy"
        src={product.thumbnail}
        className="h-40 w-full object-contain"
      />
      <h3 className="font-bold">{product.title}</h3>
      <p>₹{product.price}</p>
      <div className="flex justify-between mt-2">
        <Link to={`/product/${product.id}`} className="text-blue-500">
          View
        </Link>
        <button className="bg-black text-white px-3 py-1 rounded">Add</button>
      </div>
    </div>
  );
}
