
import Image from "next/image";
import ProductCard from "./components/ProductCard.jsx";


  //const [Products, setProducts] = useState([]);
  async function getProducts() {
    try {
    const res = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/Products`);
    const data = await res.json();
    getProducts(data);
  
  if(!respone.ok) return [];

  return data.products || []
    } catch {
        return[];
    }
}

 export default async function HomePage() {
    const Products = await getProducts();
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="md-6 text-3xl font-bold"> Enco Agro Products</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2  xl:grid-cols-3">
                {Products.map((Product) => (
                    <ProductCard key={Product.id} Product={Product} />
                ))}
            </div>
        </main>
    )
 }