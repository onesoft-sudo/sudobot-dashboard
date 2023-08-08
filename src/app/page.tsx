import Footer from "@/components/Common/Footer";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import Top from "../components/Common/Top";
import FeatureOverview from "../components/Home/FeatureOverview";

export default function Home() {
    const { user } = useAuthWithCheck();

    if (user === undefined) {
        return <div></div>;
    }

    return (
        <>
            <main>
                <Top />
                <div style={{ marginTop: "100px" }}></div>
                <FeatureOverview />
                <br />
                <br />
                <br />
            </main>

            <Footer />
        </>
    );
}
