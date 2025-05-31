import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
export default function CardSkleton({ length = 7 }) {
  return (
    <div className="flex flex-col gap-4 base_container">
      {Array(length)
        .fill(0)
        .map((_, index) => {
          return (
            <Card
              key={index}
              className={"max-w-[730px] w-full mx-auto rounded"}
            >
              <CardHeader>
                <div className="flex items-center justify-between ">
                  <CardTitle>
                    <Skeleton className="w-[72px] h-[16px] rounded-md bg-slate-300 " />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="w-[109px] h-[20px] rounded-md bg-slate-300" />
                  </CardDescription>
                  <span>
                    <Skeleton className="w-[104px] h-[24px] rounded-md bg-slate-300" />
                  </span>
                  <span>
                    <Skeleton className="w-[63px] h-[24px] rounded-md bg-slate-300" />
                  </span>
                  <Skeleton className="w-[104px] h-[36px] rounded-md bg-slate-300" />
                </div>
              </CardHeader>
            </Card>
          );
        })}
    </div>
  );
}
