import { useGuildConfiguration } from "@/contexts/GuildConfigurationContext";
import { logger } from "@/logging/logger";
import { useEffect, useRef } from "react";
import { FieldValues, UseFormProps, useForm } from "react-hook-form";

export const useConfigForm = <
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined,
>(
    config?:
        | UseFormProps<TFieldValues, TContext>
        | ((config: ReturnType<typeof useGuildConfiguration>) => UseFormProps<TFieldValues, TContext>),
) => {
    const configuration = useGuildConfiguration();
    const form = useForm<TFieldValues, TContext, TTransformedValues>(
        typeof config === "function" ? config(configuration) : config,
    );
    const initialRenderRef = useRef(true);

    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false;
            return;
        }

        form.reset(configuration as unknown as Parameters<typeof form.reset>[0], {
            keepDirty: false,
            keepDefaultValues: false,
            keepIsSubmitSuccessful: false,
            keepDirtyValues: false,
            keepErrors: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
            keepIsValidating: false,
            keepIsSubmitted: false,
            keepValues: false,
        });
        logger.debug(useConfigForm.name, "Reset form");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configuration]);

    return { form, configuration };
};
