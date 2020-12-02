# Day 2

## Challenge 1

### Approach

The harder challenge here is to parse each line so we can make assertions (and it's not even that hard!). A line consists of 4 things:

-   `minimum`
-   `maximum`
-   `the character to check`
-   `the password`

Once we parse this information, we can simply check if `the character to check` appears between the `minimum` and the `maximum` in `the password`. If it does, we increment a counter. That counter is outputed once the entire file has been parsed.

### Answer

434
