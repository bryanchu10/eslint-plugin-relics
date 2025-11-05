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
                messageId: "ifStatement",
                data: { original: "user?.profile", suggested: "user && user.profile" }
            }],
            output: "if (user && user.profile) {}"
        },
        {
            code: "if (user?.profile?.name) {}",
            errors: [{
                messageId: "ifStatement",
                data: { original: "user?.profile?.name", suggested: "user && user.profile && user.profile.name" }
            }],
            output: "if (user && user.profile && user.profile.name) {}"
        },
        {
            code: "if (foo?.bar) {}",
            errors: [{
                messageId: "ifStatement",
                data: { original: "foo?.bar", suggested: "foo && foo.bar" }
            }],
            output: "if (foo && foo.bar) {}"
        },
        {
            code: "if (foo?.bar?.baz) {}",
            errors: [{
                messageId: "ifStatement",
                data: { original: "foo?.bar?.baz", suggested: "foo && foo.bar && foo.bar.baz" }
            }],
            output: "if (foo && foo.bar && foo.bar.baz) {}"
        },
        {
            code: "if (a?.b?.c?.d) {}",
            errors: [{
                messageId: "ifStatement",
                data: { original: "a?.b?.c?.d", suggested: "a && a.b && a.b.c && a.b.c.d" }
            }],
            output: "if (a && a.b && a.b.c && a.b.c.d) {}"
        },
        // 非 if statement 場景，僅報錯但不 autofix
        {
            code: "let x = user?.profile;",
            errors: [{
                messageId: "others",
                data: { original: "user?.profile", suggested: "user && user.profile" }
            }],
            output: null,
        },
        {
            code: "let x = user?.profile?.name;",
            errors: [{
                messageId: "others",
                data: { original: "user?.profile?.name", suggested: "user && user.profile && user.profile.name" }
            }],
            output: null,
        },
        {
            code: "x = foo?.bar;",
            errors: [{
                messageId: "others",
                data: { original: "foo?.bar", suggested: "foo && foo.bar" }
            }],
            output: null,
        },
        {
            code: "x = foo?.bar?.baz;",
            errors: [{
                messageId: "others",
                data: { original: "foo?.bar?.baz", suggested: "foo && foo.bar && foo.bar.baz" }
            }],
            output: null,
        },
        {
            code: "const y = a?.b;",
            errors: [{
                messageId: "others",
                data: { original: "a?.b", suggested: "a && a.b" }
            }],
            output: null,
        },
        {
            code: "const y = a?.b?.c?.d;",
            errors: [{
                messageId: "others",
                data: { original: "a?.b?.c?.d", suggested: "a && a.b && a.b.c && a.b.c.d" }
            }],
            output: null,
        },
        {
            code: "function f() { return user?.profile; }",
            errors: [{
                messageId: "others",
                data: { original: "user?.profile", suggested: "user && user.profile" }
            }],
            output: null,
        },
        {
            code: "function f() { return user?.profile?.name; }",
            errors: [{
                messageId: "others",
                data: { original: "user?.profile?.name", suggested: "user && user.profile && user.profile.name" }
            }],
            output: null,
        },
        {
            code: "foo?.bar;",
            errors: [{
                messageId: "others",
                data: { original: "foo?.bar", suggested: "foo && foo.bar" }
            }],
            output: null,
        },
        {
            code: "foo?.bar?.baz;",
            errors: [{
                messageId: "others",
                data: { original: "foo?.bar?.baz", suggested: "foo && foo.bar && foo.bar.baz" }
            }],
            output: null,
        },
        {
            code: "let a = foo?.bar;",
            errors: [{
                messageId: "others",
                data: { original: "foo?.bar", suggested: "foo && foo.bar" }
            }],
            output: null,
        },
    ],
});
