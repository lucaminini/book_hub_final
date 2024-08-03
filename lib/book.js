import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { unlink, writeFile} from "fs/promises";

export const getAvailableBooks = async () => {
  const books = await prisma.book.findMany({
    where: {
      available: true,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });
  return books;
};

export const getAllUserBooks = async (userId) => {
  const books = await prisma.book.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });

  return books;
};

const saveImage = async (image) => {
  const fileType = image.name.split(".").at(-1);
  const data = await image.arrayBuffer();
  const buffer = Buffer.from(data);
  const imageUUID = uuidv4();
  let imagePath = `/uploads/${imageUUID}.${fileType}`;
  await writeFile(`public${imagePath}`, buffer);
  return imagePath;
};

export const updateBook = async (formData) => {
  const bookId = formData.get("bookId");
  const imageChanged = formData.get("image").name;

  let newBookData = {
    title: formData.get("title"),
    isbn: formData.get("isbn"),
    price: Number(formData.get("price")),
    condition: formData.get("condition"),
    class: formData.get("class"),
    sector: formData.get("sector"),
    subject: formData.get("subject"),
  };

  if (imageChanged !== "undefined") {
    // if the image is changed
    let oldImagePath = await prisma.book.findUnique({
      where: { id: bookId },
      select: { image: true },
    });

    await unlink(`public${oldImagePath.image}`);

    let imagePath = await saveImage(formData.get("image"));

    newBookData.image = imagePath;
  }

  await prisma.book.update({
    where: {
      id: bookId,
    },
    data: newBookData,
  });
};


export const deleteBook = async (bookId) => {
  let deletedBook = await prisma.book.delete({
    where: {
      id: bookId
    }
  });
  let deletedImage = deletedBook.image;
  await unlink(`public${deletedImage}`);
};