# Day 3

## Challenge 2

Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

```
Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
```

In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?

### Approach

Thankfully, the challenge 1 was written with this kind of "extensibility". A few tweaks to allow multiple slopes and do the multiplication was all it took to complete this challenge.

By looping through each given slope, I would do the same thing I did for the first challenge. Instead of having the `RIGHT` and `DOWN` constants, these numbers came from each slope. At the end, I would multiply the amount of trees found by the previous accumulated value.

However, I did run into a problem that took me longer than it should have to fix. Take a look at this piece of code that contains the mistake (without watching the solution yet!):

```ts
for (let row = 0; row < lines.length; row += slope.down) {
    pos.y = row;
    const col = row * slope.right;
    /* ... */
```

Can you spot the mistake? Look at the loop declaration where I did `row += slope.down`. It makes sense, because we are going down by the amount `slope.down` is going. However, `col` is calculated using that same `row`. The mistake wasn't spotted in the first challenge, because `DOWN` was set to 1, which was sort of at the back of my mind when doing it the first time, since I expected it to always be multiplied by 1. However, the last slope has a `down` of 2 and a `right` of 1. What would happen is that, on the second line of the input, for example, `col` should have been at 2, because `row * right = 2 * 1 = 2`. However, because `row` was being incremented by 2, the calculated result would actually be `row * right = 4 * 1 = 4`. I didn't spot the error until I started logging each coordinates of the 5th slope:

```ts
for (let row = 0; row < lines.length; row += 1) {
    pos.y = row * slope.down;
    const col = row * slope.right;
```

### Answer

2655892800
