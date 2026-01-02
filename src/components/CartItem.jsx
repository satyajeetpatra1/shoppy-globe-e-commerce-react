import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "../utils/CartSlice";
import { MdAdd, MdRemove, MdOutlineDelete } from "react-icons/md";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: Image + Info */}
        <div className="flex items-center gap-4">
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="w-24 h-24 rounded-xl object-cover border"
          />

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">Price: ₹{item.price}</p>

            <p className="text-sm font-medium text-gray-700 mt-1">
              Subtotal: ₹{item.price * item.quantity}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Quantity Controller */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() =>
                dispatch(
                  item.quantity === 1
                    ? removeFromCart(item.id)
                    : decreaseQty(item.id)
                )
              }
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition"
            >
              {item.quantity === 1 ? (
                <MdOutlineDelete className="text-lg text-red-500" />
              ) : (
                <MdRemove className="text-lg" />
              )}
            </button>

            <span className="px-5 font-semibold">{item.quantity}</span>

            <button
              onClick={() => dispatch(increaseQty(item.id))}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition"
            >
              <MdAdd className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
