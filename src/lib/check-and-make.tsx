import User from "@/schemas/server/user-schema";
import connectDB from "./db-connect";
export default async function checkAndMake(email: string | undefined) {
  try {
    await connectDB();
    const res = await User.findOne({ "userInfo.userEmail": email });
    if (res) {
      return;
    }

    await User.create({
      userInfo: {
        userEmail: email,
      },
      businessInfo: {
        businessName: "no-name",
      },
      myProducts: [],
    });
  } catch (error) {
    console.log(error);
  }
}
