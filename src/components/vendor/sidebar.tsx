import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle, UserRound } from "lucide-react";
import { Home } from "lucide-react";
import { Pencil } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import User from "@/schemas/server/user-schema";
import connectDB from "@/lib/db-connect";
import { BusinessNameForm } from "./business-name-form";
import checkAndMake from "@/lib/check-and-make";
export default async function Sidebar() {
  await connectDB();

  const user = await currentUser();
  await checkAndMake(user?.emailAddresses[0].emailAddress);
  const res = await User.findOne(
    {
      "userInfo.userEmail": user?.emailAddresses[0].emailAddress,
    },
    { _id: 0, businessInfo: 1 }
  );
  // console.log(
  //   "printing business name in sidebar",
  console.log(res);
  return (
    <>
      <div className="w-[18vw] h-screen  bg-primary px-4 flex flex-col justify-between">
        <div className="w-full gap-4 flex justify-center items-center text-left py-10 border-b border-black font-extrabold text-4xl">
          <span>{res.businessInfo.businessName}</span>
          <Dialog>
            <DialogTrigger>
              <Pencil className=" "></Pencil>
            </DialogTrigger>
            <DialogContent>
              <BusinessNameForm></BusinessNameForm>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col justify-start items-start gap-3 py-8  h-full">
          <Link href="/vendor" className="flex justify-start items-start ">
            <Button className="text-2xl flex gap-4 text-black">
              <Home className="h-18 w-18"></Home>
              Home
            </Button>
          </Link>
          <Link
            href="/vendor/add-product"
            className="flex justify-start items-start bg-red-500 gap-8"
          >
            <Button className="text-2xl flex gap-4 text-black">
              <PlusCircle className="h-18 w-18"></PlusCircle>
              add product
            </Button>
          </Link>

          <Link
            href="/vendor/see-buyers"
            className="flex justify-start items-start gap-8"
          >
            <Button className="text-2xl flex gap-4 text-black">
              <UserRound className="h-18 w-18"></UserRound>
              see buyers
            </Button>
          </Link>
        </div>

        <div className="flex  justify-start items-center gap-4 pb-5">
          <UserButton></UserButton>
          <Link href="/user">
            <Button className="bg-black hover:bg-black text-white">
              switch to buying
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
