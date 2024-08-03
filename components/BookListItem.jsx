import { formatMoney, relativeDate } from "@/lib/utils";
import { Banknote, ChevronRight, Clock, Star } from "lucide-react";
import Image from "next/image";
import Badge from "./Badge";

const BookListItem = ({ book }) => {
  return (
    <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/60">
      <Image
        src={book.image}
        alt={`${book.title} copertina`}
        width={125}
        height={125}
        className="rounded-sm self-center"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{book.title}</h2>
          <p className="text-muted-foreground">{book.isbn}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
          <Star className="size-4 shrink-0" />
          {book.condition.replace("_", " ")}

          </p>
          <p className="flex items-center gap-1.5">
          <Banknote className="size-4 shrink-0" />
          {formatMoney(book.price)}
          </p>
          <p className="flex items-center gap-1.5">
            {book.sector} <ChevronRight className="size-4 shrink-0" />{" "}
            {book.course} <ChevronRight className="size-4 shrink-0" />{" "}
            {book.subject}
          </p>
          <p className="flex items-center gap-1.5">
            <Image src={book.user.image} alt={`${book.user.name} foto profilo`} width={16} height={16} className="rounded-full" />
            {book.user.name}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock className="size-4 shrink-0" />
            {relativeDate(book.createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>{book.condition.replace("_", " ")}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-4 shrink-0" />
          {relativeDate(book.createdAt)}
        </span>
      </div>
    </article>
  );
};

export default BookListItem;
