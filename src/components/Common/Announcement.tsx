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
        <div className="z-[100000] block bg-[#000]">
            <div className="bg-[linear-gradient(to_right,#000,rgba(0,123,255,0.3))] py-2">
                <p className="text-center gradient-text font-bold">
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
    );
};

export default Announcement;
