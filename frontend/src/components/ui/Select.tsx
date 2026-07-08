"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  placeholder?: string;
};

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={cn("relative h-12", className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-full w-full items-center justify-between border border-line bg-white px-4 text-base text-body transition-colors",
          isOpen ? "border-primary outline-none" : "hover:border-ink/20",
          "focus:border-primary focus:outline-none"
        )}
      >
        <span className={selectedOption && selectedOption.value !== "" ? "text-body" : "text-body/60"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={20}
          className={cn("text-muted transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto border border-line bg-white shadow-lg animate-in fade-in zoom-in-95 duration-200">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "cursor-pointer px-4 py-3 text-base transition-colors border-b border-line/50 last:border-b-0",
                value === option.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-body hover:bg-primary hover:text-white"
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
