import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// actions
import {
  addToCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../utils/CartSlice";
import { MdAdd, MdRemove, MdOutlineDelete } from "react-icons/md";

function ProductDetail() {
  // get id from dynamic route
  const { id } = useParams();

  // to dispatch an action
  const dispatch = useDispatch();

  // cart items from store
  const cartItems = useSelector((store) => store.cart.items);

  // get item data from cart if available
  const cartItem = cartItems.find((item) => item.id === Number(id));

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // get product data from api
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(setProduct)
      .catch(() => setError("Failed to load product details"));
  }, [id]);

  // show error message if error while api calling
  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  // show loading while product is being fetched
  if (!product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
        {/* Product Image */}
        <div className="flex justify-center">
          {/* lazy loading image */}
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
          {/* If product available in cart give option to increase or decrease the quantity 
          | if not then option to add to cart */}
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
    </div>
  );
}

export default ProductDetail;
