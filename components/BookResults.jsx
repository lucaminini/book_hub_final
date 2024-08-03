import Link from "next/link";
import BookListItem from "./BookListItem";

export default async function BookResults({filterValues: {q, sector, condition, course, subject}}) {
  const searchString = q?.split(" ").filter(word => word.length > 0).join(" & ")

  const searchFilter = searchString ? {
    OR: [
      {title: {search: searchString}},
      {isbn: {search: searchString}},
    ]
  } : {};

  const where = {
    AND: [
      searchFilter,
      sector ? {sector} : {},
      course ? {course} : {},
      subject ? {subject} : {},
      condition ? {condition} : {},
      {available: true}
    ],
  }

  const books = await prisma.book.findMany({
    where,
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

  return (
    <div className="space-y-4 grow">
      {books.map((book) => (
        <Link href={`/books/${book.id}`} key={book.id} className="block" >
          <BookListItem book={book}/>
        </Link>
      ))}
      {books.length === 0 &&
        <p className="text-center m-auto">
          Nessun libro trovato prova a cambiare i filtri di ricerca
        </p>
      }
    </div>
  );
}
