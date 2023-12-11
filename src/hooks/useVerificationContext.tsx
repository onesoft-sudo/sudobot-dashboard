"use client";

import { VerificationWizardContext } from "@/contexts/VerificationWizardContext";
import { useContext } from "react";

export default function useVerificationContext() {
    return useContext(VerificationWizardContext)!;
}
