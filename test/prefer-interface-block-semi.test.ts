import { RuleTester } from "eslint";
import parser from "@typescript-eslint/parser";
import { preferInterfaceBlockSemi } from "../src/rules/prefer-interface-block-semi";

const ruleTester = new RuleTester({
    languageOptions: { parser }
});

ruleTester.run("prefer-interface-block-semi", preferInterfaceBlockSemi, {
    valid: [
        {
            code: `interface Foo { a: number; };`,
        },
        {
            code: `interface Bar {\n  b(): void;\n};`,
        },
    ],
    invalid: [
        {
            code: `interface Baz { c: string }`,
            errors: [{ messageId: "missingSemi" }],
            output: `interface Baz { c: string };`,
        },
        {
            code: `interface Qux {\n  d: boolean\n}`,
            errors: [{ messageId: "missingSemi" }],
            output: `interface Qux {\n  d: boolean\n};`,
        },
    ],
});
