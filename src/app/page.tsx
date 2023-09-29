import Footer from "@/components/Common/Footer";
import ReviewList from "@/components/Home/ReviewList";
import FeatureOverview from "../components/Home/FeatureOverview";
import Top from "../components/Home/Top";

export default function Home() {
    return (
        <>
            <main>
                <Top />
                <div className="mt-[20px] md:mt-[100px]"></div>
                <FeatureOverview />
                <br />
                <br />
                <br />
                <ReviewList />
            </main>

            <Footer />
        </>
    );
}
