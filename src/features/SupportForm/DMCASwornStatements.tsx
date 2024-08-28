import { Checkbox } from "@nextui-org/react";
import { type FC } from "react";

type DMCASwornStatementsProps = {
    onValueChange: (index: number, value: boolean) => void;
};

const DMCASwornStatements: FC<DMCASwornStatementsProps> = ({
    onValueChange,
}) => {
    return (
        <div>
            <Checkbox onValueChange={(value) => onValueChange(0, value)}>
                <span className="text-sm">
                    I have a good faith belief that the use of the material in
                    the manner complained of is not authorized by the copyright
                    owner, its agent, or the law.
                </span>
            </Checkbox>

            <Checkbox onValueChange={(value) => onValueChange(1, value)}>
                <span className="text-sm">
                    I swear, under penalty of perjury, that the information in
                    the notification is accurate, and that I am the owner of an
                    exclusive right that is allegedly infringed.
                </span>
            </Checkbox>

            <Checkbox onValueChange={(value) => onValueChange(2, value)}>
                <span className="text-sm">
                    I acknowledge that I may be liable for damages if I
                    knowingly materially misrepresent that material or activity
                    is infringing.
                </span>
            </Checkbox>
        </div>
    );
};

export default DMCASwornStatements;
