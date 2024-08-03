"use server";

import { FilterBookSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export const filterBooks = async (formData) => {
  const values = Object.fromEntries(formData.entries());

  const { q, sector, condition, course, subject } =
    FilterBookSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(sector && !sector?.includes("Seleziona") && { sector }),
    ...(course && !course?.includes("Seleziona") && { course }),
    ...(subject && !subject?.includes("Seleziona") && { subject }),
    ...(condition && !condition?.includes("Seleziona") && { condition }),
  });

  redirect(`/?${searchParams.toString()}`);
};
