import OrderSummary from "@/components/OrderSummary";
import { ChevronRight } from "lucide-react";
import Carts from "./Carts";

const data = [
  {
    id: 1,
    name: "Z890 AORUS ELITE X ICE",
    imageUrl: `https://ik.imagekit.io/o12xdvxz5l/KingCom/Z890%20AORUS%20ELITE%20X%20ICE.png?updatedAt=1747086239357`,
    price: 260,
    discount: 20,
    rating: 4,
    color: "#fff",
    quantity: 1,
  },
  {
    id: 2,
    imageUrl: `https://ik.imagekit.io/o12xdvxz5l/KingCom/Z890%20AORUS%20XTREME%20AI%20TOP.png?updatedAt=1747086239291`,
    name: "Z890 AORUS XTREME AI TOP.",
    price: 180,
    discount: 5,
    rating: 4.5,
    quantity: 1,
    color: "#000",
  },
  {
    id: 3,
    imageUrl: `https://ik.imagekit.io/o12xdvxz5l/KingCom/Z890%20AORUS%20TACHYON%20ICE.png?updatedAt=1747086238875`,
    price: 130,
    discount: 10,
    rating: 4,
    name: "Z890 AORUS TACHYON ICE",
    quantity: 1,
    color: "#000",
  },
  {
    id: 4,
    imageUrl: `https://ik.imagekit.io/o12xdvxz5l/KingCom/Z590%20AORUS%20XTREME%20(rev.%201.0).png?updatedAt=1747086238251`,
    name: "Z590 AORUS XTREME (rev. 1.0)",
    price: 145,
    discount: 20,
    rating: 4.5,
    quantity: 1,
    color: "#fff",
  },
];

function Page() {
  return (
    <main className="w-full px-4">
      <section
        id="breadcrumb"
        className="flex mx-auto py-6 justify-center lg:justify-start text-foreground/50 items-center gap-2"
      >
        <p>Home</p>
        <ChevronRight />
        <p className="text-foreground">Cart</p>
      </section>
      <section className="w-full">
        <h1 className="text-4xl font-bold font-header text-center md:text-start">
          Your Cart
        </h1>
        <div className="flex lg:flex-row flex-col pt-6 gap-8">
          <Carts items={data} />
          <div className="w-full lg:max-w-md">
            <OrderSummary deliveryFee={15} discount={20} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Page;
