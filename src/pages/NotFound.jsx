import { Link, useRouteError } from "react-router-dom";

function NotFound() {
  // to get what went wrong
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center animate-fadeIn">
        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>

        {/* Error Details */}
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for doesn't exist.
        </p>

        {error?.statusText || error?.message ? (
          <div className="bg-gray-100 rounded-lg p-3 mb-6 text-sm text-gray-600">
            <strong>Error:</strong> {error.statusText || error.message}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Go Home
          </Link>

          <Link
            to="/cart"
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
