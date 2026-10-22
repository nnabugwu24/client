"use client";
import { useEffect , useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiFetch } from "../../lib/api.jsx";

export default function PaymentSuccess() {
    const [message, setMessage] = useState("Verifying payment...");
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference");

    useEffect(() => {
        if (!reference) {
            setMessage("No payment reference was provided");
            return;
        }
        apiFetch(`/payments/verify/${encodeURIComponent(reference)}`)
          .then(result => {
            setMessage(
                result.paymentStatus === "paid"
                ? "Payment confirmed! Thank you for your purchase."
                : "Payment verification failed."
            );
          })
           .catch(() => {
            setMessage("we could not confirm your payment yet. please check your order again");
           })
        
    },[reference]);


    return (
        <main className="mx-auto max-w-xl p-6">
            <h1 className="mb-6 text-2xl font-bold">Payment Success</h1>
            <p className="text-lg">{message}</p>
        </main>
    );
}