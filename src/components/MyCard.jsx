import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import StatustBadge from "./ui/StatustBadge";
import { useNavigate } from "react-router-dom";

function MyCard({
  postCode = "RT3080",
  createdAt = "Due 01 Oct 2021",
  clientName = "John Morrison",
  total = "14,002.33",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`${id}`)}
      className={
        "border-3 border-transparent transition-all hover:border hover:border-purple-600 w-full mx-auto"
      }
    >
      <CardHeader>
        <div className="flex items-center  justify-between gap-1 flex-wrap">
          <div className="cards mr-auto">
            <CardTitle className={"font-bold text-2xl"}>
              <span className="text-[#7E88C3] ">#</span>
              {postCode}  
            </CardTitle>
            <span className="text-[#858BB2] text-left">Due {createdAt}</span>
            <span className="text-[#858BB2] hidden sm:block ">
              {clientName}
            </span>
          </div>
          <div className="cards">
            <span className="font-bold text-xl">£{total}</span>
            <StatustBadge status={status} />
          </div>
          <ArrowRight className="text-[#7C5DFA] cordArrow" />
        </div>
      </CardHeader>
    </Card>
  );
}

export default MyCard;
