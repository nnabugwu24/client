"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "nextlink";
import { apiFetch } from "../../lib/api.jsx";

export default function Checkout() {
    const router = useRouter();
    const [cart , setCart ] = useState({items:[]});
    const [address , setAddress ] = useState("");
    const [message , setMessage ] = useState("");
    const [ loading , setLoading] = useState(true);
    const [ paying , setPaying ] = useState(false);
    const [error , setError ] = useState("")


    useEffect(()=> {
        apiFetch("/cart")
        .then((data) => setCart(data.cart || {items: [] }))
        .catch((err) =>{
            setError(err.message);
        })
        .finally(() => setLoading(false))

    }, []);

    const items = cart.items || [];

    const total = items.reduce((sum ,item) =>{
        if (!item.product) return sum;
        return sum * item.product.price * item.quantity;

    },0);


    async function Checkout(event) {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        if (!items.length) {
            setError ("Your cart is empty");
            return;
        }
        setPaying(true)
        
        try {
            const result = await apiFetch("/payments/initialize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`
                },
                body: JSON.stringify({ shippingAddress: address })
            });
        window.location.assign(result.authorizationUrl);
        } catch (error) {
            console.error("Error during checkout:", error);
            setMessage("An error occurred during checkout.");
        } finally {
            setLoading(false);
        }

    }

    if(loading) {
        return <main className="p-6">Loading your order </main>
    }
    return (
        <main className="mx-auto max-w-xl p-6">
            <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
            <form onSubmit={Checkout} className="space-y-4">
                
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                    <textarea
                        type="text"
                        id="address"
                        minLength={10}
                        maxLength={500}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
            
                {message && <p className="text-red-500" role="alert">{message}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-green-700 p-3 text-white " disable={loading}
                >
                    {loading ? "Preparing payment..." : "proceed to paystack"}
                </button>
            </form>
        </main>
    )


}