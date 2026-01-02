import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../utils/CartSlice";
import { MdAdd, MdRemove, MdOutlineDelete } from "react-icons/md";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id == product.id);

  return (
    <div className="bg-white p-4 rounded shadow-black/75 outline outline-slate-300 transition duration-100 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
      <img
        loading="lazy"
        src={product.thumbnail}
        className="h-40 w-full object-contain"
      />
      <h3 className="font-bold">{product.title}</h3>
      <p>₹{product.price}</p>
      <div className="flex justify-between mt-2">
        <Link
          to={`/product/${product.id}`}
          className="bg-blue-500 text-white my-auto px-2 py-1 rounded-md hover:bg-blue-600"
        >
          View
        </Link>
        {!cartItem ? (
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-black text-white px-3 py-1 rounded cursor-pointer"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                dispatch(
                  cartItem.quantity === 1
                    ? removeFromCart(cartItem.id)
                    : decreaseQty(cartItem.id)
                )
              }
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition"
            >
              {cartItem.quantity === 1 ? (
                <MdOutlineDelete className="text-lg text-red-500" />
              ) : (
                <MdRemove className="text-lg" />
              )}
            </button>

            <span className="text-lg font-semibold">{cartItem.quantity}</span>

            <button
              onClick={() => dispatch(increaseQty(cartItem.id))}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition"
            >
              <MdAdd className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
