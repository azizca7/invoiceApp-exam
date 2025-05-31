import React from "react";
import ThemesDrop from "../ThemesDrop";
import { useAppStore } from "../../lib/zustend";
import Form from "../Form";
import { Sheet, SheetContent } from "../ui/sheet";

function Sidebar() {
  const { setSheetOpen, sheetOpen, editedData } = useAppStore();
  return (
    <>
      <div className="bg-[#373B53] flex md:flex-col justify-between items-center   rounded-r-3xl ">
        <img className="" src="./image/Icon.svg" alt="icon" />

        <div
          id="sideBar_right"
          className="flex md:flex-col items-center gap-[24px] md:gap-[37px] md:items-center md:justify-end md:w-full mr-[35px] mx-auto"
        >
          <ThemesDrop />
          <hr className="w-full bg-[#494E6E] border-0 text-[#494E6E] h-1 hidden md:block" />
          <img
            className="md:mb-[24px]"
            src="./image/Avatar.svg"
            alt="Avatar"
            width={40}
            height={40}
          />
        </div>
      </div>

      <Sheet
        className="form__container"
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      >
        <SheetContent
          side="left"
          className={
            "md:ml-[104px] lg:min-w-[calc(60%-70px)] md:min-w-[calc(77%-70px)] modalCss flex- flex-col items-center "
          }
        >
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Sidebar;
