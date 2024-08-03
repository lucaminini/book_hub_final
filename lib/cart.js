import prisma from "@/lib/prisma";

export const getCart = async (userId) => {
  // Fetch the cart for the given user and include the associated BookInCart entries and books
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
    include: {
      bookInCarts: {
        include: {
          book: {
            include: {
              user: true,
            },
          }, // Include the book associated with each BookInCart entry
        },
      },
    },
  });

  if (!cart) return null;

  // Filter the books based on availability (available: true)
  const availableBooks = cart.bookInCarts
    .filter((bic) => bic.book.available === true)
    .map((bic) => bic.book);

  // Calculate the size of the cart (number of books) and subtotal (sum of book prices)
  const size = availableBooks.length;
  const subtotal = availableBooks.reduce((tot, bic) => tot + bic.price, 0);

  // Map the BookInCart entries to extract the book details and construct the cart response
  // const books = cart.bookInCarts.map((bic) => bic.book);

  return {
    ...cart,
    books: availableBooks, // Override the books field with the extracted books array
    size: size,
    subtotal: subtotal,
  };
};

// export const createCart = async (userId) => {
//   const newCart = await prisma.cart.create({
//     data: {
//       userId,
//     },
//   });

//   return {
//     ...newCart,
//     books: [],
//     size: 0,
//     subtotal: 0,
//   };
// };

export const addToCart = async (userId, bookId) => {
  // Find the user and include their cart and associated books in the cart
  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Cart: {
        include: {
          bookInCarts: true,
        },
      },
    },
  });

  // If the user doesn't have a cart, create a new one and add the book
  if (!user.Cart) {
    const newCart = await prisma.cart.create({
      data: {
        userId: userId,
      },
    });

    // Create a new entry in BookInCart to establish the relationship
    await prisma.bookInCart.create({
      data: {
        bookId: bookId,
        cartId: newCart.id,
      },
    });
  } else {
    // Check if the book is already in the cart by checking the BookInCart entries
    const isBookInCart = user.Cart.bookInCarts.some(
      (bic) => bic.bookId === bookId
    );

    if (isBookInCart) {
      return; // Book is already in the cart, so do nothing
    }

    // Add the book to the cart by creating a new BookInCart entry
    await prisma.bookInCart.create({
      data: {
        bookId: bookId,
        cartId: user.Cart.id,
      },
    });
  }
};

export const removeBookFromCart = async (bookId, cartId) => {
  // Find the specific BookInCart entry associated with the provided bookId and cartId
  const bookInCart = await prisma.bookInCart.findUnique({
    where: {
      bookId_cartId: {
        bookId: bookId,
        cartId: cartId,
      },
    },
  });

  // If the BookInCart entry is not found, return null or handle the error as needed
  if (!bookInCart) {
    return null;
  }

  // Delete the found BookInCart entry from the database
  await prisma.bookInCart.delete({
    where: {
      id: bookInCart.id, // Assuming the BookInCart entity has an 'id' field
    },
  });
};

export async function isBookInUserCart(userId, bookId) {
  // Check if the book is in the cart of the user
  const bookInCart = await prisma.bookInCart.findFirst({
    where: {
      bookId: bookId,
      cart: {
        userId: userId,
      },
    },
  });

  return !!bookInCart;
}
