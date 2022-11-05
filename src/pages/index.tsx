import ThemeButton from '../components/ThemeButton';
import styles from '../css/Home.module.css';
import { discordInvite, githubRepo, privacy } from '../utils/links';
import { HiCodeBracket, HiCube, HiShieldCheck, HiWrenchScrewdriver } from 'react-icons/hi2';

export default function Home() {
    return (
        <div>
            <div className={styles.wrapper}>
                <h1 className='text-2xl md:text-4xl lg:text-5xl text-center md:px-[25%] !leading-[2.5ch] mt-3'>A single bot for <span className="text-blue-500">everything you need</span> to <span className="text-blue-500">moderate</span> a Discord Server.</h1>
                <h3 className="text-center text-xl md:text-2xl lg:text-3xl mt-5">It's <span className='text-blue-500'>SudoBot</span>. The ultimate solution for Discord Server Moderation.</h3>

                <br />
                <br />
            
                <div className='text-center mx-5 ml-0'>
                    <ThemeButton className='px-3 md:px-5 py-2 md:py-3 w-[100%] md:w-auto block md:inline-block mx-3 mb-3 md:mb-0' size='large' variant='outlined'>Get SudoBot</ThemeButton>
                    <a href={`${githubRepo}/releases/latest`} target="_blank" rel='noreferrer'><ThemeButton className='px-3 md:px-5 py-2 md:py-3 w-[100%] md:w-auto block md:inline-block mx-3' size='large' variant='outlined'>Download Latest Release</ThemeButton></a>
                </div>
            </div>
                        
            <div className='p-3 pb-5 md:px-[15%] md:py-10'>
                <h2 className='mb-5'>Features</h2>

                <div className={`${styles.features} grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4`}>
                    <div>
                        <div>
                            <h3>Auto Moderation</h3>
                            <p>SudoBot has auto moderation tools like Anti-Raid, Anti-Spam, and Message Filter Rules that can save you from headaches.</p>
                        </div>
                        <div>
                            <HiCube aria-hidden="true" /> 
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>Manual Moderation Tools</h3>
                            <p>It also has a collection of useful moderation utilities.</p>
                        </div>
                        <div>
                            <HiWrenchScrewdriver aria-hidden="true" /> 
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>Open Source &amp; Active Development</h3>
                            <p>SudoBot is open source &mdash; feel free to make changes to the source code! Also collaborations are welcome!</p>
                        </div>
                        <div>
                            <HiCodeBracket aria-hidden="true" /> 
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>Secure</h3>
                            <p>SudoBot is built to provide better security to your Discord Server. Also, we keep your data secure. <a href={privacy}>Learn more</a>.</p>
                        </div>
                        <div>
                            <HiShieldCheck aria-hidden="true" /> 
                        </div>
                    </div>
                </div>

                <br />

                <div>
                    <h2>Active Support</h2>
                    <br />
                    <p>The support team of SudoBot is always waiting to help you &mdash; you can email us at <a href="mailto:support@onesoftnet.eu.org">support@onesoftnet.eu.org</a> or join our <a href={discordInvite}>Discord Server</a>.</p>
                </div>
            </div>
        </div>
    );
}
