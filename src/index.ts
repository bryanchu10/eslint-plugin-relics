
import { enforceFooBar } from "./rules/enforce-foo-bar";
import { preferExplicitPropertyChecks } from "./rules/prefer-explicit-property-checks";
import { preferLooseEquality } from "./rules/prefer-loose-equality";

const plugin = {
    rules: {
        "enforce-foo-bar": enforceFooBar,
        "prefer-explicit-property-checks": preferExplicitPropertyChecks,
        "prefer-loose-equality": preferLooseEquality,
    },
};

export default plugin;
export const { rules } = plugin;
