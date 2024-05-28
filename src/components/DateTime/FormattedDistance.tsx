import { formatDistanceStrict, formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState, type FC } from "react";

type FormattedDistanceProps = {
    base?: Date | number;
    compare: Date | number;
};

const FormattedDistance: FC<FormattedDistanceProps> = ({ base, compare }) => {
    const [formatted, setFormatted] = useState<string>(() => {
        return base
            ? formatDistanceStrict(compare, base, { addSuffix: true })
            : formatDistanceToNowStrict(compare, { addSuffix: true });
    });

    useEffect(() => {
        const diff = Math.abs(base ? Number(base) : Date.now() - Number(compare));
        const interval = diff < 60000 ? 1000 : 60000;
        const id = setInterval(
            () =>
                setFormatted(
                    base
                        ? formatDistanceStrict(compare, base, { addSuffix: true })
                        : formatDistanceToNowStrict(compare, { addSuffix: true }),
                ),
            interval,
        );

        return () => clearInterval(id);
    }, [base, compare]);

    return formatted;
};

export default FormattedDistance;
