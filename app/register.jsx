"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import  { apiFetch }  from "../../lib/api.jsx";

export default function Register() {
  
  const router = useRouter();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [message, setMessage ] = useState("");
  const[ loading, setLoading ] = useState(false);

  function handleChange(event) { setForm({
    ...form,
    [event.target.name]:
    event.target.value,
  })

  }
  async function handleSubmit(event)
  {
    event.preventDefault();
    setLoading(true);
    setMessage("create account...");
    try {
      const response = await apiFetch(
        "/auth/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name:form.name,email:form.email,password:form.password }),
        }
      );
        router.push("/");
        
      const data = await response.json();
      if(!response.ok) {
        throw new Error(data.message||"Registration failed")
      }
      setMessage("Account created successfully!")
    } catch (error) {
      console.error("Error creating account:", error);
      setMessage("Error creating account. Please try again.");
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold"> Create Customer Account </h1>

     <form onSubmit={handleSubmit} className="space-y-4">
     
     <input
          className="w-60 rounded border p-3"
          name="name"
          placeholder = "Full name"
          value = {form.name}
          onChange = {handleChange}
          required
     />

     <input
       className= "w-60 rounded border p-3"
       name = "email"
       type = "email"
       placeholder = "Email address"
       value = {form.email}
       onChange = {handleChange}
       required
     />

     <input
       className="w-60 rounded border p-3"
       name="password"
       type = "password"
       placeholder = "password(minimum 8 characters)"
       onchange = {handleChange}
       value={form.password}
       minLength = {8}
       required
     />
       {message && <p role="alert"> {message} </p>}

     <button className="w-30 rounded bg-green-700 p-3 text-white" type ="Submit">
      { loading? "Creating account...": "Register"} </button>
     <p>{message}</p>
     </form>
     </main>
    
  )
}
