import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
