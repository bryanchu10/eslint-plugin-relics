import type { Rule } from "eslint";
import type { 
    Identifier,
    Literal,
    VariableDeclarator,
} from "estree";

export const enforceFooBar: Rule.RuleModule = {
    meta: {
        type: "problem",
        docs: {
            description: `Enforce that a variable named "foo" can only be assigned a value of "bar".`
        },
        fixable: "code",
        schema: [],
    },
    create(context: Rule.RuleContext) {
        return {
            VariableDeclaration(node) {
                if (node.kind === "const") {
                    node.declarations.forEach((declarator: VariableDeclarator) => {
                        if (declarator.id.type === "Identifier" && (declarator.id as Identifier).name === "foo") {
                            if (declarator.init && declarator.init.type === "Literal" && (declarator.init as Literal).value !== "bar") {
                                context.report({
                                    node: declarator,
                                    message: "變數 foo 只能賦值 bar. Unexpected value: {{ notBar }}.",
                                    data: {
                                        notBar: String((declarator.init as Literal).value)
                                    },
                                    fix(fixer) {
                                        return fixer.replaceText(declarator.init as Literal, `"bar"`);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        };
    },
};
