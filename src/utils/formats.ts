import dayjs from "dayjs";
import { patternFormatter } from "react-number-format";

export const phoneFormat = /^(([0-9]){9})$/;
export const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const formatDate = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY");
};

export const formatMinutes = (minutes: number) => {
  return String(minutes).padStart(2, "0");
};

export const formatSeconds = (seconds: number) => {
  return String(seconds).padStart(2, "0");
};

export const formatPhoneNumber = (phone: string) => {
  return `+994 ${patternFormatter(phone, {
    format: "## ### ## ##",
    mask: "_",
  })}`;
};

export const formatSum = (sum: number) => `${Number(sum.toFixed(2))} ₼`;
