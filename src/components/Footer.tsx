import Link from "next/link";
import { discordInvite, privacy, terms } from "../utils/links";

export default function Footer() {
    return (
        <div className="bg-[#222] px-5 lg:px-[18%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="mr-10 pt-2 pb-5 order-last md:order-first">
                <a href="https://www.onesoftnet.eu.org" target="_blank" rel="noreferrer" className="text-white no-underline text-2xl md:text-3xl">
                    <img src="https://res.cloudinary.com/rakinar2/image/upload/v1667559622/OSN-Logo_bjp4gk.png" height="auto" width="100%" alt="OneSoftNet" />
                </a>
                <p>Copyright &copy; OneSoftNet, Inc. 2020-{new Date().getFullYear()} and all contributors.</p>
            </div>
            <div className="py-5">
                <h3>Contact</h3>

                <ul className="list-none mt-3">
                    <li><a href="mailto:sudobot@onesoftnet.eu.org">Email</a></li>
                    <li><a href="mailto:rakinar2@onesoftnet.eu.org">Email (Webmaster)</a></li>
                    <li><a target="_blank" rel="noreferrer" href={discordInvite}>Discord Server</a></li>
                </ul>
            </div>
            <div className="py-5">
                <h3>About</h3>

                <ul className="list-none mt-3">
                    <li><Link href="/about">About SudoBot</Link></li>
                    <li><a target="_blank" rel="noreferrer" href="https://github.com/onesoft-sudo/sudobot">GitHub</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://github.com/onesoft-sudo/sudobot/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D">Report a bug</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://github.com/onesoft-sudo/sudobot/graphs/contributors">Contributors</a></li>
                </ul>
            </div>
            <div className="py-5">
                <h3>Useful Links</h3>

                <ul className="list-none mt-3">
                    <li><a target="_blank" rel="noreferrer" href={terms}>Terms of Service</a></li>
                    <li><a target="_blank" rel="noreferrer" href={privacy}>Privacy Policy</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://docs.sudobot.onesoftnet.eu.org/">Documentation</a></li>
                </ul>
            </div>
        </div>
    );
}