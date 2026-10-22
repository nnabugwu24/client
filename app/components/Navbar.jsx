import Link from "next/link";


export default function Navbar() {
    return(
     <nav className="flex flex-wrap gap-5 border-b p-4">

        <Link hre="/"> HomePage </Link>;
       <Link href="/register"> Register </Link>;
       <Link href="/login"> Login </Link>;
       <Link href="/Cart"> Cart </Link>;
       <Link href="/Checkout"> Checkout </Link>;
       <Link href="/payment"> payment-success </Link>
    </nav>
 )
}