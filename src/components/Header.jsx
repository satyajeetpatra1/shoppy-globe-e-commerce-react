import { useDispatch } from "react-redux";
import { setSearch } from "../utils/CartSlice";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  return (
    <header className="bg-indigo-600 shadow p-4 flex justify-between">
      <Link to="/" className="text-2xl text-white font-bold my-auto">ShoppyGlobe 🌍</Link>
      <input
        placeholder="Search products..."
        className="border px-3 py-1 rounded outline-white border-white text-white placeholder:text-gray-300 my-auto"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <Link className="text-white font-semibold text-md my-auto" to="/cart">🛒 Cart</Link>
    </header>
  );
}

export default Header;
