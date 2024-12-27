import ProductCard from "@/components/ProductCard";
import { PRODUCT_URL } from "@/data/products";

export default function Home() {
  return (
    <div>
      <header>
        <div
          className="relative h-[350px] overflow-hidden"
          style={{
            backgroundImage:
              "url('https://tecdn.b-cdn.net/img/new/slides/041.webp')",
            backgroundSize: "cover",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
            <div className="flex h-full items-center justify-center">
              <div className="px-6 text-center text-white md:px-12">
                <h1 className="mb-6 text-5xl font-bold">
                  <span className="text-gray-700 ">Hi</span>
                  <span className="text-green-600">link</span>
                </h1>
                <h3 className="mb-8 text-3xl font-bold text-green-600">
                  For Camping Gear
                </h3>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCT_URL.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}
