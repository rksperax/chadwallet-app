import { redirect } from "next/navigation";
import { DEFAULT_MINT } from "@/lib/constants";

export default function TradeIndex() {
  redirect(`/trade/${DEFAULT_MINT}`);
}
