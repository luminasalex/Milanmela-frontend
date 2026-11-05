"use client";

import { ListFilter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategoryLabel } from "@/lib/events";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
  className?: string;
  locale?: "bn" | "en";
}

export default function CategoryFilter({
  categories,
  value,
  onChange,
  className = "",
  locale = "en",
}: CategoryFilterProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ListFilter className="size-4 shrink-0 text-[#C99A4B]" aria-hidden="true" />
      <Select
        value={value}
        onValueChange={(nextValue) =>
          onChange(typeof nextValue === "string" ? nextValue : "all")
        }
      >
        <SelectTrigger
          aria-label={locale === "bn" ? "বিভাগ অনুযায়ী আয়োজন বাছাই করুন" : "Filter events by category"}
          className="h-10 min-w-44 rounded-full border-[#C99A4B]/40 bg-white px-4 text-xs font-semibold text-[#064B38]"
        >
          <SelectValue placeholder={locale === "bn" ? "সকল বিভাগ" : "All categories"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{locale === "bn" ? "সকল বিভাগ" : "All categories"}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {getCategoryLabel(category, locale)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
