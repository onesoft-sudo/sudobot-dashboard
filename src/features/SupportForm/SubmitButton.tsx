import { Button, Spacer } from "@nextui-org/react";

const SubmitButton = () => {
    return (
        <>
            <Spacer y={5} />
            <Button type="submit" variant="flat" fullWidth>
                Submit
            </Button>
        </>
    );
};

export default SubmitButton;
