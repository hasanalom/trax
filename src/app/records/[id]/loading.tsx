import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading UI for a technical record detail page — mirrors the header + main/rail
 * grid so the transition into content is calm.
 */
export default function Loading() {
  return (
    <div className="container-content py-6 sm:py-8" aria-busy="true" aria-label="Loading record">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-40" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-72" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          <Card>
            <CardContent className="py-5">
              <Skeleton className="mb-4 h-4 w-24" />
              <div className="flex flex-col gap-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-5">
              <Skeleton className="mb-4 h-4 w-32" />
              <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="py-5">
                <Skeleton className="mb-4 h-4 w-28" />
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
