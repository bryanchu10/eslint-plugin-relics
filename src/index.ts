
import { enforceFooBar } from "./rules/enforce-foo-bar";
import { preferExplicitPropertyChecks } from "./rules/prefer-explicit-property-checks";
import { preferLooseEquality } from "./rules/prefer-loose-equality";

export const rules = {
    "enforce-foo-bar": enforceFooBar,
    "prefer-explicit-property-checks": preferExplicitPropertyChecks,
    "prefer-loose-equality": preferLooseEquality,
};

export const configs = {
    recommended: {
        plugins: ["relics"],
        rules: {
            "relics/enforce-foo-bar": "error",
            "relics/prefer-explicit-property-checks": "error",
            "relics/prefer-loose-equality": "error",
        }
    }
}

export default {
    rules,
    configs,
};
