"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch }  from  "../../lib/api.jsx";

export default function Login() {
    const router = useRouter();
    const [ form , setForm ] = useState ({
        email: "",
        password: ""
    })
    const [ email , setEmail ] = useState("");
    const [ loading , setLoading ] = useState("");
    const [message , setMessage ] = useState("")

    function handleChange(event) {
        setForm ({
            ...form,
        [event.target.name]:
        event.target.value
        })
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await apiFetch("/auth/login",
                {
                    methode:"post",
                    credentials: "include",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({email:form.email,password:form.password}),
                },
            ); 
               router.push("/")
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.message||"Login failed")
            }
            setMessage(`welcome back,${data.user.name}!`);
        } catch(error) {
            setMessage(error.message);
        }finally{
            setLoading(false)
        }
    }
    return (
        <main className= "mx-auto max-w-md p-6">
            <h1 className="mb-6 text-2xl font-bold"> Customer Login</h1>
            <form onSubmit={handleSubmit} className= "space-y-4">
                <input
                   className = "w-60 rounded border p-3"
                   type="email"
                   placeholder="Enter your Email"
                   value={form.email}
                   onChange={handleChange}
                   required
                />

                <input
                  className= "w-60 rounded border p-3"
                  type= "password"
                  placeholder ="Enter your password"
                  value = {form.password}
                  onChange = {handleChange}
                  required
                    
                />
                <button className="w-30 rounded bg-green-700 p-3 text-white" type="Submit" disable={loading}>
                    {loading? "logging in....." : "Login"}
                </button>
                <p role="status">{message}</p>


            </form>
        </main>
    )
}