"use client";

import Image from "next/image";
import { apiFetch } from "../lib/api.jsx";

const fallbackProducts = [
  {
    id: 1,
    image: "/BITTER KOLA2.jpg",
    title: "DRY BITTER KOLA NUT (GARCINIA KOLA NUT)",
    details: [
      "FOB PRICE: 24 USD PER KG",
      "TRIAL ORDER: 150KG PER WEEK",
      "DELIVERY TIME: 14DAYS-30DAYS AFTER CONFIRMATION OF T/T, T/C OR ADVANCE PAYMENT (50% UPFRONT)",
      "SUPPLY CAPACITY: 600KG-20TONNES PER MONTH",
    ],
    description:
      "BITTER KOLA NUT (GARCINIA KOLA NUT) is an edible nut produced by the bitter kola tree found mostly in tropical West/Central Africa and Asia. It has numerous health benefits and can be used in the treatment of hepatitis, infections and to boost the immune system. It is used traditionally for medicinal purposes as a stimulant, antiviral and anti-inflammatory.",
    specs: [
      "Country of Origin: NIGERIA.",
      "Moisture content: less than 10%.",
      "Appearance: Dark or light brown.",
      "Crude protein: 8.06%.",
      "Flavor: Natural bitter taste.",
      "Purity: 99% natural, no additives or preservatives.",
      "Packaging: Available in 25kg-50kg pp bag, retail packaging 100g-500g.",
      "Shelf life: 12-10 months under dry storage conditions.",
      "Payment method: T/T, T/C, ADVANCE PAYMENT 100% irrevocable.",
      "Inspection: SGS, COTECNA AND INTERTEK.",
    ],
  },
  {
    id: 2,
    image: "/sesame seed2.jpg",
    title: "UNHULLED SESAME SEED",
    details: [
      "FOB PRICE: 1.25 - 2.50 USD PER KG",
      "TRIAL ORDER: 150KG PER WEEK",
      "DELIVERY TIME: 14DAYS-30DAYS AFTER CONFIRMATION OF T/T, T/C OR ADVANCE PAYMENT (50% UPFRONT)",
      "SUPPLY CAPACITY: 600KG-20TONNES PER MONTH",
    ],
    description:
      "A high-quality unhulled sesame seed, white or brown, with high oil content and 99% sorting to high quality. Sesame seed is used to manufacture animal feed, biscuits and other edible and non-edible products.",
    specs: [
      "Country of Origin: NIGERIA",
      "Product type: UNHULLED SESAME SEED",
      "Moisture content: less than 9%",
      "Purity: 99% natural",
      "Inspection: SGS, COTECNA and INTERTEK ETC",
      "Packaging: 25kg-50kg pp bag or to buyer's specification",
      "Color: Natural brown/white",
      "Oil content: 50%-54%",
      "Free Fatty Acid (FFA): 1%-2%",
      "Shelf life: 12-16 months in a dry storage",
    ],
  },
  {
    id: 3,
    image: "/GINGER3.jpg",
    title: "DRIED NONSPLIT GINGER (RHIZOMA)",
    details: [
      "FOB PRICE: 1.5 - 9.00 USD PER KG",
      "TRIAL ORDER: 150KG PER WEEK",
      "DELIVERY TIME: 14DAYS-30DAYS AFTER CONFIRMATION OF T/T, T/C OR ADVANCE PAYMENT (50% UPFRONT)",
      "SUPPLY CAPACITY: 600KG-20TONNES PER MONTH",
    ],
    description:
      "GINGER (RHIZOMA): Has been used to manufacture many health-related products due to its anti-inflammatory, anti-nausea and other properties. Our ginger is cultivated locally here and processed to 99% purity in Nigeria.",
    specs: [
      "Country of Origin: NIGERIA",
      "Product type: DRIED NON SPLIT GINGER",
      "Moisture content: 10%-11%",
      "Purity: 99% natural",
      "Inspection: SGS, COTECNA AND INTERTEK ETC",
      "Packaging: 25kg-50kg pp bag or to buyer's specification",
      "Shelf life: up to 12 months under proper storage",
    ],
  },
  {
    id: 4,
    image: "/images (7).jpg",
    title: "UNSHELLED RAW CASHEW NUTS",
    details: [
      "FOB PRICE: 0.5 - 1.00 USD PER KG",
      "TRIAL ORDER: 500KG PER WEEK",
      "DELIVERY TIME: 14DAYS-30DAYS AFTER CONFIRMATION OF T/T, T/C OR ADVANCE PAYMENT (50% UPFRONT)",
      "SUPPLY CAPACITY: 5-20TONNES PER MONTH",
    ],
    description:
      "UNSHELLED RAW CASHEW NUTS: Mostly grown in Africa and other parts of the world. Cashew nuts are used in the manufacture of many edible food products and are a source of several chemical products.",
    specs: [
      "Country of Origin: NIGERIA",
      "Product type: UNSHELLED RAW CASHEW NUTS",
      "Moisture content: 8%-10%",
      "Purity: 99% natural",
      "Nut count: 180-200 per kg",
      "Float rate: 18%",
      "KOR or shell out turn: 48-52 lbs/bag",
      "Packaging: 25kg-50kg pp bag or to buyer's specification",
      "Shelf life: up to 6-12 months under proper storage",
      "Inspection: SGS, COTECNA and INTERTEK ETC",
    ],
  },
  {
    id: 5,
    image: "/Garri floor.jpg",
    title: "PROCESSED CASSAVA FLAKES (GARRI)",
    details: [
      "FOB PRICE: 0.2 - 0.25 USD PER KG",
      "TRIAL ORDER: 150KG PER WEEK",
      "DELIVERY TIME: 14DAYS-30DAYS AFTER CONFIRMATION OF T/T, T/C OR ADVANCE PAYMENT (50% UPFRONT)",
      "SUPPLY CAPACITY: 600KG-20TONNES PER MONTH",
    ],
    description:
      "CASSAVA FLAKES (GARRI): A processed food product from cassava root. It is a popular food in Africa and South America. There are white and yellow types of cassava flakes.",
    specs: [
      "Country of Origin: NIGERIA",
      "Product type: CASSAVA FLAKES",
      "Moisture content: less than 7%-9%",
      "Purity: 99% natural",
      "Color: white or yellow",
      "Texture: fine to medium grain",
      "Packaging: 25kg-50kg pp bag or to buyer's specification",
      "Shelf life: up to 6-12 months under proper storage",
      "Inspection: SGS, COTECNA and INTERTEK ETC",
    ],
  },
  {
    id: 6,
    image: "/Ogbono seed2.jpg",
    title: "OGBONO SEED",
    details: [
      "FOB PRICE: 35 - 55 USD PER KG",
      "TRIAL ORDER: 50KG PER WEEK",
      "DELIVERY TIME: 14DAYS-30DAYS AFTER CONFIRMATION OF T/T, T/C OR ADVANCE PAYMENT (50% UPFRONT)",
      "SUPPLY CAPACITY: 600KG-20TONNES PER MONTH OR RETAIL ORDER: 500G PER WEEK",
    ],
    description:
      "OGBONO SEED (AFRICAN MANGO SEED): A favorite in many West African foods. It is used to thicken soup and has a unique flavor with numerous health benefits.",
    specs: [
      "Country of Origin: NIGERIA",
      "Product type: sun dried, hand extracted African mango seed",
      "Moisture content: 7%",
      "Purity: 99% natural",
      "Color: natural light brown outside to off-white internal",
      "Quality classification: Grade A",
      "Packaging: 25kg-50kg pp bag or to buyer's specification",
      "Shelf life: up to 6-12 months under proper storage",
      "Inspection: SGS, COTECNA and INTERTEK ETC",
    ],
  },
  {
    id: 7,
    image: "/Egwuisi.jpg",
    title: "EGWUISI SEED (MELON SEED)",
    details: [
      "FOB PRICE: 15 - 25 USD PER KG",
      "TRIAL ORDER: 50KG PER WEEK",
      "DELIVERY TIME: 14DAYS-30DAYS AFTER CONFIRMATION OF T/T, T/C OR ADVANCE PAYMENT (50% UPFRONT)",
      "SUPPLY CAPACITY: 600KG-20TONNES PER MONTH OR RETAIL ORDER: 500G PER WEEK",
    ],
    description:
      "EGWUISI SEED (MELON SEED): Used to cook soup, stew and other dishes. It contains nutrients like fats, protein, iron and zinc.",
    specs: [
      "Country of Origin: NIGERIA",
      "Product type: sun dried, hand peeled",
      "Moisture content: 7%",
      "Purity: 99% natural",
      "Color: natural white",
      "Quality classification: Grade A",
      "Packaging: 25kg-50kg pp bag or to buyer's specification",
      "Shelf life: up to 6-12 months under proper storage",
      "Inspection: SGS, COTECNA and INTERTEK ETC",
    ],
  },
  {
    id: 8,
    image: "/yam 3.jpg",
    title: "RAW YAM TUBER (DIOSCORES)",
    details: [
      "FOB PRICE: 2.5 - 4.8 USD PER KG",
      "TRIAL ORDER: 50KG PER WEEK",
      "DELIVERY TIME: 14DAYS-30DAYS AFTER CONFIRMATION OF T/T, T/C OR ADVANCE PAYMENT (50% UPFRONT)",
      "SUPPLY CAPACITY: 600KG-20TONNES PER MONTH OR RETAIL ORDER: 10G PER WEEK",
    ],
    description:
      "RAW YAM TUBER: It is the second most important root/tuber crop in Africa and Nigeria. Yam is a very important crop for food and contains numerous nutrients like carbohydrates and vitamins.",
    specs: [
      "Country of Origin: NIGERIA",
      "Product type: RAW YAM TUBER",
      "Moisture content: 9%",
      "Purity: 99% natural",
      "Color: natural white inside",
      "Packaging: 25kg-50kg pp bag or to buyer's specification",
      "Shelf life: up to 6-12 months under proper storage",
      "Inspection: SGS, COTECNA and INTERTEK ETC",
    ],
  },
];

export default function ProductCard({ product = fallbackProducts }) {
  const products = Array.isArray(product) ? product : [product];

  async function addToCart(item) {
    try {
      await apiFetch("/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: item.id, quantity: 1 }),
      });
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((item) => (
        <div
          key={item.id ?? item.title}
          className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-2xl"
        >
          <Image
            src={item.image || "/placeholder.jpg"}
            width={200}
            height={100}
            alt={item.title || "Product image"}
            className="mx-auto rounded-xl object-cover"
          />

          <div className="pt-5 text-xl text-blue-700">
            <h3 className="text-2xl font-bold text-green-700">{item.title}</h3>
            {item.details?.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>

          <p className="pt-5 text-xl text-green-800">{item.description}</p>

          <div className="pt-5 text-xl text-blue-600">
            <h3 className="font-bold text-green-700">
              EXPORT SPECIFICATION FOR HIGH QUALITY {item.title.toUpperCase()}
            </h3>
            {item.specs?.map((spec) => (
              <p key={spec}>{spec}</p>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addToCart(item)}
            className="mt-5 rounded-lg bg-green-700 px-4 py-2 font-bold text-white"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
