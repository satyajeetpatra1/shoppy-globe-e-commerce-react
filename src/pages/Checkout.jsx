import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// actions
import { clearCart } from "../utils/CartSlice";

function Checkout() {
  // to dispatch an action
  const dispatch = useDispatch();
  // to navigate to other page
  const navigate = useNavigate();
  // cart items from store
  const items = useSelector((store) => store.cart.items);

  // form data for validations
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // error list to show in UI if any
  const [errors, setErrors] = useState({});

  // calculating total amount using reduce function
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // validate form data
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    // return true if errors of object is empty else return false
    return Object.keys(newErrors).length === 0;
  };

  // submit if form is valid
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    alert("Order placed successfully 🎉");
    dispatch(clearCart());
    navigate("/");
  };

  // If cart is empty no option to checkout
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20">Your cart is empty.</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* form to get user details */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 space-y-5"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-200"
                  : "focus:ring-black"
              }`}
              placeholder="Enter Your Name..."
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "focus:ring-black"
              }`}
              placeholder="Enter your mail id..."
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              rows="3"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-200"
                  : "focus:ring-black"
              }`}
              placeholder="Enter Your Address..."
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Place Order • ₹{totalAmount.toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* list of cart items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.title} x {item.quantity}
                </span>
                {/* upto 2 digits for amount */}
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            {/* upto 2 digits for amount */}
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
