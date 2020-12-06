# Day 6

## Challenge 2

As you finish the last group's customs declaration, you notice that you misread one word in the instructions:

You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!

Using the same example as above:

```
abc

a
b
c

ab
ac

a
a
a
a

b
```

This list represents answers from five groups:

-   In the first group, everyone (all 1 person) answered "yes" to `3` questions: `a`, `b`, and `c`.
-   In the second group, there is no question to which everyone answered "yes".
-   In the third group, everyone answered yes to only `1` question, `a`. Since some people did not answer "yes" to `b` or `c`, they don't count.
-   In the fourth group, everyone answered yes to only `1` question, `a`.
-   In the fifth group, everyone (all 1 person) answered "yes" to `1` question, `b`.

In this example, the sum of these counts is `3 + 0 + 1 + 1 + 1 = 6`.

For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?

### Approach

I've done a small change to the first solution. This time, I would keep each person separate, rather than putting their answers all in one string. I determined the questions to validate using the first person's answer, since if that person's answers don't match with the others, then the question is automatically "invalid". For each of these questions, I check if every other person has answered to the question as well. If they did, then we can increment the accumulator by 1.

### Answer

3392
