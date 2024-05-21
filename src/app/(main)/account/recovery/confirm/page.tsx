import OTPInput from "@/components/Form/OTPInput";
import CenterContents from "@/components/Layout/CenterContents";

export default function Page() {
    return (
        <CenterContents className="py-10 md:py-20">
            <h1 className="text-2xl lg:text-4xl xl:text-5xl">Recovery</h1>
            <p className="mt-2 text-[#999]">Enter the code you received in your email to recover your account.</p>

            <br />

            <OTPInput digits={6} />
        </CenterContents>
    );
}
