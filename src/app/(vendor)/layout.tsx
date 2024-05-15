import Sidebar from "@/components/vendor/sidebar";
export default function VendorLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex ">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Sidebar></Sidebar>

      {children}
    </section>
  );
}
