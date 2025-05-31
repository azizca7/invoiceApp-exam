import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    fillter: "",
    invoices: [],
    thmems: ["violet", "dark-violet"],
    items: [],
    sheetOpen: false,
  editedData: null,
setEditedData(editedData) {
  return set(() => {
    return { editedData };
  });
    },
    setSheetOpen() {
      return set((state) => {
        return { sheetOpen: !state.sheetOpen };
      });
    },
    setInvoices(invoices) {
      return set(() => {
        return { invoices };
      });
    },

    UpdateInvoices(newData) {
      return set((state) => {
        const mapped = state.invoices.map((el) => {
          if (el.id === newData.id) {
            return newData;
          } else {
            return el;
          }
        });
        return { invoices: mapped };
      });
    },
    setFilter(value) {
      return set(() => {
        return { fillter: value };
      });
    },
    setItems(items) {
      return set(() => {
        return { items };
      });
    },
  };
});
