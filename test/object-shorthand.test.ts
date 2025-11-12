import { RuleTester } from "eslint";
import { objectShorthand } from "../src/rules/object-shorthand";

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015 },
});

ruleTester.run("object-shorthand", objectShorthand, {
    valid: [
        { code: "const obj = { foo: foo, bar() {} };" },
        { code: "const obj = { a: a, b: b, c() {} };" },
        { code: "const obj = { x: x, y() { return 1; } };" },
    ],
    invalid: [
        {
            code: "const obj = { foo, bar() {} };",
            output: "const obj = { foo: foo, bar() {} };",
            errors: [{ messageId: "propertyNoShorthand", data: { name: "foo" } }],
        },
        {
            code: "const obj = { foo: foo, bar: function() {} };",
            output: "const obj = { foo: foo, bar() {} };",
            errors: [{ messageId: "methodMustShorthand", data: { name: "bar", original: "bar: function() {}" } }],
        },
        {
            code: "const obj = { a, b: function() { return 2; } };",
            output: "const obj = { a: a, b() { return 2; } };",
            errors: [
                { messageId: "propertyNoShorthand", data: { name: "a" } },
                { messageId: "methodMustShorthand", data: { name: "b", original: "b: function() { return 2; }" } }
            ],
        },
    ],
});
