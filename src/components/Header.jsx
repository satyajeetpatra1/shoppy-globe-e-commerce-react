import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../utils/CartSlice";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <header className="bg-indigo-600 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          ShoppyGlobe <span className="text-indigo-200">🌍</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="
              w-full
              px-4 py-2
              rounded-lg
              bg-indigo-500
              text-white
              placeholder:text-indigo-200
              focus:outline-none
              focus:ring-2
              focus:ring-white
            "
          />
        </div>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative flex items-center gap-2 text-white font-semibold"
        >
          <span className="text-xl">🛒</span>
          Cart
          {cartItems.length > 0 && (
            <span
              className="
              absolute -top-2 -right-3
              bg-white text-indigo-600
              text-xs font-bold
              w-5 h-5
              rounded-full
              flex items-center justify-center
            "
            >
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
