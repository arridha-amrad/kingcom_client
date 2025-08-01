import Product from "../Product";

const data = [
  {
    id: 1,
    name: "GeForce RTX™ 4090 SUPRIM 24G",
    imageUrl: `https://ik.imagekit.io/o12xdvxz5l/KingCom/1024%20(1).png?updatedAt=1746906350522`,
    rating: 4.5,
    price: 120,
    discount: null,
  },
  {
    id: 2,
    name: "GeForce RTX™ 4090 GAMING TRIO 24G",
    imageUrl: `https://ik.imagekit.io/o12xdvxz5l/KingCom/1024.png?updatedAt=1746906350489`,
    rating: 3.5,
    price: 260,
    discount: 20,
  },
  {
    id: 3,
    name: "GeForce RTX™ 4090 GAMING TRIO 24G",
    imageUrl: `https://ik.imagekit.io/o12xdvxz5l/KingCom/1024%20(2).png?updatedAt=1746906466624`,
    rating: 4.5,
    price: 180,
    discount: null,
  },
  {
    id: 4,
    name: "MPG X870E CARBON WIFI",
    imageUrl: `https://ik.imagekit.io/o12xdvxz5l/KingCom/1024%20(3).png?updatedAt=1746906941729`,
    rating: 4.5,
    price: 180,
    discount: null,
  },
];

function OnSale() {
  return (
    <section id="on_sale" className="xl:px-0 w-full space-y-8 px-4 mx-auto">
      <div className="h-24 flex items-center justify-center">
        <h1 className="font-header text-5xl text-center">On Sale</h1>
      </div>
      <div className="grid w-full gap-4 md:grid-cols-4 grid-cols-2">
        {data.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
      <div className="py-8 mx-auto w-max ">
        <button className="w-[218px] h-[52px] cursor-pointer font-medium rounded-full border border-black/10 outline-0 bg-foreground text-background">
          View all
        </button>
      </div>
    </section>
  );
}

export default OnSale;
