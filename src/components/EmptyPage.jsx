import React from "react";

function EmptyPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img src="./image/EmptyPageImg.svg" alt="EmptyImg"width={241} height={200} />
        <div>
          <h1 className="mt-[64px] mb-[24px] text-center  text-[#0C0E16] text-[20px]">There is nothing here</h1>
          <p className="text-center max-w-[220px] text-[12px] text-[#888EB0]">
           
            Create an invoice by clicking the New Invoice button and get started
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyPage;
