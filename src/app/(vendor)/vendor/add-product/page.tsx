import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/user/product-card";
import User from "@/schemas/server/user-schema";
import { currentUser } from "@clerk/nextjs";
import { AddProductForm } from "@/components/vendor/add-product-form";
import connectDB from "@/lib/db-connect";
import {nanoid} from "nanoid"
export default async function AddProducts() {
  await connectDB();
  const user = await currentUser();
  const products = await User.findOne(
    { "userInfo.userEmail": user?.emailAddresses[0].emailAddress },
    { _id: 0, myProducts: 1 }
  );

  return (
    <>
      <div>
        <div>
          <div>Add products</div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button>add products</Button>
              </DialogTrigger>
              <DialogContent>
                <AddProductForm></AddProductForm>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex gap-4">
          {products.myProducts.map((product: any) => {
            return (
              <ProductCard
                key={nanoid()}
                desc={product.ProductDesc}
                name={product.productName}
                price={product.productPrice}
                url={product.productUrl}
                isVR={product.isVR}
              ></ProductCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
