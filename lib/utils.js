import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict } from "date-fns"
import { it } from "date-fns/locale/it"


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount) {
  return amount.toLocaleString("it", {
    style: "currency",
    currency: "eur",
  });
}

export function relativeDate(from) {
  return formatDistanceToNowStrict(from, {addSuffix: true, locale: it});
}