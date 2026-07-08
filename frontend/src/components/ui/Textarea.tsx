import { cn } from "@/lib/utils";

type TextareaProps = {
  /** Applied to the wrapper — use for height/width overrides */
  className?: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <div className={cn("relative", className)}>
      <textarea
        className={cn(
          "w-full border border-line bg-white px-4 py-3 text-base text-body placeholder:text-muted",
          "focus:border-primary focus:outline-none resize-y min-h-[120px]"
        )}
        {...props}
      />
    </div>
  );
}
