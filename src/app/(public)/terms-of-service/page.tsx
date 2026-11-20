import { permanentRedirect } from "next/navigation";

export default function TermsOfServiceRedirect() {
  permanentRedirect("/terms-and-conditions");
}
