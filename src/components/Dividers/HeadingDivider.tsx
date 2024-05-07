import { Box } from "@mui/material";

type HeadingDividerProps = {
    size?: number;
};

export default function HeadingDivider({ size = 10 }: HeadingDividerProps) {
    return (
        <Box
            className={`h-[5px] mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 block mx-auto rounded`}
            sx={{
                width: {
                    xs: `calc(30vw + ${size}vw)`,
                    sm: `calc(20vw + ${size}vw)`,
                    md: `calc(10vw + ${size}vw)`,
                    lg: `calc(5vw + ${size}vw)`,
                    xl: `${size}vw`,
                },
            }}
        />
    );
}
