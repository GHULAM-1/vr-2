import Hero from "@/components/marketing/hero";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Hero></Hero>

      <UserButton></UserButton>
    </>
  );
}
