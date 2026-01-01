import { useDispatch } from "react-redux";
import { setSearch } from "../utils/CartSlice";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <Link to="/" className="text-2xl font-bold">ShoppyGlobe 🌍</Link>
      <input
        placeholder="Search products..."
        className="border px-3 py-1 rounded"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <Link to="/cart">🛒 Cart</Link>
    </header>
  );
}

export default Header;
