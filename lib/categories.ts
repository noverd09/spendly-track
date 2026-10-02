import {
  Briefcase,
  Bus,
  Clapperboard,
  Ellipsis,
  GraduationCap,
  HeartPulse,
  Laptop,
  LineChart,
  Plane,
  Receipt,
  ShoppingBag,
  Store,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { createElement } from "react";
import type { TransactionType } from "@/types/transaction";

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Travel",
  "Other",
] as const;

export const INCOME_CATEGORIES = ["Salary", "Freelance", "Business", "Investment", "Other"] as const;

export function categoriesFor(type: TransactionType): readonly string[] {
  return type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}

export function isValidCategory(type: TransactionType, category: string) {
  return categoriesFor(type).includes(category);
}

const ICONS: Record<string, LucideIcon> = {
  Food: UtensilsCrossed,
  Transportation: Bus,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Entertainment: Clapperboard,
  Health: HeartPulse,
  Education: GraduationCap,
  Travel: Plane,
  Salary: Briefcase,
  Freelance: Laptop,
  Business: Store,
  Investment: LineChart,
};

function categoryIcon(category: string, type: TransactionType): LucideIcon {
  return ICONS[category] ?? (type === "income" ? Wallet : Ellipsis);
}

/** Renders the Lucide icon for a category (icons are looked up, not created). */
export function CategoryIcon({ category, type, className, strokeWidth = 1.75 }: { category: string; type: TransactionType; className?: string; strokeWidth?: number }) {
  return createElement(categoryIcon(category, type), { "aria-hidden": true, className, strokeWidth });
}
