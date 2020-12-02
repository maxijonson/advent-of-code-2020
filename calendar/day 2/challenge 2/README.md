# Day 2

## Challenge 2

While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.

The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

Given the same example list from above:

1-3 a: abcde is valid: position 1 contains a and position 3 does not. \
1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b. \
2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

How many passwords are valid according to the new interpretation of the policies?

### Approach

The only change from the last challenge is the check at the end. Instead of counting the amount of times the character appears, I checked both positions in the password and checked if they match the character. If exactly one does, than we count it as a valid password.

I had a small issue where I wanted to use the XOR operator (^). However, in TypeScript, the operator is not supported. I found out that simply using `!=` does the job, because

-   `true != false` is `true`
-   `true != true` is `false`
-   `false != false` is `false`

Which translates to an XOR, in this case.

### Answer

509
