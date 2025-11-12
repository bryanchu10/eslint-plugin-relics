
import { objectShorthand } from "./rules/object-shorthand";
import { preferExplicitPropertyChecks } from "./rules/prefer-explicit-property-checks";
import { preferLooseEquality } from "./rules/prefer-loose-equality";
import { preferInterfaceBlockSemi } from "./rules/prefer-interface-block-semi";

export const rules = {
    "object-shorthand": objectShorthand,
    "prefer-explicit-property-checks": preferExplicitPropertyChecks,
    "prefer-loose-equality": preferLooseEquality,
    "prefer-interface-block-semi": preferInterfaceBlockSemi,
};

const recommendedRules = {
    "relics/object-shorthand": "error",
    "relics/prefer-explicit-property-checks": "error",
    "relics/prefer-loose-equality": "error",
    "relics/prefer-interface-block-semi": "error",
}

export const configs = {
    recommended: {
        plugins: {
            relics: {
                rules: rules,
            },
        },
        rules: recommendedRules,
    },
    "recommended-legacy": {
        plugins: ["relics"],
        rules: recommendedRules,
    },
}

export default {
    rules: rules,
    configs: configs,
};
