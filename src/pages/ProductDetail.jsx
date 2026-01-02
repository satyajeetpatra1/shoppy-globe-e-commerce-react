import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../utils/CartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === Number(id));

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(setProduct)
      .catch(() => setError("Failed to load product details"));
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="rounded-xl max-h-96 object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.title}
          </h1>

          <p className="text-gray-500 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold text-black mb-4">
            ₹{product.price}
          </p>

          <p className="text-sm text-green-600 mb-6">
            Rating: ⭐ {product.rating}
          </p>

          {/* Cart Actions */}
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
    </div>
  );
}
