import { FC } from "react";
import { BsShieldLock } from "react-icons/bs";
import {
    HiOutlineBolt,
    HiOutlineCodeBracket,
    HiOutlineCpuChip,
    HiOutlineCube,
    HiOutlineLockClosed,
    HiOutlineShieldCheck,
    HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import HomeCard from "./HomeCard";

const HomeCards: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-15 my-5">
            {/* Row 1 */}

            <HomeCard
                icon={HiOutlineWrenchScrewdriver}
                title="Active Development"
            >
                We are actively adding new features and fixing issues. We always
                welcome new feature requests or improvement ideas.
            </HomeCard>

            <HomeCard icon={HiOutlineCodeBracket} title="Free & Open Source">
                SudoBot is free and open source, respecting{" "}
                <a
                    className="link"
                    href="https://www.gnu.org/philosophy/free-sw.en.html"
                    target="_blank"
                    rel="noreferrer"
                >
                    your freedom
                </a>
                . It is licensed under{" "}
                <a
                    className="link"
                    href="https://www.gnu.org/licenses/agpl-3.0.en.html"
                    target="_blank"
                    rel="noreferrer"
                >
                    GNU Affero General Public License v3.0
                </a>
                .
            </HomeCard>

            <HomeCard icon={HiOutlineLockClosed} title="Secure">
                SudoBot is secure, and we always try our best to keep it secure.
                That&rsquo;s the power of open source.
            </HomeCard>

            <HomeCard icon={HiOutlineCpuChip} title="Self-hosted">
                Don&rsquo;t want to host the bot yourself? We have a solution
                for that as well &mdash; you can invite our self-hosted
                instance!
            </HomeCard>

            {/* Row 2 */}

            <HomeCard icon={HiOutlineShieldCheck} title="Smart Auto Moderation">
                SudoBot is smart enough to understand what will be the best to
                moderate your community. However, you can always customize the
                settngs.
            </HomeCard>

            <HomeCard icon={HiOutlineBolt} title="Powerful Manual Commands">
                SudoBot is packed with lots of different commands including the
                one&rsquo;s that can save you from headaches when moderating
                your Discord server.
            </HomeCard>

            <HomeCard icon={HiOutlineCube} title="Highly Customizable">
                SudoBot&rsquo;s configuration system was built in a way so that
                you can customize almost everything the bot does.
            </HomeCard>

            <HomeCard icon={BsShieldLock} title="Robust Permission System">
                SudoBot uses Hybrid Permission System &mdash; you get to choose
                one of the three possible modes. By default, it relies on
                Discord&rsquo;s permission system.
            </HomeCard>
        </div>
    );
};

export default HomeCards;
