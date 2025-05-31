import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { queryGenerator } from "../lib/utils";
import { ArrowBigDown, ArrowDown, Plus, PlusCircle } from "lucide-react";
import { useAppStore } from "../lib/zustend";

function Header() {
  const { setSheetOpen, invoices, setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    Paid: false,
    Pending: false,
  });

  function handleChange(key) {
    setItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [items, setFilter]);

  return (
    <header className="base_container">
      <div className="max-w-[730px] w-full mx-auto flex items-center justify-between py-[75px]">
        <div>
          <h1 className="font-bold text-2xl">Invoices</h1>
          <p className="text-gray-500 mt-2">
            There are {invoices?.length} total invoices
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-[16px] font-bold rounded-lg outline-none cursor-pointer"
              >
                Filter by status <ArrowDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="text-[16px]">Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-3 px-2 py-1">
                {Object.entries(items).map(([key, value]) => (
                  <label
                    key={key}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} justify-start capitalize flex items-center gap-2 text-[16px] cursor-pointer`}
                    htmlFor={key}
                  >
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => handleChange(key)}
                    />
                    {key}
                  </label>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className=" md:py-6 rounded-full hover:bg-purple-500 font-bold flex items-center gap-2"
            onClick={setSheetOpen}
          >
            <span className="md:h-8 md:w-8 h-6 w-6 rounded-full bg-white text-purple-600 flex items-center justify-center">
              +
            </span>
            New <span className="hidden sm:block"> Invoice</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
