"use client";
import { useEffect , useState } from "react";
import Link from "next/link";
import { apiFetch } from "../../lib/api.jsx";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [ message, setMessage ] = useState("");
  const [ loading, setLoading ] = useState(true);

  async function loadCartItems() {
    try {
      const res = await apiFetch("/cart");
      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }

  }
    useEffect(()=>{
    loadCartItems();
    }, []);

    async function removeItem(productId) {
    try {
      const res = await apiFetch(`/cart/${productId}`, {
        method: "DELETE",
      });
      await loadCartItems();
      setMessage("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
  if(loading) return <main className="p-6"><p>Loading cart...</p></main>;

  return(
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {message && <p className="text-green-500">{message}</p>}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p className="text-gray-600">{item.product.price.toLocaleString("en-USD", { style: "currency", currency: "USD" })} x {item.quantity}</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <h2 className="my-6 text-xl font-bold">
        Total:{" "}
        {total.toLocaleString("en-USD", { style: "currency", currency: "USD" })}
      </h2>
        <Link  className="block rounded bg-green-700 p-3 text-center text-white" 
            href="/checkout"> 
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </Link>
    </main>
  )
}