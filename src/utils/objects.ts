class Objects {
    public static notNull<T>(value: T | null | undefined): T {
        if (value === null || value === undefined) {
            throw new Error("Value is null/undefined");
        }

        return value;
    }
}

export { Objects };
