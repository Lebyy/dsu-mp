import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Text,
  TextInput,
  Button,
  Group,
  Box,
  Table,
  Tooltip,
  Paper,
  createStyles,
  Image,
  Accordion,
  Grid,
  Col,
  Container,
  Title,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

function isBalanced(str: string) {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      stack.push(str[i]);
    } else if (str[i] === ")") {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}

/*
Infix -> Postfix / Prefix Related Functions
*/
const preference = {
  "-": 0,
  "+": 0,
  "%": 1,
  "/": 1,
  "*": 1,
  "^": 2,
  ")": 3,
  "(": 3,
};
const isAnOperator = (s: string) =>
  preference[s as keyof typeof preference] !== undefined;
const isAParen = (s: string) => preference[s as keyof typeof preference] === 3;
function infixToPostfix(expression: string) {
  const infixExp = ["(", ...expression.split(""), ")"];
  const postfixExp: (string | undefined)[] = [];

  const stack = [];

  const table: {
    exp: string[];
    stack: string[];
    result: string[];
  } = {
    exp: [],
    stack: [],
    result: [],
  };

  for (const char of infixExp) {
    if (char === "(") {
      stack.push(char);
    } else if (!isAnOperator(char)) {
      postfixExp.push(char);
    } else if (char === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        const last = stack.pop();
        postfixExp.push(last);
      }
      stack.pop();
    } else if (isAnOperator(char)) {
      while (
        stack.length > 0 &&
        preference[stack[stack.length - 1] as keyof typeof preference] >=
          preference[char as keyof typeof preference] &&
        !isAParen(stack[stack.length - 1])
      ) {
        postfixExp.push(stack.pop());
      }

      stack.push(char);
    }

    table.exp.push(char);
    table.stack.push(stack.join(" "));
    table.result.push(postfixExp.join(""));
  }

  while (stack.length > 0) {
    postfixExp.push(stack.pop());
  }

  return (
    <div>
      <p>
        <b>Expression: </b>
        {postfixExp.join("")}
      </p>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Expression</th>
            <th>Stack</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {table.exp.map((exp, i) => (
            <tr key={i}>
              <td>{exp}</td>
              <td>{table.stack[i]}</td>
              <td>{table.result[i]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
function infixToPrefix(expression: string) {
  const InfixExp = [")", ...expression.split("").reverse(), "("];
  const PrefixExp: (string | undefined)[] = [];

  const stack = [];

  const table: {
    exp: string[];
    stack: string[];
    result: string[];
  } = {
    exp: [],
    stack: [],
    result: [],
  };

  for (const char of InfixExp) {
    if (char === ")") {
      stack.push(char);
    } else if (!isAnOperator(char)) {
      PrefixExp.push(char);
    } else if (char === "(") {
      while (stack.length > 0 && stack[stack.length - 1] !== ")") {
        const last = stack.pop();
        PrefixExp.push(last);
      }
      stack.pop();
    } else if (isAnOperator(char)) {
      while (
        stack.length > 0 &&
        preference[stack[stack.length - 1] as keyof typeof preference] >=
          preference[char as keyof typeof preference] &&
        !isAParen(stack[stack.length - 1])
      ) {
        PrefixExp.push(stack.pop());
      }

      stack.push(char);
    }

    table.exp.push(char);
    table.stack.push(stack.join(" "));
    table.result.push(PrefixExp.join(""));
  }

  while (stack.length > 0) {
    PrefixExp.push(stack.pop());
  }

  return (
    <div>
      <p>
        <b>Expression: </b>
        {PrefixExp.reverse().join("")}
      </p>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Expression</th>
            <th>Stack</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {table.exp.map((exp, i) => (
            <tr key={i}>
              <td>{exp}</td>
              <td>{table.stack[i]}</td>
              <td>{table.result[i]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

/*
Prefix -> Infix / Postfix Related Functions
*/
function prefixToInfix(expression: string) {
  const stack: string[] = [];
  const table: {
    exp: string[];
    stack: string[];
    result: string[];
  } = {
    exp: [],
    stack: [],
    result: [],
  };

  for (const char of expression.split("").reverse()) {
    if (!isAnOperator(char)) {
      stack.push(char);
    } else {
      const operand1 = stack.pop();
      const operand2 = stack.pop();
      stack.push(`(${operand1}${char}${operand2})`);
    }

    table.exp.push(char);
    table.stack.push(stack.join(" "));
    table.result.push(stack[stack.length - 1]);
  }

  return (
    <div>
      <p>
        <b>Expression: </b>
        {stack[0]}
      </p>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Expression</th>
            <th>Stack</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {table.exp.map((exp, i) => (
            <tr key={i}>
              <td>{exp}</td>
              <td>{table.stack[i]}</td>
              <td>{table.result[i]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
function prefixToPostfix(expression: string) {
  const stack: string[] = [];
  const table: {
    exp: string[];
    stack: string[];
    result: string[];
  } = {
    exp: [],
    stack: [],
    result: [],
  };

  for (const char of expression.split("").reverse()) {
    if (!isAnOperator(char)) {
      stack.push(char);
    } else {
      const operand1 = stack.pop();
      const operand2 = stack.pop();
      stack.push(`${operand1}${operand2}${char}`);
    }

    table.exp.push(char);
    table.stack.push(stack.join(" "));
    table.result.push(stack[stack.length - 1]);
  }

  return (
    <div>
      <p>
        <b>Expression: </b>
        {stack[0]}
      </p>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Expression</th>
            <th>Stack</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {table.exp.map((exp, i) => (
            <tr key={i}>
              <td>{exp}</td>
              <td>{table.stack[i]}</td>
              <td>{table.result[i]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

/*
 Postfix -> Infix / Prefix Related Functions
*/
function postfixToInfix(expression: string) {
  const stack: string[] = [];
  const table: {
    exp: string[];
    stack: string[];
    result: string[];
  } = {
    exp: [],
    stack: [],
    result: [],
  };

  for (const char of expression) {
    if (!isAnOperator(char)) {
      stack.push(char);
    } else {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      stack.push(`(${operand1}${char}${operand2})`);
    }

    table.exp.push(char);
    table.stack.push(stack.join(" "));
    table.result.push(stack[stack.length - 1]);
  }

  return (
    <div>
      <p>
        <b>Expression: </b>
        {stack[0]}
      </p>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Expression</th>
            <th>Stack</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {table.exp.map((exp, i) => (
            <tr key={i}>
              <td>{exp}</td>
              <td>{table.stack[i]}</td>
              <td>{table.result[i]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
function postfixToPrefix(expression: string) {
  const stack: string[] = [];
  const table: {
    exp: string[];
    stack: string[];
    result: string[];
  } = {
    exp: [],
    stack: [],
    result: [],
  };

  for (const char of expression) {
    if (!isAnOperator(char)) {
      stack.push(char);
    } else {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      stack.push(`${char}${operand1}${operand2}`);
    }

    table.exp.push(char);
    table.stack.push(stack.join(" "));
    table.result.push(stack[stack.length - 1]);
  }

  return (
    <div>
      <p>
        <b>Expression: </b>
        {stack[0]}
      </p>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Expression</th>
            <th>Stack</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {table.exp.map((exp, i) => (
            <tr key={i}>
              <td>{exp}</td>
              <td>{table.stack[i]}</td>
              <td>{table.result[i]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },
}));

export default function Home() {
  const form = useForm({
    initialValues: {
      infixExpression: "",
      prefixExpression: "",
      postfixExpression: "",
    },

    validate: {
      infixExpression: (value) => {
        if (expressionType !== "infix") return;

        // Remove all whitespace from the string
        value = value.replace(/\s/g, "");

        // Check for invalid characters, accept only alphanumeric characters and operators (inclduing parentheses and ^, %).
        if (!/^[a-zA-Z0-9\+\-\*\/\^\%\(\)]+$/.test(value)) {
          return "Invalid characters in expression";
        }

        // Check if the expression is valid.
        if (!isBalanced(value)) {
          return "Invalid expression.";
        }
      },
      prefixExpression: (value) => {
        if (expressionType !== "prefix") return;

        // Remove all whitespace from the string
        value = value.replace(/\s/g, "");

        // Check for invalid characters, accept only alphanumeric characters and operators (inclduing parentheses and ^, %).
        if (!/^[a-zA-Z0-9\+\-\*\/\^\%\(\)]+$/.test(value)) {
          return "Invalid characters in expression";
        }

        // Check if the expression is valid.
        if (!isBalanced(value)) {
          return "Invalid expression.";
        }
      },
      postfixExpression: (value) => {
        if (expressionType !== "postfix") return;

        // Remove all whitespace from the string
        value = value.replace(/\s/g, "");

        // Check for invalid characters, accept only alphanumeric characters and operators (inclduing parentheses and ^, %).
        if (!/^[a-zA-Z0-9\+\-\*\/\^\%\(\)]+$/.test(value)) {
          return "Invalid characters in expression";
        }

        // Check if the expression is valid.
        if (!isBalanced(value)) {
          return "Invalid expression.";
        }
      },
    },
  });

  const { classes } = useStyles();

  const [infixExpression, setInfixExpression] = useState("");
  const [prefixExpression, setPrefixExpression] = useState("");
  const [postfixExpression, setPostfixExpression] = useState("");
  const [expressionType, setExpressionType] = useState("infix");

  return (
    <div className={styles.container}>
      <Head>
        <title>Data Structures Using C MicroProject</title>
        <meta
          name="description"
          content="A website containing infix to postfix & prefix converters + Fibonacci Series."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
        <h1 className={styles.title}>
          Welcome to: <br />
          Infix -{">"} Prefix / Postfix <br />
          Prefix -{">"} Infix / Prefix Converter <br />
          Postfix -{">"} Infix / Prefix Converter <br />
          👋🏻
        </h1>

        {
          // Add an expression type selector
        }
        <Group position="center">
          <Text
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "gray",
            }}
          >
            Select Expression Type:
          </Text>

          <Button
            onClick={() => setExpressionType("infix")}
            color={expressionType === "infix" ? "teal" : "gray"}
          >
            Infix
          </Button>
          <Button
            onClick={() => setExpressionType("postfix")}
            color={expressionType === "postfix" ? "teal" : "gray"}
          >
            Postfix
          </Button>
          <Button
            onClick={() => setExpressionType("prefix")}
            color={expressionType === "prefix" ? "teal" : "gray"}
          >
            Prefix
          </Button>
        </Group>

        <p className={styles.description}>
          Begin by entering an {expressionType} expression below ✨
        </p>

        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) =>
              expressionType === "infix"
                ? setInfixExpression(values.infixExpression)
                : expressionType === "postfix"
                  ? setPostfixExpression(values.postfixExpression)
                  : setPrefixExpression(values.prefixExpression)
            )}
          >
            <TextInput
              withAsterisk
              label={`${
                // capitalize the first letter of the expression type
                expressionType.charAt(0).toUpperCase() + expressionType.slice(1)
              } Expression`}
              placeholder={
                expressionType === "infix"
                  ? "A + B * (C - D)"
                  : expressionType === "postfix"
                    ? "AB+CD-*"
                    : "AB+C-D*"
              }
              {...form.getInputProps(`${expressionType}Expression`)}
            />

            <Group position="center" mt="md">
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: "teal", to: "blue", deg: 60 }}
              >
                Submit
              </Button>
            </Group>
          </form>
        </Box>

        {expressionType === "infix" && infixExpression ? (
          infixExpression ? (
            <div>
              <div className={styles.grid}>
                <div
                  className={styles.card}
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <h3>Postfix &rarr;</h3>
                  {infixToPostfix(infixExpression)}
                </div>
                <div
                  className={styles.card}
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <h3>&larr; Prefix</h3>
                  {infixToPrefix(infixExpression)}
                </div>
              </div>
            </div>
          ) : null
        ) : expressionType === "postfix" && postfixExpression ? (
          postfixExpression ? (
            <div>
              <div className={styles.grid}>
                <div
                  className={styles.card}
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <h3>Infix &rarr;</h3>
                  {postfixToInfix(postfixExpression)}
                </div>
                <div
                  className={styles.card}
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <h3>&larr; Prefix</h3>
                  {postfixToPrefix(postfixExpression)}
                </div>
              </div>
            </div>
          ) : null
        ) : prefixExpression ? (
          prefixExpression ? (
            <div>
              <div className={styles.grid}>
                <div
                  className={styles.card}
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <h3>Infix &rarr;</h3>
                  {prefixToInfix(prefixExpression)}
                </div>
                <div
                  className={styles.card}
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <h3>Postfix &rarr;</h3>
                  {prefixToPostfix(prefixExpression)}
                </div>
              </div>
            </div>
          ) : null
        ) : null}

        <br />

        {
          // We need to create a card which will display all the rules for the infix to postfix, prefix, postfix to infix, prefix, etc.
        }

        <br />

        <div
          className={styles.grid}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
            height: "500px",
            marginBottom: "5rem",
          }}
        >
          <Paper
            shadow="xs"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "100%",
              height: "500px",
            }}
          >
            <Title order={2} align="center" className={classes.title}>
              Infix to Postfix / Prefix Rules
            </Title>

            <Text align="center">
              <b>📝 Rules:</b>
            </Text>

            <div
              style={{
                padding: "10px",
                overflow: "auto",
                height: "100%",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <ScrollArea>
                <h1>Infix to Postfix & Prefix Conversion Rules</h1>

                <h2>Infix to Postfix Conversion</h2>
                <ul>
                  <li>
                    Initialize: Create an empty stack for operators and an empty
                    list for the output.
                  </li>
                  <li>
                    Read the expression: From left to right, read one token
                    (operand, operator, or parenthesis) at a time.
                  </li>
                  <li>
                    Operand: If the token is an operand (number or variable),
                    append it to the output list.
                  </li>
                  <li>
                    Operator:
                    <ul>
                      <li>
                        While there is an operator at the top of the stack with
                        greater precedence, pop operators from the stack to the
                        output list.
                      </li>
                      <li>Push the read operator onto the stack.</li>
                    </ul>
                  </li>
                  <li>
                    Parentheses:
                    <ul>
                      <li>
                        If the token is a left parenthesis `(`, push it onto the
                        stack.
                      </li>
                      <li>
                        If the token is a right parenthesis `)`, pop from the
                        stack to the output list until a left parenthesis `(` is
                        encountered. Discard the left parenthesis.
                      </li>
                    </ul>
                  </li>
                  <li>
                    End of Expression: After reading the entire expression, pop
                    any remaining operators from the stack to the output list.
                  </li>
                  <li>
                    Output: The output list now contains the postfix expression.
                  </li>
                </ul>

                <h2>Infix to Prefix Conversion</h2>
                <ul>
                  <li>
                    Reverse the expression: Reverse the input infix expression.
                  </li>
                  <li>
                    Swap parentheses: Swap the left and right parentheses.
                  </li>
                  <li>
                    Apply Postfix Algorithm: Apply the infix to postfix
                    conversion rules to the reversed expression.
                  </li>
                  <li>
                    Reverse the result: Finally, reverse the output to get the
                    prefix expression.
                  </li>
                </ul>

                <h2>Precedence and Associativity</h2>
                <ul>
                  <li>
                    <b>Precedence:</b> Operators with higher precedence are
                    evaluated before operators with lower precedence. For
                    example, `*` and `/` have higher precedence than `+` and
                    `-`.
                  </li>
                  <li>
                    <b>Associativity:</b>
                    <ul>
                      <li>
                        Left associative operators: `+`, `-`, `*`, `/`, `%`
                      </li>
                      <li>Right associative operators: `^`</li>
                    </ul>
                  </li>
                </ul>

                <div className="example">
                  <h2>Example Conversion</h2>

                  <h3>Infix to Postfix</h3>
                  <p>
                    <b>Infix:</b> A * (B + C) / D
                  </p>
                  <ol>
                    <li>
                      Read `A`: Operand, add to output: <code>A</code>
                    </li>
                    <li>
                      Read `*`: Operator, push to stack: <code>*</code>
                    </li>
                    <li>
                      Read `(`: Parenthesis, push to stack: <code>* (</code>
                    </li>
                    <li>
                      Read `B`: Operand, add to output: <code>A B</code>
                    </li>
                    <li>
                      Read `+`: Operator, push to stack: <code>* ( +</code>
                    </li>
                    <li>
                      Read `C`: Operand, add to output: <code>A B C</code>
                    </li>
                    <li>
                      Read `)`: Parenthesis, pop and add to output until `(` is
                      found: <code>A B C +</code>
                    </li>
                    <li>
                      Read `/`: Operator, pop `*` and add to output, then push
                      `/` to stack: <code>A B C + * /</code>
                    </li>
                    <li>
                      Read `D`: Operand, add to output:{" "}
                      <code>A B C + * D /</code>
                    </li>
                  </ol>
                  <p>
                    <b>Postfix:</b> A B C + * D /
                  </p>

                  <h3>Infix to Prefix</h3>
                  <p>
                    <b>Infix:</b> A * (B + C) / D
                  </p>
                  <ol>
                    <li>
                      Reverse: <code>D / (C + B) * A</code>
                    </li>
                    <li>
                      Swap parentheses: <code>D / )C + B( * A</code>
                    </li>
                    <li>
                      Convert to postfix:
                      <ul>
                        <li>
                          Read `D`: Operand, add to output: <code>D</code>
                        </li>
                        <li>
                          Read `/`: Operator, push to stack: <code>/</code>
                        </li>
                        <li>
                          Read `)` (left parenthesis): Push to stack:{" "}
                          <code>/ )</code>
                        </li>
                        <li>
                          Read `C`: Operand, add to output: <code>D C</code>
                        </li>
                        <li>
                          Read `+`: Operator, push to stack: <code>/ ) +</code>
                        </li>
                        <li>
                          Read `B`: Operand, add to output: <code>D C B</code>
                        </li>
                        <li>
                          Read `(` (right parenthesis): Pop and add to output
                          until `)` is found: <code>D C B +</code>
                        </li>
                        <li>
                          Read `*`: Operator, push to stack: <code>* /</code>
                        </li>
                        <li>
                          Read `A`: Operand, add to output:{" "}
                          <code>D C B + A</code>
                        </li>
                      </ul>
                    </li>
                    <li>
                      Reverse the result: <code>* A / + B C D</code>
                    </li>
                  </ol>
                  <p>
                    <b>Prefix:</b> * A / + B C D
                  </p>
                </div>
              </ScrollArea>
            </div>
          </Paper>
        </div>

        <br />

        <div
          className={styles.grid}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
            height: "500px",
            marginBottom: "5rem",
          }}
        >
          <Paper
            shadow="xs"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "100%",
              height: "500px",
            }}
          >
            <Title order={2} align="center" className={classes.title}>
              Prefix to Infix / Postfix Rules
            </Title>

            <Text align="center">
              <b>📝 Rules:</b>
            </Text>

            <div
              style={{
                padding: "10px",
                overflow: "auto",
                height: "100%",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <ScrollArea>
                <h1>Prefix to Infix & Postfix Conversion Rules</h1>

                <h2>Prefix to Infix Conversion</h2>
                <ul>
                  <li>Read the Prefix expression from right to left.</li>
                  <li>
                    If the character is an operand, push it onto the stack.
                  </li>
                  <li>
                    If the character is an operator, pop two operands from the
                    stack.
                  </li>
                  <li>
                    Form a string by concatenating the two operands and the
                    operator between them.
                  </li>
                  <li>Push the resulting string back onto the stack.</li>
                  <li>
                    Repeat until the entire Prefix expression has been read.
                  </li>
                  <li>The stack now contains the Infix expression.</li>
                </ul>

                <h2>Prefix to Postfix Conversion</h2>
                <ul>
                  <li>Read the Prefix expression from right to left.</li>
                  <li>
                    If the character is an operand, push it onto the stack.
                  </li>
                  <li>
                    If the character is an operator, pop two operands from the
                    stack.
                  </li>
                  <li>
                    Concatenate the two operands and the operator in the order:
                    operand1 operand2 operator.
                  </li>
                  <li>Push the resulting string back onto the stack.</li>
                  <li>
                    Repeat until the entire Prefix expression has been read.
                  </li>
                  <li>The stack now contains the Postfix expression.</li>
                </ul>

                <div className="example">
                  <h2>Example Conversion</h2>

                  <h3>Prefix to Infix</h3>
                  <p>
                    <b>Prefix:</b> * + A B - C D
                  </p>
                  <ol>
                    <li>
                      Read `D`: Operand, push to stack: <code>D</code>
                    </li>
                    <li>
                      Read `C`: Operand, push to stack: <code>C D</code>
                    </li>
                    <li>
                      Read `-`: Operator, pop two operands (`C` and `D`), form
                      string: <code>(C - D)</code>, push to stack
                    </li>
                    <li>
                      Read `B`: Operand, push to stack: <code>B (C - D)</code>
                    </li>
                    <li>
                      Read `A`: Operand, push to stack: <code>A B (C - D)</code>
                    </li>
                    <li>
                      Read `+`: Operator, pop two operands (`A` and `B`), form
                      string: <code>(A + B)</code>, push to stack
                    </li>
                    <li>
                      Read `*`: Operator, pop two operands (`(A + B)` and `(C -
                      D)`), form string: <code>((A + B) * (C - D))</code>, push
                      to stack
                    </li>
                  </ol>
                  <p>
                    <b>Infix:</b> (A + B) * (C - D)
                  </p>

                  <h3>Prefix to Postfix</h3>
                  <p>
                    <b>Prefix:</b> * + A B - C D
                  </p>
                  <ol>
                    <li>
                      Read `D`: Operand, push to stack: <code>D</code>
                    </li>
                    <li>
                      Read `C`: Operand, push to stack: <code>C D</code>
                    </li>
                    <li>
                      Read `-`: Operator, pop two operands (`C` and `D`), form
                      string: <code>CD-</code>, push to stack
                    </li>
                    <li>
                      Read `B`: Operand, push to stack: <code>B CD-</code>
                    </li>
                    <li>
                      Read `A`: Operand, push to stack: <code>A B CD-</code>
                    </li>
                    <li>
                      Read `+`: Operator, pop two operands (`A` and `B`), form
                      string: <code>AB+</code>, push to stack
                    </li>
                    <li>
                      Read `*`: Operator, pop two operands (`AB+` and `CD-`),
                      form string: <code>AB+CD-* </code>, push to stack
                    </li>
                  </ol>
                  <p>
                    <b>Postfix:</b> AB+CD-*
                  </p>
                </div>
              </ScrollArea>
            </div>
          </Paper>
        </div>

        <br />

        <div
          className={styles.grid}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
            height: "500px",
            marginBottom: "5rem",
          }}
        >
          <Paper
            shadow="xs"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "100%",
              height: "500px",
            }}
          >
            <Title order={2} align="center" className={classes.title}>
              Postfix to Infix / Prefix Rules
            </Title>

            <Text align="center">
              <b>📝 Rules:</b>
            </Text>

            <div
              style={{
                padding: "10px",
                overflow: "auto",
                height: "100%",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <ScrollArea>
                <h1>Postfix to Infix & Prefix Conversion Rules</h1>

                <h2>Postfix to Infix Conversion</h2>
                <ul>
                  <li>Read the Postfix expression from left to right.</li>
                  <li>
                    If the character is an operand, push it onto the stack.
                  </li>
                  <li>
                    If the character is an operator, pop two operands from the
                    stack.
                  </li>
                  <li>
                    Form a string by concatenating the two operands and the
                    operator between them.
                  </li>
                  <li>Push the resulting string back onto the stack.</li>
                  <li>
                    Repeat until the entire Postfix expression has been read.
                  </li>
                  <li>The stack now contains the Infix expression.</li>
                </ul>

                <h2>Postfix to Prefix Conversion</h2>
                <ul>
                  <li>Read the Postfix expression from left to right.</li>
                  <li>
                    If the character is an operand, push it onto the stack.
                  </li>
                  <li>
                    If the character is an operator, pop two operands from the
                    stack.
                  </li>
                  <li>
                    Concatenate the operator and the two operands in the order:
                    operator operand1 operand2.
                  </li>
                  <li>Push the resulting string back onto the stack.</li>
                  <li>
                    Repeat until the entire Postfix expression has been read.
                  </li>
                  <li>The stack now contains the Prefix expression.</li>
                </ul>

                <div className="example">
                  <h2>Example Conversion</h2>

                  <h3>Postfix to Infix</h3>
                  <p>
                    <b>Postfix:</b> AB+C*
                  </p>
                  <ol>
                    <li>
                      Read `A`: Operand, push to stack: <code>A</code>
                    </li>
                    <li>
                      Read `B`: Operand, push to stack: <code>A B</code>
                    </li>
                    <li>
                      Read `+`: Operator, pop two operands (`A` and `B`), form
                      string: <code>(A + B)</code>, push to stack
                    </li>
                    <li>
                      Read `C`: Operand, push to stack: <code>(A + B) C</code>
                    </li>
                    <li>
                      Read `*`: Operator, pop two operands (`(A + B)` and `C`),
                      form string: <code>((A + B) * C)</code>, push to stack
                    </li>
                  </ol>
                  <p>
                    <b>Infix:</b> (A + B) * C
                  </p>

                  <h3>Postfix to Prefix</h3>
                  <p>
                    <b>Postfix:</b> AB+C*
                  </p>
                  <ol>
                    <li>
                      Read `A`: Operand, push to stack: <code>A</code>
                    </li>
                    <li>
                      Read `B`: Operand, push to stack: <code>A B</code>
                    </li>
                    <li>
                      Read `+`: Operator, pop two operands (`A` and `B`), form
                      string: <code>+AB</code>, push to stack
                    </li>
                    <li>
                      Read `C`: Operand, push to stack: <code>+AB C</code>
                    </li>
                    <li>
                      Read `*`: Operator, pop two operands (`+AB` and `C`), form
                      string: <code>*+ABC</code>, push to stack
                    </li>
                  </ol>
                  <p>
                    <b>Prefix:</b> *+ABC
                  </p>
                </div>
              </ScrollArea>

              <br />

              <br />
            </div>
          </Paper>
        </div>

        <div
          className={styles.grid}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
            height: "500px",
          }}
        >
          <Paper
            shadow="xs"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "100%",
              height: "500px",
            }}
          >
            <Tooltip label="Click on the number to proceed to the next iteration!">
              <p className={styles.description}>
                <b>📝 Fibonnaci Series:</b>
              </p>
            </Tooltip>
            <iframe src="/fibonacci.html" width="100%" height="100%" />
          </Paper>
        </div>
      </main>
      <br />
      <br />
      <br />
      <div className={classes.wrapper}>
        <Container size="lg">
          <Grid id="faq-grid" gutter={50}>
            <Col span={12} md={6}>
              <Image src="/faq.svg" alt="Frequently Asked Questions" />
            </Col>
            <Col span={12} md={6}>
              <Title order={2} align="left" className={classes.title}>
                Frequently Asked Questions
              </Title>

              <Accordion
                chevronPosition="right"
                defaultValue="infix-expression"
                variant="separated"
              >
                <Accordion.Item
                  className={classes.item}
                  value="infix-expression"
                >
                  <Accordion.Control>
                    What is an infix expression?
                  </Accordion.Control>
                  <Accordion.Panel>
                    An infix expression is an expression that we use every day.
                    An infix expression consists of a single letter or an
                    operator followed by one infix string and another infix
                    string. For example, A, A + B, (A + B) + (C – D). As a
                    result, we have operators between operands.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className={classes.item}
                  value="postfix-expression"
                >
                  <Accordion.Control>
                    What is a postfix expression?
                  </Accordion.Control>
                  <Accordion.Panel>
                    A postfix expression (also known as Reverse Polish Notation)
                    consists of a single letter or operator followed by two
                    postfix strings. Every postfix string that is longer than a
                    single variable has two operands followed by an operator. A,
                    AB+, AB+CD-, etc.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className={classes.item}
                  value="prefix-expression"
                >
                  <Accordion.Control>
                    What is a prefix expression?
                  </Accordion.Control>
                  <Accordion.Panel>
                    If the operator occurs before the operands in an expression,
                    it is referred to as a prefix expression. Simply put, of the
                    form (operator operand1 operand2). *+AB-CD, for example
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className={classes.item}
                  value="fibonacci-series"
                >
                  <Accordion.Control>
                    What is a Fibonacci series?
                  </Accordion.Control>
                  <Accordion.Panel>
                    The Fibonacci sequence is a number sequence in which each
                    number (Fibonacci number) is the sum of the two numbers
                    before it. The most basic is the series 1, 1, 2, 3, 5, 8,
                    and so on.
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
