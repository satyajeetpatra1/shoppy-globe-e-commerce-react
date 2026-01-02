import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  const items = useSelector((state) => state.cart.items);

  const isCartEmpty = items.length === 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {isCartEmpty ? (
        <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {/* Checkout Button */}
          <div className="flex justify-end mt-8">
            <Link
              to="/checkout"
              className={`
                flex items-center gap-2
                px-8 py-3 rounded-xl
                font-semibold text-white
                transition-all duration-200
                ${
                  isCartEmpty
                    ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                    : "bg-black hover:bg-gray-800 hover:scale-[1.02]"
                }
              `}
            >
              Proceed to Checkout
              <span className="text-lg">→</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
