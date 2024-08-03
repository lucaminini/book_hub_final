import BookFilterSidebar from "@/components/BookFilterSidebar/BookFilterSidebar";
import BookResults from "@/components/BookResults";
import H1 from "@/components/ui/h1";

function getTitle({ q, sector, condition, course, subject }) {
  const titlePrefix = q ? (
    `Libri: ${q}`
  ) : sector ? `Libri: ${sector}${course ? " > " + course: ""}${subject ? " > " + subject: ""}`
   : (
    "Libri disponibili"
  );

  const titleSuffix = condition ? ` in "${condition.replace('_', " ")}" stato.` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({searchParams}) {
  return {
    title: `${getTitle(searchParams)} | BookHub`
  };
}

export default async function Home({
  searchParams: { q, sector, condition, course, subject },
}) {
  const filterValues = {
    q,
    sector,
    condition,
    course,
    subject,
  };

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {getTitle(filterValues)}
        </H1>
        <p className="text-muted-foreground">Trova i libri che ti servono</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4 ">
        <BookFilterSidebar defaultValues={filterValues} key={JSON.stringify(filterValues)} />
        <BookResults filterValues={filterValues} />
      </section>
    </main>
  );
}
