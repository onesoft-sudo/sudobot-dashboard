import { type UserConfig, RuleConfigSeverity } from "@commitlint/types";

const configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            RuleConfigSeverity.Error,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "perf",
                "test",
                "build",
                "ci",
                "chore",
                "revert",
                "wip",
                "release",
                "deploy",
            ],
        ],
    },
};

export default configuration;
