---
layout: tier-test
title: which sounds do you like?
permalink: /norobots/sound-tiers-3c91d2e4/
sitemap: false
media: /assets/media/sound-tiers
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
  - id: durock-mamba
    name: Durock Mamba
    image: /assets/img/switches/durock-mamba.webp
    tags: [Thocky]
  - id: novelkeys-cream
    name: NovelKeys Cream
    image: /assets/img/switches/novelkeys-cream.webp
    tags: [Thocky]
  - id: gateron-smoothie-silver
    name: Gateron Smoothie Silver
    image: /assets/img/switches/gateron-smoothie-silver.webp
    tags: [Thocky, Creamy]
  - id: gateron-sea-salt-smoothie
    name: Gateron Sea Salt Smoothie
    image: /assets/img/switches/gateron-sea-salt-smoothie.webp
    tags: [Creamy]
  - id: akko-piano-u1
    name: Akko Piano U1
    image: /assets/img/switches/akko-piano-u1.webp
    tags: [Creamy]
  - id: jerrzi-rain-bow
    name: Jerrzi Rain Bow
    image: /assets/img/switches/jerrzi-rain-bow.webp
    tags: [Creamy, Marbly]
  - id: kailh-rainy-whisper
    name: Kailh Rainy Whisper
    image: /assets/img/switches/kailh-rainy-whisper.webp
    tags: [Marbly]
  - id: durock-pom-piano
    name: Durock POM Piano
    image: /assets/img/switches/durock-pom-piano.webp
    tags: [Marbly]
  - id: akko-cs-vintage-white
    name: Akko CS Vintage White
    image: /assets/img/switches/akko-cs-vintage-white.webp
    tags: [Clacky]
  - id: dareu-blue-sky-v3
    name: Dareu Blue Sky V3
    image: /assets/img/switches/dareu-blue-sky-v3.webp
    tags: [Clacky]
  - id: gateron-oil-king
    name: Gateron Oil King
    image: /assets/img/switches/gateron-oil-king.webp
    tags: [Clacky, Thocky]
  - id: chosfox-poison-gas
    name: Chosfox Poison Gas
    image: /assets/img/switches/chosfox-poison-gas.webp
    tags: [Poppy]
  - id: gateron-baby-kangaroo
    name: Gateron Baby Kangaroo
    image: /assets/img/switches/gateron-baby-kangaroo.webp
    tags: [Poppy]
  - id: akko-stellar-rose
    name: Akko Stellar Rose
    image: /assets/img/switches/akko-stellar-rose.webp
    tags: [Poppy, Clacky]
  - id: kailh-box-white-v2
    name: Kailh BOX White V2
    image: /assets/img/switches/kailh-box-white-v2.webp
    tags: [Clicky]
  - id: kailh-box-jade
    name: Kailh BOX Jade
    image: /assets/img/switches/kailh-box-jade.webp
    tags: [Clicky]
  - id: gateron-melodic
    name: Gateron Melodic
    image: /assets/img/switches/gateron-melodic.webp
    tags: [Clicky, Typewriter]
  - id: real-alps-white
    name: Real ALPS White
    image: /assets/img/switches/real-alps-white.webp
    tags: [Typewriter]
  - id: outemu-matias-white
    name: Outemu Matias White
    image: /assets/img/switches/outemu-matias-white.webp
    tags: [Typewriter]
  - id: kailh-box-navy
    name: Kailh BOX Navy
    image: /assets/img/switches/kailh-box-navy.webp
    tags: [Typewriter, Clicky]
  - id: akko-fairy-silent
    name: Akko Fairy Silent
    image: /assets/img/switches/akko-fairy-silent.webp
    tags: [Silent]
  - id: durock-silent-dolphin
    name: Durock Silent Dolphin
    image: /assets/img/switches/durock-silent-dolphin.webp
    tags: [Silent]
  - id: kailh-box-silent-pink
    name: Kailh BOX Silent Pink
    image: /assets/img/switches/kailh-box-silent-pink.webp
    tags: [Silent, Muted]
  - id: gazzew-u4tx
    name: Gazzew U4Tx
    image: /assets/img/switches/gazzew-u4t.webp
    tags: [Muted]
  - id: akko-bittersweet
    name: Akko Bittersweet
    image: /assets/img/switches/akko-bittersweet.webp
    tags: [Muted, Thocky]
---

People in the keyboard community really like having these meaningless terms to define a "vibe" they get from their keyboard. since i had these files i did a analysis of the audio bands and this is pretty much what i think the non self explanatory ones like silent and typewriter mean.

- "Thocky" = lower pitched deeper and less high sounds usually 3khz and below only
- "Clicky" = higher pitched sounds and more high sounds from 8-16 khz
- "Typewriter" Both "Clicky" and "Thocky" just loud hollow sounding
- "Silent" this is self explanatory its silent
- "Creamy" Mid pitched sounds this is pretty much the opposite of "typewriter" closer to "Thocky" though
- "Marbly" "Clacky" and "Poppy" I could not find any meaningful correlation at all so they are made up feel words this might describe more of a feeling like poppy having strong springs that make the key pop up fast after typing but pretty much you cant feel that from listening.

Anyways this is just for fun and will help me get an idea of what you might like
