import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading page"
      className="flex-1 bg-[#F7F1E3] px-4 py-10 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        <section className="grid min-h-[360px] gap-8 rounded-3xl bg-white/70 p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <Skeleton className="h-4 w-32 bg-[#064B38]/10" />
            <Skeleton className="h-12 w-full max-w-lg bg-[#064B38]/10" />
            <Skeleton className="h-12 w-4/5 max-w-md bg-[#064B38]/10" />
            <Skeleton className="h-5 w-full max-w-lg bg-[#064B38]/10" />
            <Skeleton className="h-5 w-3/4 max-w-md bg-[#064B38]/10" />
            <Skeleton className="h-11 w-36 rounded-full bg-[#C99A4B]/25" />
          </div>
          <Skeleton className="h-56 w-full rounded-2xl bg-[#C99A4B]/15 sm:h-72" />
        </section>

        <section className="space-y-5">
          <Skeleton className="mx-auto h-8 w-56 bg-[#064B38]/10" />
          <div className="grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="space-y-4 rounded-2xl bg-white/70 p-5 shadow-sm"
              >
                <Skeleton className="h-40 w-full rounded-xl bg-[#064B38]/10" />
                <Skeleton className="h-5 w-3/4 bg-[#064B38]/10" />
                <Skeleton className="h-4 w-full bg-[#064B38]/10" />
                <Skeleton className="h-4 w-2/3 bg-[#064B38]/10" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
