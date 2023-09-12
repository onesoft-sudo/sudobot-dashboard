"use client";

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import useDebouncedState from "@/hooks/useDebouncedState";
import { wait } from "@/utils/utils";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    ComponentProps,
    FC,
    Ref,
    forwardRef,
    useImperativeHandle,
} from "react";

interface EntitySelectProps {
    options?: ComponentProps<typeof Autocomplete>["options"];
    entityType: "channel" | "role";
    textFieldLabel?: string;
    multiple?: boolean;
    setValue?: Function;
    onChange?: Function;
    fieldName?: string;
    transformValue?: (v: any) => any;
}

const EntitySelect: FC<EntitySelectProps> = (
    {
        options,
        entityType,
        textFieldLabel,
        multiple,
        setValue,
        onChange,
        fieldName,
        transformValue,
        ...props
    },
    ref: Ref<any>
) => {
    const { user, currentGuild } = useAuthWithCheck();
    const [selectedValues, setSelectedValues] = useDebouncedState<any[]>(
        350,
        []
    );

    const query = useQuery({
        enabled: !options && !!user && !!currentGuild,
        queryKey: ["guild", currentGuild?.id, `${entityType}s`],
        async queryFn() {
            await wait(5000);
            return axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/guild/${encodeURIComponent(
                    currentGuild?.id ?? ""
                )}/${encodeURIComponent(entityType)}s`,
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );
        },
    });

    useImperativeHandle(
        ref,
        () => {
            const mapped = selectedValues?.map(v =>
                transformValue === undefined ? v.id : transformValue(v)
            );

            console.log("Inperative handle update", selectedValues);

            setValue?.(fieldName, mapped, {
                shouldValidate: false,
            });

            return {
                value: mapped,
            };
        },
        [selectedValues]
    );

    return (
        <Autocomplete
            {...props}
            options={
                (options ??
                    query.data?.data.map(({ id, name }: any) => ({
                        id,
                        name,
                    })) ??
                    []) as {
                    name: string;
                    id: string;
                }[]
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={option => `#${option.name}`}
            renderOption={(props, option) => {
                const propsWithoutKey = { ...props };

                if ("key" in propsWithoutKey) {
                    delete propsWithoutKey.key;
                }

                return (
                    <li {...props} key={option.id}>
                        #{option.name}
                    </li>
                );
            }}
            multiple={multiple}
            loading={!options && (!query.data?.data || query.isLoading)}
            loadingText={
                <div className="flex items-center gap-2">
                    <CircularProgress size={20} />
                    <span>Loading...</span>
                </div>
            }
            renderInput={params => (
                <TextField {...params} label={textFieldLabel} />
            )}
            onChange={(_, selectedValues) => {
                console.log(selectedValues);
                setSelectedValues(selectedValues as any);
                onChange?.(_);
            }}
        />
    );
};

export default forwardRef<any, EntitySelectProps>(EntitySelect as any);
