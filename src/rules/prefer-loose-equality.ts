import type { Rule } from "eslint";
import type { BinaryExpression } from "estree";

export const preferLooseEquality: Rule.RuleModule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "預防接收的資料有非預期的型別改別，直接造成線上服務崩潰，所以使用鬆散比較而非嚴格比較",
        },
        fixable: "code",
        schema: [],
        messages: {
            preferLooseEquality: `使用 "{{expected}}" 取代 "{{actual}}".`,
        },
    },
    create(context: Rule.RuleContext) {
        return {
            BinaryExpression(node: BinaryExpression) {
                if (node.operator === "===" || node.operator === "!==") {
                    const expected = node.operator === "===" ? "==" : "!=";
                    context.report({
                        node: node,
                        messageId: "preferLooseEquality",
                        data: {
                            expected: expected,
                            actual: node.operator,
                        },
                        fix(fixer) {
                            if (!node.left.range || !node.right.range) {
                                return null;
                            }

                            return fixer.replaceTextRange([
                                node.left.range[1],
                                node.right.range[0],
                            ], ` ${expected} `);
                        }
                    });
                }
            }
        };
    },
};
