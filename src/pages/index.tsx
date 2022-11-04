import ThemeButton from '../components/ThemeButton';
import styles from '../css/Home.module.css';
import { githubRepo } from '../utils/links';

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
                        
            <div style={{ padding: 50 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti cumque, fugiat necessitatibus ipsam ad in quam alias magnam nam ipsum deserunt officia perferendis possimus rem sint id incidunt exercitationem officiis.
            </div>
        </div>
    );
}
