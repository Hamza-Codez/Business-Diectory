import { Loader2 } from "lucide-react";

export default function SearchLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center justify-center p-12 bg-white border border-line shadow-2xl rounded-2xl animate-in fade-in zoom-in duration-300">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Loader2 className="relative w-14 h-14 text-primary animate-spin" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink tracking-tight">Loading...</h2>
        <p className="mt-2 text-sm text-muted">Please wait while we search the directory.</p>
      </div>
    </div>
  );
}
