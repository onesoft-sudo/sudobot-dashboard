import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-[#222] p-5 lg:px-[20%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="pr-5 md:order-last">
                <a href="https://www.onesoftnet.eu.org" target="_blank" rel="noreferrer" className="text-white no-underline text-2xl md:text-3xl">
                    <img src="https://res.cloudinary.com/rakinar2/image/upload/v1667559622/OSN-Logo_bjp4gk.png" height="auto" width="100%" alt="OneSoftNet" />
                </a>
                <p>Copyright &copy; OneSoftNet, Inc. 2020-{new Date().getFullYear()} and all contributors.</p>
            </div>
            <div>
                <h3>Contact</h3>

                <ul className="list-none mt-3">
                    <li><a href="mailto:sudobot@onesoftnet.eu.org">Email</a></li>
                    <li><a href="mailto:rakinar2@onesoftnet.eu.org">Email (Webmaster)</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://discord.gg/892GWhTzgs">Discord Server</a></li>
                </ul>
            </div>
            <div>
                <h3>About</h3>

                <ul className="list-none mt-3">
                    <li><Link href="/about">About SudoBot</Link></li>
                    <li><a target="_blank" rel="noreferrer" href="https://github.com/onesoft-sudo/sudobot">GitHub</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://github.com/onesoft-sudo/sudobot/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D">Report a bug</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://github.com/onesoft-sudo/sudobot/graphs/contributors">Contributors</a></li>
                </ul>
            </div>
            <div>
                <h3>Useful Links</h3>

                <ul className="list-none mt-3">
                    <li><a target="_blank" rel="noreferrer" href="https://docs.onesoftnet.eu.org/legal/terms.md">Terms of Service</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://docs.onesoftnet.eu.org/legal/policy.md">Privacy Policy</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://docs.onesoftnet.eu.org/">Documentation</a></li>
                </ul>
            </div>
        </div>
    );
}