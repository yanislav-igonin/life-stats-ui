import { DateTime } from "luxon";

export function formatDate(stringDate: string) {
  return DateTime.fromISO(stringDate).toLocaleString(DateTime.DATETIME_MED);
}