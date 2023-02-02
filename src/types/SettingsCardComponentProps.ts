import { UseFormRegister } from "react-hook-form";
import { AutoModFormFields } from "../pages/dashboard/automod";

export default interface SettingsCardComponentProps {
    register: UseFormRegister<AutoModFormFields>;
    errors: any;
}