import { RuleTester } from "eslint";
import { enforceFooBar } from "../src/rules/enforce-foo-bar"

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015 },
});

ruleTester.run("enforce-foo-bar", enforceFooBar, {
    valid: [
        {
            code: `const foo = "bar";`,
        },
    ],
    invalid: [
        {
            code: `const foo = "baz";`,
            output: `const foo = "bar";`,
            errors: 1,
        },
    ],
});

console.log("All tests passed for enforce-foo-bar.test.ts");
