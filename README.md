Arduino Blinker
---------------

---

BLINK is Back!
--------------

Below is a simple tool to generate blink sketch for your Arduino. Follow the steps below. Enjoy!

1. Click "Start Recording" button.
2. Pick a letter on the keyboard to use as recording key. I use letter "B" (as in blink).
3. Press down the key multiple times on different timings. Down means ON and release means OFF.
4. When done, press "Stop Recording" button.
5. Press "Preview" to replay what you have recorded.
6. When your happy with the output, copy-paste the code on the textbox to your Arduino IDE.


See it in action!
-----------------

http://codepen.io/third/details/IGCfo


Motivation
----------


I got an Arduino UNO when I attended JSConf 2013 last May. I have seen very cool robot stuff at the conference so I thought I should learn how to program for Arduino during my free time.

Lately, I see a lot of topics about robots on my Twitter feed so I decided to pull my Arduino e-book and started reading. The first coding topic was about "blinking LED". The code was straight forward - assign a digital pin as an output then turn on and turn off the digital pin after a second. Whoa, awesome! Then I thought I should make a little bit complex blinking pattern. I thought about the honk sound that me and my cousins used to make. I was trying to find a reference and it looks like the sound that I am referring is similar to an [SMS tone](http://www.youtube.com/watch?v=scFR4sYnVDc). I wanted to translate that sound into blinks such that I can play that sound in my head while watching my Arduino blink. I was trying to compose that directly into my Arduino IDE. I was only on the first couple of blinks and I find it hard to recreate. One thing I notice though is that I started moving my arms up and down like an orchestra conductor in trying to get the exact delay in turning on and turning off the LED. Then, Eureka! It came to me that I can do the same with the help of a keyboard and let the computer calculate the timings for me so I quickly created Arduino Blinker using Javascript, HTML and CSS. 

I know that this is a very simple tool and not a rocket science. Let's face it, it's only blinking lights and does nothing special. You might find it boring after several tries. What I'm trying to show here is that, you can always create simple tools that will help you achieve complex things. And most of the time, I like it better when it starts to get boring because that is the time when I started thinking again for the next level.