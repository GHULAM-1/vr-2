"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { TypewriterEffect } from "../ui/typewritter-effect";
export function HeroText() {
  const words = [
    {
      text: "Sell",
    },
    {
      text: "Products",
    },
    {
      text: "with",
    },
    {
      text: "Augmented",
      className: "text-primary ",
    },
    {
      text: "Reality",
      className: "text-primary  ",
    },
  ];
  return (
    <>
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <div>
            <TypewriterEffect words={words} cursorClassName="bg-primary" />
          </div>

          <div className="flex w-full justify-center items-center mt-10 gap-10">
            <Link href="/user">
              <Button className="text-black" size="lg" variant="default">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

//  <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
//    {/* Radial gradient for the container to give a faded look */}
//    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
//    <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
//      <div>
//        <TypewriterEffect words={words} cursorClassName="bg-primary" />
//      </div>

//      <div className="flex w-full justify-center items-center mt-10 gap-10">
//        <Button className="text-black" size="lg" variant="outline">
//          Login
//        </Button>
//        <Button size="lg" variant="default">
//          Sign up
//        </Button>
//      </div>
//    </p>
//  </div>;
