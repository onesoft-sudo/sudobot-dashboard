import { Button, Spacer } from "@nextui-org/react";
import { ComponentProps } from "react";

const SubmitButton = (props: ComponentProps<typeof Button>) => {
    return (
        <>
            <Spacer y={5} />
            <Button type="submit" variant="flat" fullWidth {...props}>
                Submit
            </Button>
        </>
    );
};

export default SubmitButton;
