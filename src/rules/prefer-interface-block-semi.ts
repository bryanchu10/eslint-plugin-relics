import { Rule } from "eslint";
export const preferInterfaceBlockSemi: Rule.RuleModule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "interface block 加分號",
        },
        fixable: "code",
        schema: [],
        messages: {
            missingSemi: "interface block 加分號。",
        },
    },
    create(context: Rule.RuleContext) {
        return {
            TSInterfaceDeclaration(node: any) {
                const sourceCode = context.getSourceCode();
                const tokenAfter = sourceCode.getTokenAfter(node);
                if (!tokenAfter || tokenAfter.value !== ";") {
                    context.report({
                        node: node,
                        messageId: "missingSemi",
                        fix(fixer: Rule.RuleFixer) {
                            return fixer.insertTextAfter(node, ";");
                        },
                    });
                }
            },
        };
    },
};
