import { RuleTester } from "eslint";
import { preferExplicitPropertyChecks } from "../src/rules/prefer-explicit-property-checks";

const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2020 }
});

ruleTester.run("prefer-explicit-property-checks", preferExplicitPropertyChecks, {
    valid: [
        { code: "if (user && user.profile && user.profile.name) {}" },
        { code: "if (user && user.profile) {}" },
        { code: "if (user) {}" },
        { code: "if (user.profile && user.profile.name) {}" },
        { code: "if (user?.profile?.[name]) {}" },
        { code: "if (user?.profile?.[name]?.foo) {}" },
        { code: "if (user?.profile?.getName()) {}" },
        { code: "let x = user && user.profile && user.profile.name;" },
        { code: "x = foo && foo.bar && foo.bar.baz;" },
        { code: "function f() { return user && user.profile && user.profile.name; }" },
        { code: "user && user.profile && user.profile.name;" },
        { code: "let z = user?.profile?.[name];" },
        { code: "let a = foo?.[bar];" }
    ],
    invalid: [
        {
            code: "if (user?.profile) {}",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "user?.profile", suggested: "user && user.profile" }
            }],
            output: "if (user && user.profile) {}"
        },
        {
            code: "if (user?.profile?.name) {}",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "user?.profile?.name", suggested: "user && user.profile && user.profile.name" }
            }],
            output: "if (user && user.profile && user.profile.name) {}"
        },
        {
            code: "if (foo?.bar) {}",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "foo?.bar", suggested: "foo && foo.bar" }
            }],
            output: "if (foo && foo.bar) {}"
        },
        {
            code: "if (foo?.bar?.baz) {}",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "foo?.bar?.baz", suggested: "foo && foo.bar && foo.bar.baz" }
            }],
            output: "if (foo && foo.bar && foo.bar.baz) {}"
        },
        {
            code: "if (a?.b?.c?.d) {}",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "a?.b?.c?.d", suggested: "a && a.b && a.b.c && a.b.c.d" }
            }],
            output: "if (a && a.b && a.b.c && a.b.c.d) {}"
        },
        {
            code: "let x = user?.profile;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "user?.profile", suggested: "user && user.profile" }
            }],
            output: "let x = user && user.profile;"
        },
        {
            code: "let x = user?.profile?.name;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "user?.profile?.name", suggested: "user && user.profile && user.profile.name" }
            }],
            output: "let x = user && user.profile && user.profile.name;"
        },
        {
            code: "x = foo?.bar;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "foo?.bar", suggested: "foo && foo.bar" }
            }],
            output: "x = foo && foo.bar;"
        },
        {
            code: "x = foo?.bar?.baz;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "foo?.bar?.baz", suggested: "foo && foo.bar && foo.bar.baz" }
            }],
            output: "x = foo && foo.bar && foo.bar.baz;"
        },
        {
            code: "const y = a?.b;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "a?.b", suggested: "a && a.b" }
            }],
            output: "const y = a && a.b;"
        },
        {
            code: "const y = a?.b?.c?.d;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "a?.b?.c?.d", suggested: "a && a.b && a.b.c && a.b.c.d" }
            }],
            output: "const y = a && a.b && a.b.c && a.b.c.d;"
        },
        {
            code: "function f() { return user?.profile; }",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "user?.profile", suggested: "user && user.profile" }
            }],
            output: "function f() { return user && user.profile; }"
        },
        {
            code: "function f() { return user?.profile?.name; }",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "user?.profile?.name", suggested: "user && user.profile && user.profile.name" }
            }],
            output: "function f() { return user && user.profile && user.profile.name; }"
        },
        {
            code: "foo?.bar;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "foo?.bar", suggested: "foo && foo.bar" }
            }],
            output: "foo && foo.bar;"
        },
        {
            code: "foo?.bar?.baz;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "foo?.bar?.baz", suggested: "foo && foo.bar && foo.bar.baz" }
            }],
            output: "foo && foo.bar && foo.bar.baz;"
        },
        {
            code: "if (user?.foo) {}",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "user?.foo", suggested: "user && user.foo" }
            }],
            output: "if (user && user.foo) {}"
        },
        {
            code: "let a = foo?.bar;",
            errors: [{
                messageId: "preferExplicitChecks",
                data: { original: "foo?.bar", suggested: "foo && foo.bar" }
            }],
            output: "let a = foo && foo.bar;"
        }
    ]
});

console.log("All tests passed for prefer-explicit-property-checks.test.ts");
