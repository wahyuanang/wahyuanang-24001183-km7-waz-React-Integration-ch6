import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function HomeView() {
  const [count, setCount] = useState(0);
  const menu = ["Menu", "About", "Logout"];
  const name = ["Rafly"];
  const age = ["20"];

  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/shops", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response.data);
        const data = response.data;
        if (data.isSuccess) {
          setShops(data.data.shops);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          {/* Logo and title on the left */}
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-green-500 mb-0">
              Binar Car Rental
            </h1>
          </div>

          {/* Navbar links on the right */}
          <nav className="flex items-center">
            <a href="/" className="text-gray-700 mx-3">
              Home
            </a>
            <a href="/shops" className="text-gray-700 mx-3">
              Shops
            </a>
            <a href="/product" className="text-gray-700 mx-3">
              Product
            </a>
            <a href="/contact" className="text-gray-700 mx-3">
              Contact
            </a>
            <a href="/about" className="text-gray-700 mx-3">
              About
            </a>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Register
            </button>
          </nav>
        </div>
      </header>

      <main className="text-center">
        {loading ? (
          <p className="text-lg font-semibold text-gray-500 mt-10">
            Loading...
          </p>
        ) : error ? (
          <p className="text-lg font-semibold text-red-500 mt-10">
            Error: {error}
          </p>
        ) : (
          <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.length === 0 ? (
              <p>No data available</p>
            ) : (
              shops.map((shop, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md bg-white shadow-md"
                >
                  <img
                    src={shop.products[0].images[0]}
                    alt={shop.products[0].name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="font-semibold text-blue-950">
                    {shop.products[0].name}
                  </h3>
                  <p className="text-green-500 font-bold">
                    Rp. {shop.products[0].price} / Hari
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                    <span>4 orang</span>
                    <span>Manual</span>
                    <span>Tahun 2020</span>
                  </div>
                  <button className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md">
                    Pilih Mobil
                  </button>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default HomeView;
