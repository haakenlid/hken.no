import string
import time
import random
logo = """

          .?77777777777777$.
          777..777777777777$+
         .77    7777777777$$$
         .777 .7777777777$$$$
         .7777777777777$$$$$$
         ..........:77$$$$$$$
  .77777777777777777$$$$$$$$$.=======.
 777777777777777777$$$$$$$$$$.========
7777777777777777$$$$$$$$$$$$$.=========
77777777777777$$$$$$$$$$$$$$$.=========
777777777777$$$$$$$$$$$$$$$$ :========+.
77777777777$$$$$$$$$$$$$$+..=========++~
777777777$$..~=====================+++++
77777777$~.~~~~=~=================+++++.
777777$$$.~~~===================+++++++.
77777$$$$.~~==================++++++++:
 7$$$$$$$.==================++++++++++.
 .,$$$$$$.================++++++++++~.
         .=========~.........
         .=============++++++
         .===========+++..+++
         .==========+++.  .++
          ,=======++++++,,++,
          ..=====+++++++++=.
                ..~+=...

"""
lines = logo.splitlines()
longest = max(len(l) for l in lines)
target = '\n'.join('  %s  ' % l.ljust(longest) for l in lines)
chars = list(set(target + string.ascii_uppercase) - {'\n'})
attempt = ''.join('\n' for c in target)
# First attempt is just a bunch of newlines. This makes the
# text alignment correct after the first run through the loop

while target != attempt:
    attempt = ''.join(
        tc if tc == ac else random.choice(chars)
        for tc, ac in zip(target, attempt)
    )
    clearscreen = '\033c'  # linux terminal control character
    print(clearscreen + attempt)
    time.sleep(0.05)
