"use server";

import connectDB from "@/lib/db-connect";
import checkAndMake from "@/lib/check-and-make";
import User from "@/schemas/server/user-schema";
import { addProductSchema } from "@/schemas/client/add-product-schema";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
export default async function addProductAction(
  data: z.infer<typeof addProductSchema>,
  image: string
) {
  try {
    console.log("data from add products form ", data, image);
    const user = await currentUser();
    await connectDB();
    console.log("...............", data.isVR);
    let isVR;
    if (data.isVR === "yes") {
      isVR = true;
    } else {
      isVR = false;
    }
    const productUrl = image;

    await checkAndMake(user?.emailAddresses[0].emailAddress);
    const res = await User.findOneAndUpdate(
      { "userInfo.userEmail": user?.emailAddresses[0].emailAddress },
      {
        $push: {
          myProducts: {
            productName: data.productName,
            productDesc: data.productDesc,
            productPrice: data.productPrice,
            productUrl,
            isVR,
          },
        },
      }
    );

    if (!res) {
      return false;
    }
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.log("error in creating product action ", error);
  }
}
