
import { enforceFooBar } from "./rules/enforce-foo-bar";
import { preferExplicitPropertyChecks } from "./rules/prefer-explicit-property-checks";
import { preferLooseEquality } from "./rules/prefer-loose-equality";
import { preferInterfaceBlockSemi } from "./rules/prefer-interface-block-semi";

export const rules = {
    "enforce-foo-bar": enforceFooBar,
    "prefer-explicit-property-checks": preferExplicitPropertyChecks,
    "prefer-loose-equality": preferLooseEquality,
    "prefer-interface-block-semi": preferInterfaceBlockSemi,
};

export const configs = {
    recommended: {
        plugins: {
            relics: {
                rules,
            },
        },
        rules: {
            "relics/enforce-foo-bar": "error",
            "relics/prefer-explicit-property-checks": "error",
            "relics/prefer-loose-equality": "error",
            "relics/prefer-interface-block-semi": "error",
        },
    },
    "recommended-legacy": {
        plugins: ["relics"],
        rules: {
            "relics/enforce-foo-bar": "error",
            "relics/prefer-explicit-property-checks": "error",
            "relics/prefer-loose-equality": "error",
            "relics/prefer-interface-block-semi": "error",
        },
    },
}

export default {
    rules,
    configs,
};
