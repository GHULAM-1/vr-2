// Import necessary modules
import connectDB from "@/lib/db-connect";
import { currentUser } from "@clerk/nextjs";
import User from "@/schemas/server/user-schema";
import { ProductCard } from "@/components/user/product-card";
import { UserButton } from "@clerk/nextjs";
import { nanoid } from "nanoid";
export default async function UserPage() {
  await connectDB();

  const user = await currentUser();

  const productsWithUser = await User.aggregate([
    // Unwind the myProducts array to deconstruct the array elements
    { $unwind: "$myProducts" },
    // Project to include the userEmail for each product
    {
      $project: {
        _id: 0,
        businessName: "$businessInfo.businessName",
        productName: "$myProducts.productName",
        productDesc: "$myProducts.productDesc",
        productPrice: "$myProducts.productPrice",
        productUrl: "$myProducts.productUrl",
        isVR: "$myProducts.isVR",
      },
    },
  ]);

  // Do something with the products data
  console.log(productsWithUser);

  // Return JSX or any other desired output
  return (
    <>
      <div>
        <UserButton></UserButton>
        <div className="flex gap-10">
          {productsWithUser.map((product) => {
            return (
              <ProductCard
                key={nanoid()}
                desc={product.productDesc}
                isVR={product.isVR}
                price={product.productPrice}
                name={product.productName}
                url={product.productUrl}
                businessName={product.businessName}
              ></ProductCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
