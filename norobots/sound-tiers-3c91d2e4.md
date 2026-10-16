---
layout: tier-test
title: which sounds do you like?
permalink: /norobots/sound-tiers-3c91d2e4/
sitemap: false
media: /assets/media/switch-test
questions:
  - id: devices
    text: Which devices do you use or want to use a keyboard on?
    pick: any
    other: true
    options:
      - { label: "Win PC", means: "Windows layout" }
      - { label: "Mac PC", means: "Mac layout (Cmd and Option keys)" }
      - { label: "Macbook", means: "Mac layout, used to a low laptop keyboard" }
      - { label: "Win Laptop", means: "Windows layout, used to a low laptop keyboard" }
      - { label: "Chromebook", means: "ChromeOS layout" }
      - { label: "Tablet", means: "wireless (Bluetooth), compact" }
  - id: wrists
    text: Do you rest your wrists on the desk while typing?
    pick: one
    options:
      - { label: "Yes, my hands rest on the desk/laptop", means: "low profile, or a wrist rest" }
      - { label: "No, my hands float above the keyboard", means: "any profile" }
  - id: feel
    text: Which sounds like the best experience for a button.
    pick: one
    options:
      - { label: "A smooth glide straight down without any push back.", means: "linear" }
      - { label: "A little bump and push back that tells you when the key has been pressed.", means: "tactile" }
      - { label: "A big bump and a click that you can hear like a pen.", means: "clicky" }
  - id: actuation
    text: Do you want a key register the moment you touch it? Or do you want it to register only after a certain amount of force?
    pick: one
    options:
      - { label: "It should activate even if i barely tap the keycap", means: "very short pre-travel, light spring" }
      - { label: "It should activate early but not instantly tapping the top of the cap shouldn't activate the key", means: "short pre-travel" }
      - { label: "It should activate near the center of the press so only when i definitely mean it", means: "standard pre-travel" }
      - { label: "It should activate pretty much only when the entire key is pressed all the way down.", means: "long pre-travel, heavier spring" }
  - id: volume
    text: How loud do you want your keyboard?
    pick: one
    options:
      - { label: "As silent as possible (office, shared living spaces)", means: "Silent, Muted" }
      - { label: "A soft but audible sound", means: "Muted, Creamy, Thocky" }
      - { label: "Not too loud but definitely noticeable", means: "Thocky, Marbly, Poppy" }
      - { label: "Loud and proud so i can hear myself clack away", means: "Clacky, Clicky, Typewriter" }
  - id: experience
    text: Which of these describe your typing experience?
    pick: any
    options:
      - { label: "I type for more than 4 hours a day", means: "lighter spring" }
      - { label: "I feel like my keys are too light", means: "heavier spring" }
      - { label: "I often press keys by mistake by resting my fingers on them", means: "heavier spring, longer pre-travel" }
      - { label: "I make typos when keys register earlier than i expect", means: "longer pre-travel" }
      - { label: "I gently type and barely touch the keys", means: "light spring, linear" }
      - { label: "I hit the keys hard and make sure to always reach the bottom", means: "heavier spring, bottom-out sound matters most" }
      - { label: "I usually stop before i hit the bottom of the key", means: "tactile" }
      - { label: "I usually use it in a shared space and need it to be quiet", means: "Silent, Muted" }
      - { label: "I touch type with fingers on F and J", means: "sculpted keycaps (Cherry, OEM)" }
      - { label: "I look at the keys alot", means: "keycaps with clear, high-contrast legends" }
      - { label: "When switching rows my fingers tend to hit against the top of other keys", means: "different key profile" }
      - { label: "When typing my fingers often slip off the key causing typos", means: "different key profile" }
      - { label: "My wrists hurt when i use the keyboard all day", means: "low profile" }
      - { label: "My fingers hurt when i use the keyboard all day", means: "lighter spring" }
      - { label: "I like having the number pad all the time", means: "full size, or a separate numpad" }
      - { label: "I like having the FKeys all the time (F1-F12)", means: "75% or larger" }
      - { label: "I like having the arrow keys all the time", means: "65% or larger" }
      - { label: "I like having the home, end, print screen, etc buttons all the time", means: "TKL (tenkeyless) or larger" }
      - { label: "I like having a volume knob or media keys", means: "a knob or media keys" }
switches:
  - id: k1
    name: Gazzew U4T
    image: /assets/img/switch-test/gazzew-u4t.webp
    tags: [Thocky]
  - id: k4
    name: Box Jade
    image: /assets/img/switch-test/box-jade.webp
    tags: [Clicky]
  - id: k6
    name: Gateron Melodic
    image: /assets/img/switch-test/gateron-melodic.webp
    tags: [Clicky]
  - id: k3
    name: Real ALPS White
    image: /assets/img/switch-test/real-alps-white.webp
    tags: [Clicky, Typewriter]
  - id: k5
    name: Outemu Matias White
    image: /assets/img/switch-test/outemu-matias-white.webp
    tags: [Clicky, Typewriter]
---
