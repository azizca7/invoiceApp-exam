import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, updateById } from "../request";
import { useState, useEffect } from "react";
import StatusBadge from "../components/ui/StatustBadge";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import DetailsSkleton from "../components/ui/DetailsSketon";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustend";
import { IconLeft } from "react-day-picker";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSheetOpen, setEditedData, UpdateInvoices } = useAppStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const reducer = invoice.items?.reduce((acc, curVal) => {
    return acc + Number(curVal.quantity) * Number(curVal.price);
  }, 0);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.dataset.theme = theme;
    setIsDarkMode(theme === "dark");
  }, []);

  useEffect(() => {
    setLoading(true);
    getInvoice(id)
      .then((res) => {
        setInvoice(res);
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById({ id })
      .then(() => {
        toast.success("Invoice deleted successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  function handleUpdate(id, data) {
    setUpdateLoading(true);
    updateById({ id, newData: data })
      .then((res) => {
        UpdateInvoices(res);
        toast.success("Invoice updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  }

 function handleEdit(data) {
    const invoiceCopy = JSON.parse(JSON.stringify(data));
    setEditedData(invoiceCopy);
    setSheetOpen(true);
    
  }

  if (loading) {
    return (
      <div className={`min-h-screen transition-all duration-300`}>
        <DetailsSkleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen transition-all duration-300`}>
        <p className="text-red-500 text-center mt-40">{error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 `}>
      <div className="max-w-3xl mx-auto px-6 py-8 md:py-16">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-3 mb-8 text-sm font-medium hover:text-[#7e88c3] transition-colors`}
        >
          <IconLeft />
          Go back
        </button>

        <div
          className={`rounded-lg p-6 mb-6 flex flex-wrap justify-between items-center gap-4  shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]`}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <h2 className="text-[#858BB2]">Status</h2>
            <StatusBadge status={invoice.status} />
          </div>

          <div className="hidden sm:flex gap-2">
            <Button
              variant="secondary"
              onClick={() => handleEdit(invoice)}
              className={`rounded-full font-bold `}
            >
              Edit
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-full font-bold bg-[#ec5757] hover:bg-[#ff9797]"
                >
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete invoice #{invoice.id}? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                  <DialogClose>Cancel</DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(invoice.id)}
                    disabled={deleteLoading}
                    className="rounded-full font-bold bg-[#ec5757] hover:bg-[#ff9797]"
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {invoice.status === "pending" && (
              <Button
                onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                disabled={updateLoading}
                className="bg-[#7c5dfa] hover:bg-[#9277ff] rounded-full font-bold"
              >
                {updateLoading ? "Updating..." : "Mark as Paid"}
              </Button>
            )}
          </div>
        </div>

        <div
          className={`rounded-lg p-8 mb-6 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)]`}
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
              <p>{invoice.senderAddress?.street}</p>
              <p>{invoice.senderAddress?.city}</p>
              <p>{invoice.senderAddress?.postCode}</p>
              <p>{invoice.senderAddress?.country}</p>
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
                {invoice.clientAddress?.street}
              </p>
              <p className="text-sm text-[#7e88c3]">
                {invoice.clientAddress?.city}
              </p>
              <p className="text-sm text-[#7e88c3]">
                {invoice.clientAddress?.postCode}
              </p>
              <p className="text-sm text-[#7e88c3]">
                {invoice.clientAddress?.country}
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm text-[#7e88c3] mb-3">Sent to</p>
              <p className="font-bold text-lg break-words">
                {invoice.clientEmail}
              </p>
            </div>
          </div>

          <div className={`rounded-t-lg p-8`}>
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
                  {invoice.items?.map((item, index) => (
                    <tr key={index} className="text-lg font-bold">
                      <td className="py-4">{item.name}</td>
                      <td className="text-center text-[#7e88c3]">
                        {item.quantity}
                      </td>
                      <td className="text-right text-[#7e88c3]">
                        £ {item.price.toFixed(2)}
                      </td>
                      <td className="text-right">
                        £ {(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-6">
              {invoice.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-[#7e88c3]">
                      {item.quantity} x £ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold">
                    £ {(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`flex justify-between items-center px-8 py-6 rounded-b-lg bg-[#373b53]  text-white`}
          >
            <span>Amount Due</span>
            <span className="text-2xl font-bold">£ {reducer?.toFixed(2)}</span>
          </div>
        </div>

        <div
          className={`sm:hidden fixed bottom-0 inset-x-0 p-6 flex justify-between items-center gap-3 shadow-[0_-10px_10px_-10px_rgba(72,84,159,0.1)]`}
        >
          <Button
            onClick={() => handleEdit(invoice)}
            className={`rounded-full font-bold `}
          >
            Edit
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="rounded-full font-bold bg-[#ec5757] hover:bg-[#ff9797]"
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete invoice #{invoice.id}? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <DialogClose>Cancel</DialogClose>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(invoice.id)}
                  disabled={deleteLoading}
                  className="rounded-full font-bold bg-[#ec5757] hover:bg-[#ff9797]"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {invoice.status === "pending" && (
            <Button
              onClick={() => handleUpdate(invoice.id, { status: "paid" })}
              disabled={updateLoading}
              className="bg-[#7c5dfa] hover:bg-[#9277ff] rounded-full font-bold"
            >
              {updateLoading ? "Updating..." : "Mark as Paid"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
