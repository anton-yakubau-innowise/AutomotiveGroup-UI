import { useState } from "react";
import { createInquiry } from "../api";
import { CreateInquiryPayload } from "../types";

export function useInquiries() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitInquiry = async (payload: CreateInquiryPayload) => {
    setIsSubmitting(true);
    try {
      await createInquiry(payload);
      return { success: true };
    } catch (error) {
      console.error("Inquiry submission failed in hook:", error);
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitInquiry, isSubmitting };
}
