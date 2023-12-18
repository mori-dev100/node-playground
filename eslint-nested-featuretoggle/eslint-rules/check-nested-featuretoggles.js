module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce a maximum nested feature toggles allowed in a program",
    },
  },
  create: function (context) {
    const ifStatement = Symbol("not feature toggle if statement");
    const featureFlagIfStatement = Symbol("feature toggle if statement");
    let ifStatementStack = [];

    return {
      IfStatement: function (node) {
        if (
          node.test.type === "MemberExpression" &&
          node.test.object.name === "featureflags"
        ) {
          ifStatementStack.push(featureFlagIfStatement);
          if (
            ifStatementStack.filter((i) => i === featureFlagIfStatement)
              .length >= 2
          ) {
            context.report({
              node,
              message: "Avoid deep nesting of feature flags conditions",
            });
          }
        } else {
          ifStatementStack.push(ifStatement);
        }
      },
      "IfStatement:exit": function () {
        ifStatementStack.pop();
      },
      LogicalExpression: function (node) {},
    };
  },
};
