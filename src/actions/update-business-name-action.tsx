"use server";

import connectDB from "@/lib/db-connect";
import checkAndMake from "@/lib/check-and-make";
import User from "@/schemas/server/user-schema";
import { businessNameSchema } from "@/schemas/client/business-name-schema";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
export default async function updateBusinessNameAction(
  data: z.infer<typeof businessNameSchema>
) {
  try {
    await connectDB();
    const user = await currentUser();
    // await checkAndMake(user?.emailAddresses[0].emailAddress);
    const res = await User.findOneAndUpdate(
      { "userInfo.userEmail": user?.emailAddresses[0].emailAddress },
      {
        $set: {
          "businessInfo.businessName": data.businessName,
        },
      }
    );

    if (!res) {
      return false;
    }
    revalidatePath("/", "layout");
    return true;
  } catch (error) {
    console.log("error in updating business name ", error);
  }
}
