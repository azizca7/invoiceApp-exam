import { buttonVariants } from "./button";

export default function StatusBadge({ status = "draft" }) {
  const statusStyles = {
    draft: {
      dote: "bg-[rgba(55,59,83,1)]",
      text: "text-[#373B53]",
      bg: "rgba(55,59,83,0.05)",
    },
    paid: {
      dote: "bg-[rgba(51,214,159,1)]",
      text: "text-[#33D69F]",
      bg: "rgba(51,214,159,0.05)",
    },
    pending: {
      dote: "bg-[rgba(255,143,0,1)]",
      text: "text-[#FF8F00]",
      bg: "rgba(255,143,0,0.05)",
    },
  };

  const currentStyle = statusStyles[status] || statusStyles["draft"];

  return (
    <span
      className={`px-4 py-2 w-28 rounded-md flex items-center gap-2  font-bold`}
      style={{ backgroundColor: currentStyle.bg }}
    >
      <span className={`w-2 h-2 rounded-full ${currentStyle.dote}`} />
      <span className={`capitalize ${currentStyle.text}`}>{status}</span>
    </span>
  );
}
