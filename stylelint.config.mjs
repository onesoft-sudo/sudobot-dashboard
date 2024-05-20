const config = {
    extends: ["stylelint-config-standard"],
    rules: {
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"],
            },
        ],
    },
};

export default config;
