import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function queryGenerator(obj) {
  let result = "";
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      result += result.length ? `| ${key}` : `${key}`;
    }
  });
  return result;
}

export function prepareData(obj) {
  const senderAddressKey = "senderAddres-";
  const clientAddressKey = "clientAddress-";

  const senderAddress = {};
  const clientAddress = {};

  const result = {
    senderAddress,
    clientAddress,
  };

  for (const key in obj) {
    if (key.startsWith(senderAddressKey)) {
      senderAddress[key.replace(senderAddressKey, "")] = obj[key];
    } else if (key.startsWith(clientAddressKey)) {
      clientAddress[key.replace(clientAddressKey, "")] = obj[key];
    } else {
      result[key] = obj[key];
    }
  }

  if (Array.isArray(obj.items)) {
    const total = obj.items.reduce(
      (acc, item) => acc + (item.total || 0),
      0
    );
    result.total = total;
  }

  return result;
}
