# Day 8

## Challenge 2

After some careful analysis, you believe that exactly one instruction is corrupted.

Somewhere in the program, either a `jmp` is supposed to be a `nop`, or a `nop` is supposed to be a `jmp`. (No acc instructions were harmed in the corruption of this boot code.)

The program is supposed to terminate by attempting to execute an instruction immediately after the last instruction in the file. By changing exactly one `jmp` or `nop`, you can repair the boot code and make it terminate correctly.

For example, consider the same program from above:

```
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
```

If you change the first instruction from `nop +0` to `jmp +0`, it would create a single-instruction infinite loop, never leaving that instruction. If you change almost any of the `jmp` instructions, the program will still eventually find another `jmp` instruction and loop forever.

However, if you change the second-to-last instruction (from `jmp -4` to `nop -4`), the program terminates! The instructions are visited in this order:

```
nop +0  | 1
acc +1  | 2
jmp +4  | 3
acc +3  |
jmp -3  |
acc -99 |
acc +1  | 4
nop -4  | 5
acc +6  | 6
```

After the last instruction (`acc +6`), the program terminates by attempting to run the instruction below the last instruction in the file. With this change, after the program terminates, the accumulator contains the value `8` (`acc +1`, `acc +1`, `acc +6`).

Fix the program so that it terminates normally by changing exactly one `jmp` (to `nop`) or `nop` (to `jmp`). What is the value of the accumulator after the program terminates?

### Approach

I modified the original solution a bit. My approach for this will be trial and error. I think there's a way where you can analyze the operations beforehand, then find the correct operation to change and simply swap it accordingly, but I opted for the "simple and straightforward" way.

I added a new operation type: `eof`, which just tells me that we reached the end of the file. This operation is added at the end of the input `operations`.

I'll be keeping track of two things between each trials:

-   a `changeIndex` which represents the operation index that should be swapped.
-   a `reachedEof` boolean which tells me if the program ended without an infinite loop.

I wrapped my original for loop inside a while loop. This while loop will keep looping until we reached the end of the file (success) or the changeIndex is equal to the amount of operations (failure). Each time the while loop is executed, the `changeIndex` is incremented. When the for loop index (`i`) is equal to the `changeIndex` and it is not an `acc` operation, I swap `jmp` for `nop` or `nop` for `jmp`. Eventually, one of these swaps will not cause and infinite loop and we'll get the answer!

Because I always increment `changeIndex` by 1, this means that, sometimes, the `changeIndex` will also be applied to an `acc` operation. Even if we don't do any swaps when this happens, this means that every time the `changeIndex` is on an `acc` operation, the program will run like the first time and will produce the same results. A "faster" way of finding the solution would've been to set the `changeIndex` to the next `jmp` or `nop` operation.

### Answer

2212
