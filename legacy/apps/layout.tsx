// import { Toaster } from "@/components/ui/sonner";
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Toaster /> */}
      {children}
    </>
  );
}
