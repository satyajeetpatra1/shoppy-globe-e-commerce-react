import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../utils/CartSlice";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id == product.id);

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
        {!cartItem ? (
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                dispatch(
                  cartItem.quantity === 1
                    ? removeFromCart(product.id)
                    : decreaseQty(product.id)
                )
              }
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-50"
            >
              {cartItem.quantity === 1 ? "delete" : "-"}
            </button>

            <span className="text-lg font-semibold">{cartItem.quantity}</span>

            <button
              onClick={() => dispatch(increaseQty(product.id))}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
