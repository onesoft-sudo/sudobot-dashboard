import { loop } from "@/utils/utils";
import { ReactNode } from "react";

type LoopProps<T> =
    | {
          times: number;
          children: ((index: number) => ReactNode) | ReactNode;
      }
    | {
          each: Iterable<T>;
          children: (element: T, index: number) => ReactNode;
      };

const Loop = <T,>({ children, ...props }: LoopProps<T>) => {
    if ("times" in props) {
        return loop(
            props.times,
            typeof children === "function" ? (children as (index: number) => ReactNode) : () => children,
        );
    } else {
        return Array.from(props.each, (element, index) =>
            (children as (element: T, index: number) => ReactNode).call(undefined, element, index),
        );
    }
};

export default Loop;
