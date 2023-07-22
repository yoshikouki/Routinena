import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

export function getRelativeDate(date: Date) {
  return formatDistanceToNow(date, { addSuffix: true, locale: ja });
}
