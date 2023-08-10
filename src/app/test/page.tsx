import { wait } from "@/utils/utils";
import { FC } from "react";

const Test: FC = async () => {
    await wait(4000);
    return <div>Content</div>;
};

export default Test;
