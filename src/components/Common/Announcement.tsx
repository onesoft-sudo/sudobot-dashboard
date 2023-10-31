import { BOT_GITHUB_REPO_URL } from "@/utils/links";
import { FC } from "react";
import { MdTipsAndUpdates } from "react-icons/md";

interface AnnouncementProps {
    show?: boolean;
}

const Announcement: FC<AnnouncementProps> = ({ show = false }) => {
    if (!show) {
        return <></>;
    }

    return (
        <div className="pb-[20px]">
            <div className="z-[1] md:z-[10000] relative block bg-[linear-gradient(to_right,#000,rgba(0,123,255,0.3))] [border-bottom:1px_solid_#444]">
                <div className="py-2 px-2">
                    <p className="text-center gradient-text font-normal">
                        <MdTipsAndUpdates
                            className="inline mr-2 text-[#007bff]"
                            size={20}
                        />{" "}
                        We&rsquo;re celebrating 2,000 commits in{" "}
                        <a className="link" href={BOT_GITHUB_REPO_URL}>
                            SudoBot&rsquo;s GitHub Repository
                        </a>
                        !
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
