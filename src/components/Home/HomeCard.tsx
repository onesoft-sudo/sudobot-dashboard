import { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface HomeCardProps extends PropsWithChildren {
    icon: IconType;
    title: string;
    paragraph?: boolean;
}

const HomeCard: FC<HomeCardProps> = ({
    icon: Icon,
    title,
    children,
    paragraph = true,
}) => {
    return (
        <div
            className="px-4 py-3 rounded-md"
            style={{
                background:
                    "linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.2))",
            }}
        >
            <div className="flex items-center gap-4 mb-3">
                <Icon
                    size={25}
                    color="#007bff"
                    style={{
                        marginTop: -2.5,
                    }}
                />
                <h2>{title}</h2>
            </div>

            <div>
                {paragraph ? (
                    <p className="text-[#999]">{children}</p>
                ) : (
                    children
                )}
            </div>
        </div>
    );
};

export default HomeCard;
