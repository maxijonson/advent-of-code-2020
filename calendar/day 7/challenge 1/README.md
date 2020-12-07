# Day 7

## Challenge 1

You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

For example, consider the following rules:

```
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
```

These rules specify the required contents for 9 bag types. In this example, every `faded blue` bag is empty, every `vibrant plum` bag contains 11 bags (5 `faded blue` and 6 `dotted black`), and so on.

You have a `shiny gold` bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one `shiny gold` bag?)

In the above rules, the following options would be available to you:

-   A `bright white` bag, which can hold your `shiny gold` bag directly.
-   A `muted yellow` bag, which can hold your `shiny gold` bag directly, plus some other bags.
-   A `dark orange` bag, which can hold `bright white` and `muted yellow` bags, either of which could then hold your `shiny gold` bag.
-   A `light red` bag, which can hold `bright white` and `muted yellow` bags, either of which could then hold your `shiny gold` bag.

So, in this example, the number of bag colors that can eventually contain at least one `shiny gold` bag is 4.

How many bag colors can eventually contain at least one `shiny gold` bag? (The list of rules is quite long; make sure you get all of it.)

### Approach

First of all, let me just say that when I saw the input, my first thought was "ohh boy... how am I going to parse these sentences into data...". It turned out, it was more simple than it looked like, but it was a bit longer than the other challenges.

Let's break down the following sentence:

```
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
```

The first color is the "container" color `muted yellow`. After the "bags contain" (which I'll use as a seperator), you have the "contained" bags: `2 shiny gold bags` and `9 faded blue bags`. Each of these contained bags contain an `amount` and a `color`. Now that you understand what kind of data each line gives us, let's put that into a data structure!

I made a collection (or dictionnary) of each container colors with the amount of each contained colors in it. In the sentence above alone, the structure would be:

```json
{
    "muted yellow": {
        "color": "muted yellow",
        "contains": {
            "shiny gold" {
                "color": "shiny gold",
                "amount": 2
            },
            "faded blue" {
                "color": "faded blue",
                "amount": 9
            },
        }
    }
}
```

I know that for this challenge, the `amount` is irrelevant. However, knowing that there is a second challenge, I was pretty sure that the `amount` would come in handy. Challenges like the Advent of Code rarely specify useless information 😎

After our collection is created, I gathered all the bags that had the `shiny gold` bag **directly**. However, this is not enough, as I need to know the bags that also contains it **indirectly**. To find these, I looped through each directly related bags, looked for any other bag that contains the direct bag and add it to the list with the direct bags. Then, I repeat the process until I find no more bags indirectly connected to the `shiny gold` bag. The size of the list with the direct and indirect bags gives the answer!

After writing this, I realize I probably could've tried a recursive approach instead of the while loop. 😅

### Answer

302
