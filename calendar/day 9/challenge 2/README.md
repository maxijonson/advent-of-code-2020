# Day 9

## Challenge 2

The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

Again consider the above example:

```
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
```

In this list, adding up all of the numbers from `15` through `40` produces the invalid number from step 1, `127`. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are `15` and `47`, producing `62`.

What is the encryption weakness in your XMAS-encrypted list of numbers?

### Approach

Without changing anything from the first solution, I added another loop after finding the faulty number. This one would be to get the index of the first number of the `set`. Then, for each number after this number, I add it to the `set` and sum the `set`. If the sum is greater than the faulty number, then I restart the whole process, but the first number is now the number AFTER the one we previously had. If the sum is equal to the faulty number, then it means the `set` of numbers is correct! I can then simply sum the `min` and the `max` together and get the answer!

### Answer

93727241
