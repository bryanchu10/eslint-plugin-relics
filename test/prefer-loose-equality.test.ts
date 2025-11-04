import { RuleTester } from "eslint";
import { preferLooseEquality } from "../src/rules/prefer-loose-equality";

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015 },
});

ruleTester.run(
    "prefer-loose-equality",
    preferLooseEquality,
    {
        valid: [
            { code: "if (a == b) {}" },
            { code: "if (a != b) {}" },
            { code: "if (a > b) {}" },
        ],
        invalid: [
            {
                code: "if (a === b) {}",
                output: "if (a == b) {}",
                errors: [{ messageId: "preferLooseEquality", data: { expected: "==", actual: "===" } }],
            },
            {
                code: "if (a !== b) {}",
                output: "if (a != b) {}",
                errors: [{ messageId: "preferLooseEquality", data: { expected: "!=", actual: "!==" } }],
            },
        ],
    }
);

console.log("All tests passed for prefer-loose-equality.test.ts");
