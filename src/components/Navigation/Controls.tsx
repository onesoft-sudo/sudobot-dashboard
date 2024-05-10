import { useCurrentUser } from "@/hooks/user";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ComponentProps, type FC } from "react";
import GuildSwitcher from "./GuildSwitcher";
import Profile from "./Profile";

const Controls: FC<ComponentProps<"div">> = (props) => {
    const user = useCurrentUser();

    return (
        <div {...props}>
            {!user && (
                <Button color="primary" variant="flat" as={Link} href="/login" className="hidden md:flex">
                    Login
                </Button>
            )}

            {!user && <div className="w-10 md:hidden" />}

            {user && (
                <div className="flex items-center gap-3">
                    <div className="hidden md:block">
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
