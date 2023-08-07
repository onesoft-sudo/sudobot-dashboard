import { FC } from "react";
import HomeCards from "./HomeCards";

const FeatureOverview: FC = () => {
    return (
        <div className="px-5 md:px-[15%]">
            <h1 className="text-3xl md:text-4xl text-center pb-4">
                Why SudoBot?
            </h1>

            <div
                style={{
                    height: 2,
                    width: 50,
                    background: "#007bff",
                }}
                className="mx-auto mb-2"
            ></div>

            <br className="hidden md:block" />
            <br />

            <HomeCards />
        </div>
    );
};

export default FeatureOverview;
