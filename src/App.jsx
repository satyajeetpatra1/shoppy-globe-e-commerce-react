import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* header */}
      <Header />

      <div className="h-full min-h-screen">
        {/* router outlet */}
        <Outlet />
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;
