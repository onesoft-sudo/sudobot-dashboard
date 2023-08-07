import FeatureOverview from "./FeatureOverview";
import Top from "./Top";

export default function Home() {
    return (
        <main>
            <Top />
            <div style={{ marginTop: "100px" }}></div>
            <FeatureOverview />
            <br />
            <br />
            <br />
        </main>
    );
}
