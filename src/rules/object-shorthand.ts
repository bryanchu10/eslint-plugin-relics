
import type { Rule } from "eslint";
import type { Property, FunctionExpression, Pattern, Node } from "estree";

export const objectShorthand: Rule.RuleModule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "物件屬性不使用縮寫，物件方法使用縮寫"
        },
        messages: {
            propertyNoShorthand: "屬性 '{{name}}' 不使用縮寫，請改成 { {{name}}: {{name}} }",
            methodMustShorthand: "方法 '{{name}}' 使用縮寫，請將 '{{original}}' 改成 '{{name}}() { ... }'"
        },
        schema: [],
        fixable: "code",
    },
    create(context: Rule.RuleContext) {
        return {
            Property(node: Property) {
                // 只處理 ObjectExpression 裡的 Property
                const parent = (node as Node & { parent?: Node }).parent;
                function isObjectExpressionOnly(n: unknown): n is { type: "ObjectExpression" } {
                    return !!n && typeof n === "object" && (n as { type?: string }).type === "ObjectExpression";
                }
                // 僅在 ObjectExpression 報錯，排除 TypeScript 型別註解
                if (isObjectExpressionOnly(parent)) {
                    // Property shorthand: { foo }
                    if (node.shorthand && node.method === false) {
                        const sourceCode = context.getSourceCode();
                        const keyText = sourceCode.getText(node.key as Node);
                        context.report({
                            node: node,
                            messageId: "propertyNoShorthand",
                            data: { name: keyText },
                            fix(fixer: Rule.RuleFixer) {
                                return fixer.replaceTextRange(node.range!, `${keyText}: ${keyText}`);
                            }
                        });
                    }
                    // Method not shorthand: { bar: function() { ... } }
                    if (node.method === false && node.value.type === "FunctionExpression" && !node.shorthand) {
                        const sourceCode = context.getSourceCode();
                        const keyText = sourceCode.getText(node.key as Node);
                        const func = node.value as FunctionExpression;
                        const params = func.params.map((p: Pattern) => sourceCode.getText(p as Node)).join(", ");
                        const body = sourceCode.getText(func.body as Node);
                        const original = sourceCode.getText(node);
                        context.report({
                            node: node,
                            messageId: "methodMustShorthand",
                            data: { 
                                name: keyText,
                                original: original,
                            },
                            fix(fixer: Rule.RuleFixer) {
                                return fixer.replaceTextRange(node.range!, `${keyText}(${params}) ${body}`);
                            }
                        });
                    }
                }
            }
        };
    }
};
