import { FormikErrors } from "formik";
import { ReactNode } from "react";

type PcType =
  | "Notebook"
  | "Desktop"
  | "Ultrabook"
  | "Gaming PC"
  | "Tablet PC / Hybrid";

interface WizardStep {
  title: string;
  content: ReactNode;
  isCompleted?: (errors: FormikErrors<any>) => boolean;
}

interface DeviceFormInterface {
  pc_type?: PcType;
  manufacturer?: string;
  model?: string;
  device?: number | PcType;
  device_type: number /*0 | 1 | 2 | 3 | 4 | 5*/; // 0 smartphone, 1 tablet, 2 pc, 3 console, 4 smartwatch,  5 smartTv
  operating_system_platform: string;
  operating_system_version: string;
  operating_system_id: string | number;
}
