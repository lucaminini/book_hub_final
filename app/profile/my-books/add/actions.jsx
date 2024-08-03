"use server";

import { createBookSchema } from "@/lib/validation";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createBook = async (formData) => {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    condition,
    course,
    image,
    isbn,
    ownerId,
    price,
    sector,
    subject,
  } = createBookSchema.parse(values);

  let bookImageUrl = undefined;

  if (image) {
    const blob = await put(
      `bookImages/${nanoid()}${path.extname(image.name)}`,
      image,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );

    bookImageUrl = blob.url;
  }

  await prisma.book.create({
    data: {
      ownerId,
      image: bookImageUrl,
      title: title.trim(),
      price: parseFloat(price),
      condition,
      course,
      sector,
      subject,
      isbn
    }
  });

  redirect("/");
};
