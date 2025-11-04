import type { Rule } from "eslint";
import type {
    AssignmentExpression,
    ChainExpression,
    ExpressionStatement,
    Identifier,
    IfStatement,
    MemberExpression,
    Node,
    ReturnStatement,
    VariableDeclarator,
} from "estree";

function isMemberExpression(node: unknown): node is MemberExpression {
    return !!node && typeof node === "object" && (node as MemberExpression).type === "MemberExpression";
}
function isIdentifier(node: unknown): node is Identifier {
    return !!node && typeof node === "object" && (node as Identifier).type === "Identifier";
}

export const preferExplicitPropertyChecks: Rule.RuleModule = {
    meta: {
        type: "suggestion",
        docs: {
            description: "遇到物件的巢狀屬性判斷時，使用顯式的屬性檢查，不用可選串連",
        },
        fixable: "code",
        schema: [],
        messages: {
            preferExplicitChecks: "請將 '{{original}}' 改寫為 '{{suggested}}'，避免在條件或賦值等情境中使用可選串連（?.）語法。",
        },
    },
    create(context: Rule.RuleContext) {
        function checkChainExpression(chainExpr: ChainExpression, fixerTarget: Node) {
            let chain: unknown = chainExpr.expression;
            const parts: string[] = [];
            while (isMemberExpression(chain)) {
                if (chain.computed) return;
                if (!isIdentifier(chain.property)) return;
                parts.unshift(chain.property.name);
                chain = chain.object;
            }
            if (isIdentifier(chain)) {
                parts.unshift(chain.name);
            } else {
                return;
            }
            if (parts.length < 2) return;
            const sourceCode = context.getSourceCode(); // v9 已經棄用，這邊相容 v8
            const original = sourceCode.getText(fixerTarget);
            let suggested = parts[0];
            for (let i = 1; i < parts.length; i++) {
                suggested += ` && ${parts.slice(0, i + 1).join(".")}`;
            }
            context.report({
                node: fixerTarget,
                messageId: "preferExplicitChecks",
                data: {
                    original,
                    suggested
                },
                fix(fixer) {
                    return fixer.replaceText(fixerTarget, suggested);
                }
            });
        }

        return {
            IfStatement(node: IfStatement) {
                if (node.test && node.test.type === "ChainExpression") {
                    checkChainExpression(node.test as ChainExpression, node.test);
                }
            },
            AssignmentExpression(node: AssignmentExpression) {
                if (node.right && node.right.type === "ChainExpression") {
                    checkChainExpression(node.right as ChainExpression, node.right);
                }
            },
            VariableDeclarator(node: VariableDeclarator) {
                if (node.init && node.init.type === "ChainExpression") {
                    checkChainExpression(node.init as ChainExpression, node.init);
                }
            },
            ReturnStatement(node: ReturnStatement) {
                if (node.argument && node.argument.type === "ChainExpression") {
                    checkChainExpression(node.argument as ChainExpression, node.argument);
                }
            },
            ExpressionStatement(node: ExpressionStatement) {
                if (node.expression && node.expression.type === "ChainExpression") {
                    checkChainExpression(node.expression as ChainExpression, node.expression);
                }
            }
        };
    }
};
