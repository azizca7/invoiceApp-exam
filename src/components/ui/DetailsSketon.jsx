import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
export default function DetailsSkleton({ length = 1 }) {
  return (
    <div className="flex flex-col gap-4 base_container">
      {Array(length)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="mt-[64px]">
              <Card className={"max-w-[730px] w-full mx-auto rounded"}>
                <CardHeader>
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-[13px]">
                      <CardTitle>
                        <Skeleton className="w-[39px] h-[15px] rounded-md bg-slate-300 " />
                      </CardTitle>
                      <CardDescription>
                        <Skeleton className="w-[104px] h-[40px] rounded-md bg-slate-300" />
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <span>
                        <Skeleton className="w-[73px] h-[48px] rounded-[24px] bg-slate-300" />
                      </span>
                      <span>
                        <Skeleton className="w-[89px] h-[48px] rounded-[24px] bg-slate-300" />
                      </span>
                      <Skeleton className="w-[131px] h-[48px] rounded-[24px] bg-slate-300" />
                    </div>
                  </div>
                </CardHeader>
              </Card>{" "}
              <Card
                className={
                  "max-w-[730px] w-full mx-auto rounded mt-[24px] mb-[23px]"
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center justify-between w-full">
                      <CardTitle>
                        <Skeleton className="w-[100px] h-[70px] rounded-[24px] bg-slate-300 " />
                      </CardTitle>
                      <CardDescription>
                        <Skeleton className="w-[95px] h-[74px] rounded-[24px] bg-slate-300" />
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card className={"max-w-[730px] w-full mx-auto rounded"}>
                <CardHeader>
                  <div className="flex items-center justify-between ">
                    <CardTitle>
                      <Skeleton className="w-[120px] h-[47px] rounded-md bg-slate-300 " />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="w-[130px] h-[93px] rounded-md bg-slate-300" />
                    </CardDescription>
                    <span>
                      <Skeleton className="w-[160px] h-[47px] rounded-md bg-slate-300" />
                    </span>
                  </div>
                </CardHeader>
              </Card>
              <Card className={"max-w-[730px] w-full mx-auto rounded mt-[24px] mb-[24px]"}>
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
              <Card className={"max-w-[730px] w-full mx-auto rounded"}>
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
            </div>
          );
        })}
    </div>
  );
}
