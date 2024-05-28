import { useCurrentUser } from "@/hooks/user";
import { Button } from "@nextui-org/button";
import { ComponentProps, type FC } from "react";
import GuildSwitcher from "./GuildSwitcher";
import Link from "./Link";
import Profile from "./Profile";

const Controls: FC<ComponentProps<"div">> = (props) => {
    const user = useCurrentUser(false);

    return (
        <div {...props}>
            {!user && (
                <Button color="primary" variant="flat" as={Link} href="/login" className="hidden lg:flex">
                    Login
                </Button>
            )}

            {!user && <div className="w-10 lg:hidden" />}

            {user && (
                <div className="flex items-center gap-3">
                    <div className="hidden lg:block">
                        <GuildSwitcher />
                    </div>
                    <div>
                        <Profile />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Controls;
