import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { Label } from "../components/ui/label";
import { Input } from "./ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustend";
import { addInvoice, updateById } from "../request";
import { toast } from "sonner";
import { data, useNavigate } from "react-router-dom";

function Form({ info, setSheetOpen }) {
  const { setInvoices, items: zunstItems, UpdateInvoices } = useAppStore();
  const [items, setItems] = useState(info?.items || []);
  const navigate = useNavigate();

  const {
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    description,
    createdAt,
  } = info || {};

  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const result = {};
    if (!info) {
      result.status = e.nativeEvent.submitter.id;
    }

    formData.forEach((value, key) => {
      if (key === "quantity" || key === "price" || key === "paymentTerms") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });

    result.items = zunstItems;

    const readyData = prepareData(result);
    setSending({
      mode: e.nativeEvent.submitter.id === "edit" ? "edit" : "add",
      data: readyData,
    });
  }

  useEffect(() => {
    if (sending) {
      if (sending.mode === "add") {
        addInvoice(sending.data)
          .then((res) => {
            UpdateInvoices(res);
            setLoading(true);
            toast.success("Malumot muvoffaqiyatli qoshildi");
            setSheetOpen(false);
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      } else if (sending.mode === "edit") {
        updateById({ id: info.id, newData: sending.data })
          .then((res) => {
            UpdateInvoices(res);
            setLoading(true);
            toast.success("Malumot muvoffaqiyatli ozgartirildi");
            setSheetOpen(false);
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      }
    }
  }, [sending ? JSON.stringify(sending) : sending]);

  return (
    <div>
      <div>
        <h2 className="font-semibold text-2xl text-black mb-10">
          Add New Invoice
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="h-[90vh]  hide-scrollbar overflow-y-scroll py-6 px-2"
      >
        <div className="w-full">
          <h3 className="font-extralight text-[#7C5DFA] mb-10">Bill From</h3>
          <div className="flex flex-col gap-[24px] mb-[48px]">
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label htmlFor="senderAddres-street">Street Address</Label>
              <Input
                defaultValue={senderAddress?.street}
                className="w-full"
                name="senderAddres-street"
                type="text"
                id="senderAddres-street"
              />
            </div>
            <div className="flex items-center gap-[24px]">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="senderAddres-city">City</Label>
                <Input
                  defaultValue={senderAddress?.city}
                  className="w-full"
                  name="senderAddres-city"
                  type="text"
                  id="senderAddres-city"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="clientAddress-postCode">Post Code</Label>
                <Input
                  defaultValue={senderAddress?.postCode}
                  className="w-full"
                  name="clientAddress-postCode"
                  type="text"
                  id="clientAddress-postCode"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="senderAddres-country">Country</Label>
                <Input
                  defaultValue={senderAddress?.country}
                  className="w-full"
                  name="senderAddres-country"
                  type="text"
                  id="senderAddres-country"
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-[#7C5DFA] font-light my-10">Bill To</h3>
            <div className="flex flex-col gap-[24px]">
              <div className="grid w-full max-w-full items-center gap-1.5">
                <Label htmlFor="clientName">Client’s Name</Label>
                <Input
                  defaultValue={clientName}
                  className="w-full"
                  name="clientName"
                  type="text"
                  id="clientName"
                />
              </div>
              <div className="grid w-full max-w-full items-center gap-1.5 mb-[24px]">
                <Label htmlFor="clientEmail">Client’s Email</Label>
                <Input
                  defaultValue={clientEmail}
                  className="w-full"
                  name="clientEmail"
                  type="email"
                  id="clientEmail"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[24px] mb-[48px]">
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="clientAddress-street">Street Address</Label>
                <Input
                  defaultValue={clientAddress?.street}
                  className="w-full"
                  name="clientAddress-street"
                  type="text"
                  id="clientAddress-street"
                />
              </div>
              <div className="flex items-center gap-[24px]">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="clientAddress-city">City</Label>
                  <Input
                    defaultValue={clientAddress?.city}
                    className="w-full"
                    name="clientAddress-city"
                    type="text"
                    id="clientAddress-city"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="clientAddress-postCode">Post Code</Label>
                  <Input
                    defaultValue={clientAddress?.postCode}
                    className="w-full"
                    name="clientAddress-postCode"
                    type="text"
                    id="clientAddress-postCode"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="clientAddress-country">Country</Label>
                  <Input
                    defaultValue={clientAddress?.country}
                    className="w-full"
                    name="clientAddress-country"
                    type="text"
                    id="clientAddress-country"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[24px] mx-auto max-w-full">
          <div className="flex items-end w-full gap-[24px] mb-10">
            <div className="w-1/2">
              <Label htmlFor="createdAt">Invoice Date</Label>
              <Input
                className="w-full mt-[8px]"
                defaultValue={createdAt}
                name="createdAt"
                type="date"
                id="createdAt"
              />
            </div>
            <Select name="paymentTerms" defaultValue={paymentTerms?.toString()}>
              <SelectTrigger className="w-1/2 ">
                <SelectValue placeholder="Payment Terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Net 1 Day</SelectItem>
                  <SelectItem value="7">Net 7 Days</SelectItem>
                  <SelectItem value="14">Net 14 Days</SelectItem>
                  <SelectItem value="30">Net 30 Days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <div className="w-full flex flex-col gap-[10px] mb-10">
              <Label htmlFor="description">Project Description</Label>
              <Input
                defaultValue={description}
                className="w-full"
                name="description"
                type="text"
                id="description"
              />
            </div>
          </div>
        </div>

        <ItemList info={items} onItemsChange={setItems} />

        <div>
          {info ? (
            <div className="flex justify-end items-center gap-[8px] mt-10">
              <Button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="rounded-2xl hover:opacity-65 bg-gray-300 p-4 sm:p-6"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                id="edit"
                type="submit"
                className="bg-[#7C5DFA] hover:bg-purple-500 rounded-2xl p-4 md:p-6 cursor-pointer"
                variant="default"
              >
                {loading ? "Loading..." : "Save Changes"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-between items-center gap-[8px] mb-[34px] mt-[39px]">
              <Button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="rounded-2xl hover:opacity-65 bg-gray-300  p-4 sm:p-6"
                variant="outline"
              >
                Discard
              </Button>
              <div className="flex items-center gap-[8px]">
                <Button
                  disabled={loading}
                  id="draft"
                  type="submit"
                  className="p-4 sm:p-6 bg-gray-700 hover:bg-gray-500 rounded-2xl text-white cursor-pointer"
                  variant="secondary"
                >
                  {loading ? "Loading.." : "Save as Draft"}
                </Button>
                <Button
                  disabled={loading}
                  id="pending"
                  type="submit"
                  className="bg-[#7C5DFA] hover:bg-purple-500 rounded-2xl p-4 md:p-6 cursor-pointer"
                  variant="default"
                >
                  {loading ? "Loading..." : "Save & Send"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
