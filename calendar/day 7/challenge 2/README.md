# Day 7

## Challenge 2

It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

Consider again your `shiny gold` bag and the rules from the above example:

-   `faded blue` bags contain `0` other bags.
-   `dotted black` bags contain `0` other bags.
-   `vibrant plum` bags contain `11` other bags: 5 `faded blue` bags and 6 `dotted black` bags.
-   `dark olive` bags contain `7` other bags: 3 `faded blue` bags and 4 `dotted black` bags.

So, a single `shiny gold` bag must contain 1 `dark olive` bag (and the 7 bags within it) plus 2 `vibrant plum` bags (and the 11 bags within each of those): `1 + 1 * 7 + 2 + 2 * 11 = 32` bags!

Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

Here's another example:

```
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
```

In this example, a single `shiny gold` bag must contain 126 other bags.

How many individual bags are required inside your single `shiny gold` bag?

### Approach

As I predicted in the previous challenge, the `amount` is now relevant to the challenge! So I can leave the collection creation untouched! Only the part under it needs to change.

This time, I opted for a recursive function. Given a bag, it will count the individual bags in their `contains` field and these contained bags' contained bags, recursively, until it ends with a bag with no contained bags. The calculation example given in the description was very useful for this. I ended up using the formula for each contained bags:

```
containedBagAmount + containedBagAmount * containedBagContainedAmount
```

The `containedBagContainedAmount` is where the recursion happens! Since the contained bags in a container bag may also contain bags, we pass each contained bag into the recursive function to calculate their own individual bags and so on. Ouf! That's a lot of bags! Let's try to find the amount of individual bags in the `shiny gold` bags described by this example:

```
shiny gold bags contain 2 dark blue bags.
dark blue bags contain 3 dark violet bags.
dark violet bags contain no other bags.
```

The formula for the `shiny gold` bags translates to:

```
shinyGoldBags = darkBlueAmount + darkBlueAmount * darkBlueContainedAmount
shinyGoldBags = 2 + 2 * darkBlueContainedAmount
```

The formula for the `darkBlueContainedAmount` translates to:

```
darkBlueContainedAmount = darkVioletAmount + darkVioletAmount * darkVioletContainedAmount
darkBlueContainedAmount = 3 + 3 * darkVioletContainedAmount
```

Since there are no contained bags in the `dark violet` bags, `darkVioletContainedAmount = 0`. Let's replace those variables in our formulas:

```
darkBlueContainedAmount = 3 + 3 * darkVioletContainedAmount
darkBlueContainedAmount = 3 + 3 * 0
darkBlueContainedAmount = 3
```

```
shinyGoldBags = 2 + 2 * darkBlueContainedAmount
shinyGoldBags = 2 + 2 * 3
shinyGoldBags = 8
```

There are `8` individual bags inside a `shiny gold` bag!

### Answer

4165
