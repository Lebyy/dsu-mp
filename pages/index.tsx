import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
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
};

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
  };

  while (stack.length > 0) {
    postfixExp.push(stack.pop());
  };

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
};
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
    },

    validate: {
      infixExpression: (value) => {
        // Remove all whitespace from the string
        value = value.replace(/\s/g, "");

        // Check for invalid characters, accept only alphanumeric characters and operators (inclduing parentheses and ^, %).
        if (!/^[a-zA-Z0-9\+\-\*\/\^\%\(\)]+$/.test(value)) {
          return "Invalid characters in expression";
        };

        // Check if the expression is valid.
        if (!isBalanced(value)) {
          return "Invalid expression.";
        };
      },
    },
  });

  const { classes } = useStyles();

  const [infixExpression, setInfixExpression] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Data Structures Using C MicroProject</title>
        <meta name="description" content="A website containing infix to postfix & prefix converters + Fibonacci Series." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
        <h1 className={styles.title}>
          Welcome to Infix -{">"} Postfix & Prefix Converter 👋🏻
        </h1>

        <p className={styles.description}>
          Begin by entering an infix expression below ✨
        </p>

        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) =>
              setInfixExpression(values.infixExpression.replace(/\s/g, ""))
            )}
          >
            <TextInput
              withAsterisk
              label="Infix Expression"
              placeholder="A + B / C * (D - A)"
              {...form.getInputProps("infixExpression")}
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

        {infixExpression ? (
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
        ) : null}
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
