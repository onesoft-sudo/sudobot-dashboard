import { FC } from "react";
import { MdArrowRight } from "react-icons/md";

interface VerificationMethodProps {
    name: string;
    description: string;
    icon: FC;
}

export default function VerificationMethod({
    name,
    description,
    icon: Icon,
}: VerificationMethodProps) {
    return (
        <a href="#">
            <span>
                <h2 className="flex gap-2 items-center">
                    <span className="block p-1 bg-[#333] rounded-lg">
                        <Icon />
                    </span>{" "}
                    <span>{name}</span>
                </h2>
                <p>{description}</p>
            </span>
            <span>
                <MdArrowRight size={20} />
            </span>
        </a>
    );
}
