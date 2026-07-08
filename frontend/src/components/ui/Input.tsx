import { cn } from "@/lib/utils";

type InputProps = {
  /** Optional trailing slot (e.g. geolocate button), rendered at 20px inside the field */
  trailing?: React.ReactNode;
  /** Applied to the wrapper — use for height/width overrides (default h-12) */
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;

export default function Input({ trailing, className, ...props }: InputProps) {
  return (
    <div className={cn("relative h-12", className)}>
      <input
        className={cn(
          "h-full w-full border border-line bg-white px-4 text-base text-body placeholder:text-muted",
          "focus:border-primary focus:outline-none",
          trailing && "pr-12",
        )}
        {...props}
      />
      {trailing && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {trailing}
        </div>
      )}
    </div>
  );
}
