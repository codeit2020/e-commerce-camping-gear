import ProductCard from "@/components/ProductCard";
import { PRODUCT_URL } from "@/data/products";

const productDetails = ({ params }) => {
  const productId = params.id;
  const product = PRODUCT_URL.at(productId - 1);

  return (
    <>
      <div className="flex flex-row h-full flexCenter">
        <ProductCard
          id={productId}
          image={product.image}
          name={product.name}
          price={product.price}
          description={product.description}
        />
        <div className="w-1/2 bg-slate-100 p-6 m-6 rounded-lg shadow-lg">
          <h1 className="flex flex-auto p-2 ">Random Description</h1>
          <div className="border-2 border-green-600" />
          <p className="p-4">{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default productDetails;
