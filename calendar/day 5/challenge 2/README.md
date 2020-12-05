# Day 5

## Challenge 2

Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?

### Approach

Extending on the previous solution, I sorted the seat IDs in ascending order. Then, from the first seat, I would keep going 1 seat ID above until I found a seat ID that I did not have in my list.

### Answer

678
