import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InvoiceForm from "../components/InvoiceForm";

export default function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, updateInvoice, deleteInvoice, isDarkMode } = useStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  const handleDelete = () => {
    deleteInvoice(id);
    navigate("/");
  };

  const handleStatusChange = (newStatus) => {
    updateInvoice(id, { status: newStatus });
  };

  if (!invoice)
    return (
      <div
        className={`text-center mt-40 text-2xl ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Invoice not found
      </div>
    );

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode ? "bg-[#141625] text-white" : "bg-[#f8f8fb] text-[#0c0e16]"
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 py-8 md:py-16">
        
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-3 mb-8 text-sm font-medium ${
            isDarkMode ? "text-white" : "text-[#0c0e16]"
          } hover:text-[#7e88c3] transition-colors`}
        >
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.342.886L2.114 5.114l4.228 4.228"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          Go back
        </button>

        <div
          className={`rounded-lg p-6 mb-6 flex flex-wrap justify-between items-center gap-4 ${
            isDarkMode ? "bg-[#1e2139]" : "bg-white"
          } shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]`}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <h2 className="text-[#858BB2]">Status</h2>
            <div
              className={`px-4 py-3 rounded-md text-sm font-bold flex items-center gap-2 capitalize ${
                invoice.status === "paid"
                  ? "bg-[#33d69f0f] text-[#33d69f]"
                  : invoice.status === "pending"
                  ? "bg-[#ff8f000f] text-[#ff8f00]"
                  : "bg-[#dfe3fa0f] text-[#dfe3fa]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  invoice.status === "paid"
                    ? "bg-[#33d69f]"
                    : invoice.status === "pending"
                    ? "bg-[#ff8f00]"
                    : "bg-[#dfe3fa]"
                }`}
              ></span>
              {invoice.status}
            </div>
          </div>

          <div className="hidden sm:flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsEditMode(true)}
              className={`rounded-full font-bold ${
                isDarkMode
                  ? "bg-[#252945] text-[#dfe3fa] hover:bg-[#1e2139]"
                  : "bg-[#f9fafe] text-[#7e88c3] hover:bg-[#dfe3fa]"
              }`}
            >
              Edit
            </Button>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-full font-bold bg-[#ec5757] hover:bg-[#ff9797]"
                >
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent
                className={`${
                  isDarkMode ? "bg-[#1e2139] text-white" : ""
                } p-12`}
              >
                <DialogHeader>
                  <DialogTitle
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-[#0c0e16]"
                    }`}
                  >
                    Confirm Deletion
                  </DialogTitle>
                </DialogHeader>
                <p className={`py-4 text-[#888eb0]`}>
                  Are you sure you want to delete invoice #{id}? This action
                  cannot be undone.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setShowDeleteDialog(false)}
                    className={`rounded-full font-bold ${
                      isDarkMode
                        ? "bg-[#252945] text-[#dfe3fa] hover:bg-[#1e2139]"
                        : "bg-[#f9fafe] text-[#7e88c3] hover:bg-[#dfe3fa]"
                    }`}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="rounded-full font-bold bg-[#ec5757] hover:bg-[#ff9797]"
                  >
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {invoice.status === "pending" && (
              <Button
                onClick={() => handleStatusChange("paid")}
                className="bg-[#7c5dfa] hover:bg-[#9277ff] rounded-full font-bold"
              >
                Mark as Paid
              </Button>
            )}
          </div>
        </div>

        <div
          className={`rounded-lg p-8 mb-6 ${
            isDarkMode ? "bg-[#1e2139]" : "bg-white"
          } shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]`}
        >
          <div className="flex flex-wrap justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold mb-2">
                <span className="text-[#7e88c3]">#</span>
                {invoice.id}
              </h1>
              <p className="text-[#7e88c3]">{invoice.description}</p>
            </div>
            <div className="text-sm text-[#7e88c3] text-right mt-6 md:mt-0">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-8">
              <div>
                <p className="text-sm text-[#7e88c3] mb-3">Invoice Date</p>
                <p className="font-bold text-lg">{invoice.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-[#7e88c3] mb-3">Payment Due</p>
                <p className="font-bold text-lg">{invoice.paymentDue}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#7e88c3] mb-3">Bill To</p>
              <p className="font-bold text-lg mb-2">{invoice.clientName}</p>
              <p className="text-sm text-[#7e88c3]">
                {invoice.clientAddress.street}
              </p>
              <p className="text-sm text-[#7e88c3]">
                {invoice.clientAddress.city}
              </p>
              <p className="text-sm text-[#7e88c3]">
                {invoice.clientAddress.postCode}
              </p>
              <p className="text-sm text-[#7e88c3]">
                {invoice.clientAddress.country}
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm text-[#7e88c3] mb-3">Sent to</p>
              <p className="font-bold text-lg break-words">
                {invoice.clientEmail}
              </p>
            </div>
          </div>
          <div
            className={`rounded-t-lg p-8 ${
              isDarkMode ? "bg-[#252945]" : "bg-[#f9fafe]"
            }`}
          >
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[#7e88c3]">
                    <th className="pb-8 font-normal text-sm">Item Name</th>
                    <th className="pb-8 font-normal text-sm text-center">
                      QTY.
                    </th>
                    <th className="pb-8 font-normal text-sm text-right">
                      Price
                    </th>
                    <th className="pb-8 font-normal text-sm text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="text-lg font-bold">
                      <td className="py-4">{item.name}</td>
                      <td className="text-center text-[#7e88c3]">
                        {item.quantity}
                      </td>
                      <td className="text-right text-[#7e88c3]">
                        £ {item.price.toFixed(2)}
                      </td>
                      <td className="text-right">£ {item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-6">
              {invoice.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-[#7e88c3]">
                      {item.quantity} x £ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold">£ {item.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`flex justify-between items-center px-8 py-6 rounded-b-lg ${
              isDarkMode ? "bg-[#0c0e16]" : "bg-[#373b53]"
            } text-white`}
          >
            <span className="text-sm">Amount Due</span>
            <span className="text-2xl font-bold">
              £ {invoice.total.toFixed(2)}
            </span>
          </div>
        </div>

        <div
          className={`sm:hidden fixed bottom-0 inset-x-0 p-6 flex justify-between items-center gap-3 ${
            isDarkMode ? "bg-[#1e2139]" : "bg-white"
          } shadow-[0_-10px_10px_-10px_rgba(72,84,159,0.1)]`}
        >
          <Button
            onClick={() => setIsEditMode(true)}
            className={`rounded-full font-bold ${
              isDarkMode
                ? "bg-[#252945] text-[#dfe3fa] hover:bg-[#1e2139]"
                : "bg-[#f9fafe] text-[#7e88c3] hover:bg-[#dfe3fa]"
            }`}
          >
            Edit
          </Button>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="rounded-full font-bold bg-[#ec5757] hover:bg-[#ff9797]"
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent
              className={`${isDarkMode ? "bg-[#1e2139] text-white" : ""} p-12`}
            >
              <DialogHeader>
                <DialogTitle
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-[#0c0e16]"
                  }`}
                >
                  Confirm Deletion
                </DialogTitle>
              </DialogHeader>
              <p className={`py-4 text-[#888eb0]`}>
                Are you sure you want to delete invoice #{id}? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteDialog(false)}
                  className={`rounded-full font-bold ${
                    isDarkMode
                      ? "bg-[#252945] text-[#dfe3fa] hover:bg-[#1e2139]"
                      : "bg-[#f9fafe] text-[#7e88c3] hover:bg-[#dfe3fa]"
                  }`}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="rounded-full font-bold bg-[#ec5757] hover:bg-[#ff9797]"
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {invoice.status === "pending" && (
            <Button
              onClick={() => handleStatusChange("paid")}
              className="bg-[#7c5dfa] hover:bg-[#9277ff] rounded-full font-bold"
            >
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {isEditMode && (
        <InvoiceForm
          invoice={invoice}
          isOpen={isEditMode}
          onClose={() => setIsEditMode(false)}
          onSave={(updatedInvoice) => {
            updateInvoice(id, updatedInvoice);
            setIsEditMode(false);
          }}
        />
      )}
    </div>
  );
}
