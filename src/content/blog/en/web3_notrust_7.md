---
description: "Series: 'Living in a Zero-Trust Society: My Strange Daily Life Being Overwhelmed by a WEB3.0 Fundamentalist Engineer'"
pubDate: 2025-08-10T00:00:00.000Z
recommended: false
tags:
  - tags.genre.tech-light-novel
  - tags.tech.web3
title: "Episode 7: The Dark Side of Decentralized Exchanges"
---

## Living in a Zero-Trust Society: My Strange Daily Life Being Overwhelmed by a WEB3.0 Fundamentalist Engineer / Can't Use DApps Without Running a Full Node!

### Note

This story is written with the assistance of generative AI for the purpose of making the Web3.0 world enjoyable to learn about.
While we pay careful attention to the accuracy of technical information, we cannot guarantee that all content is completely accurate.
Please use this as a supplementary learning tool and enjoy it with a relaxed mindset.

---

### Characters

*   **I:** A novice developer who recently transitioned from being a DTP operator to an engineer
*   **Mr. D:** A Web3.0 fundamentalist in his mid-40s with extreme vigilance

---

### Episode 7: "The Dark Side of Decentralized Exchanges"

With the “MEV defense device” I’d received from Mr. D, I immersed myself at home in verifying smart contracts. The recent rug pull incident had become big news in crypto circles. On Twitter, angry victims were crying out: “Fooled by 30% APY,” “I lost everything.”

“If I had invested in that...”

A chill ran down my spine. Without Mr. D’s warning, I might have been a victim too. I felt ashamed for laughing at his extreme caution.

My phone vibrated: an encrypted message from Mr. D.

We’ll talk about decentralized exchanges.  
Tomorrow 6 PM, Akihabara Electric Town.  
Different venue this time. Too many eyes.  
Coordinates: [encrypted]  
No reply. Come if you will.

A note at the end said, “This message self-destructs in 30 seconds.” I thought it was a joke, but it actually vanished.

The next day, I arrived at the designated place. The decrypted coordinates pointed to a room in an old building. I climbed the stairs and stood at an unmarked door.

When I knocked, a voice asked, “State the passphrase.”

“Huh? Passphrase?”

“Just kidding. Come in.”

Mr. D appeared. Instead of his usual black jacket, he wore a flashy aloha shirt. A disguise?

“You’re not late. Good.”

Inside was a mind-blowing sight: walls covered in a Faraday cage, odd antenna-like devices hanging from the ceiling, entire walls of monitors, several server racks, and a massive central workbench. Like a hacker’s secret base straight out of Hollywood.

“What is this place?”

“A DEX monitoring station,” Mr. D said proudly. “Only trusted allies know this place. Out of reach of centralized surveillance.”

He tapped the wall. “Faraday cage. Government bugs emit EM radiation. It’s fully isolated here.”

In one corner, a man I didn’t know worked before multiple monitors.

“That’s K. Details unnecessary.”

K didn’t look back—just raised a hand.

“Did you remove your phone battery before entering?” Mr. D suddenly asked.

“Uh... no?”

He handed me a small metal box with a look of exasperation. “Put it in. Devices can transmit location even when ‘off.’ Either physically remove the battery, or use this RF-shielded box.”

I obeyed. “Also, check your shoe soles. GPS trackers can be embedded, especially in new shoes.”

Skeptical, I checked. Of course, I found nothing.

Mr. D’s backpack opened slightly, revealing its contents: several hardware wallets wrapped in RF shielding cloth, a homemade air-quality sensor, a radiation detector, multiple burner phones, a waterproof seed-storage case, and an envelope labeled “Emergency Escape Plan.”

“What are you looking at?” he snapped. “This is a survival kit. Prepared for collapse in the physical world as well as the digital. You should have one too.”

He led me to the central bench covered with monitors and strange homebrew devices.

“Today we cover the dark side of DEXs.”

He typed, bringing up charts and code.

“But first, a quick test,” he declared, setting a timer. “You have three minutes.”

The questions were shockingly technical: “Depth of Ethereum’s Merkle Patricia Tree?” “Gas calculation post-EIP‑1559?” “What constrains max flash-loan size?”

Seeing me struggle, he said calmly, “Without fundamentals, you won’t survive DEX land. Without this, you’re prey for MEV hunters.”

When I finished, he graded me mercilessly. “Sixty. Bare pass. Aim for 80 next time.” He handed me a thick packet. “Memorize it. It’s survival knowledge.”

“Start with basics. What is a DEX?”

“A platform where crypto can be exchanged via smart contracts without a centralized operator...?”

“Mostly correct,” he nodded. “But don’t be fooled by ‘decentralized.’ Many DEXs hide centralized elements.”

He displayed AMM mechanics.

“The core is simple: there’s a liquidity pool, and prices are determined by x×y=k. Swaps change the pool ratio and thus the price.”

“Biggest difference from CEX is order books. DEXs don’t have traditional books; algorithms do everything.”

I took notes. His explanations were dense but always hit the core.

“Now the risks.” He showed a screen listing Front-running, Sandwich Attacks, MEV.

“These exploit blockchain transparency. What’s front-running?”

“Submitting a similar trade ahead of someone else’s pending trade to profit?”

“Correct,” he said, unusually praising me. “Once your tx hits the mempool, it’s public worldwide. Attackers can front-run you and profit by shifting the price.”

He explained sandwich attacks too—bracketing a victim’s trade with attacker trades to manipulate price.

“The most serious is MEV: Miner (now Validator) Extractable Value.”

He booted a homemade “MEV scanner.” On-screen, live blockchain traffic appeared.

“Look.” A large trade was about to execute; tiny trades were inserted right before and after.

“That’s a sandwich. It’s happening right now.”

I gasped—this wasn’t a textbook illustration but a real attack unfolding.

“The victim lost about 0.5 ETH,” he analyzed coolly. “Because they set slippage to 1%. A foolish setting.”

“What’s slippage?”

“The acceptable price deviation at execution,” he said. “Slippage protects your life. Setting ≥1% is like leaving your door unlocked.” He showed his own settings: slippage 0.1%.

“Ideal is 0.1%. Anything higher is unacceptable. A failed trade is better than losing assets.”

He taught defensive practices for DEXs:

“First, use a private mempool (e.g., Flashbots) so your tx isn’t broadcast to the public mempool—reduces MEV exposure.”

“Second, timing. Target low gas/low congestion windows—like when the U.S. sleeps.”

He also showed his homemade “MEV defense system” that splits a large trade into smaller random-timed parts.

“Big trades invite MEV. Split and anonymize your profile.”

“DEXs aren’t ‘safe’—often you fight invisible enemies,” he said. “Do privacy hygiene first.” He chained multiple VPNs, launched Tor, then a browser inside a VM inside another VM. “Still insufficient.” He booted a custom OS from USB. “Wrote this from the kernel up.”

It required three-factor auth and a ritual of steps just to boot. Half exasperated, half impressed, I watched.

“This is baseline security protocol,” he said matter-of-factly. “Make it a habit.”

Between work, he—rarely—talked about his past.

“I used to be a security engineer at a major exchange.”

I stared. He’d never shared his past before.

“I couldn’t stand the internal manipulations and misconduct. Exchanges freely moved customer assets; price manipulation was routine. That’s why I embraced Web3.0.”

He grimaced at the memory.

“But Web3.0 isn’t perfect either. New forms of centralization are advancing. MEV is one example.”

He sighed. “Do you think I’m extreme? What’s extreme is trusting strangers’ code blindly without the knowledge to protect your own assets.”

His words carried weight—a philosophy forged by experience.

“Finally, something important.” He displayed: “DEXes You Must Never Use.”

Shockingly, even popular names were listed.

“Why? These projects are famous.”

“Fame is dangerous,” he said flatly. “Reasons vary: backdoors, dev keys concentrated in a single multisig, partially closed-source code...” He highlighted one popular DEX.

“See here: an ‘emergency stop’ function. If devs deem an ‘emergency,’ they can halt all trading. That’s centralized power.”

I was stunned. A platform trusted by many, with such issues...

“Then which DEX is safe?”

He showed a short list. “These are relatively trustworthy. But nothing is 100% safe. Always verify yourself.”

He ended by showing his DEX risk‑rating system analyzing code, governance, and dev distribution.

“Use it—but don’t trust it blindly. It’s only a reference.”

As I left, he handed me a tiny USB.

“Next time: the truth about NFTs. Prep materials are inside.” He added seriously, “Open it only offline in your own sandbox. Don’t trust commercial AV. They beam your data to central servers.”

I accepted it with a wry smile. His paranoia can be comical, but there’s always logic behind it—that’s what gives his words weight.

“Also, before you open it, microwave it three times for ten seconds each.”

“What? Wouldn’t that destroy it?”

“Kidding,” he actually smiled. “But if you believed me, you still have much to learn.”

On the way home, I recalled his words: “To fight on an unseen battlefield, you need unseen weapons.”

The DEX world, beneath the ‘decentralized’ surface, hides new centralizations and asymmetries. To see through them and defend yourself, you need deep knowledge and vigilance.

I resolved to build my own MEV defense system. Time to put his lessons into practice.

Back home, I opened my laptop and began designing, using his code as reference. It felt like learning a new language, but I moved forward, one step at a time.

I held the USB, remembering his words. “The truth about NFTs”—what did he mean? What does he call a “real NFT”? I couldn’t wait for the next lesson.

---

### Tech Tips
**MEV (Miner/Validator Extractable Value)**  
Profit obtained by manipulating transaction ordering. Because miners/validators can control ordering, they can insert profitable patterns like sandwich attacks. MEV is estimated to be a multi‑billion‑dollar market annually.

**Front‑running**  
Seeing someone’s pending transaction and submitting a higher‑priority one to get executed first. Example: buy before them to push price up, then sell after.

**Private Mempool**  
Instead of broadcasting to the public mempool, submit directly to miners/validators (e.g., Flashbots) to reduce MEV exposure.

### **Next Episode Preview: "Episode 8: The Truth About NFTs"**  
Touted as a “revolution in digital ownership,” NFTs come under Mr. D’s scalpel: “99% are fraud or ignorance.” Metadata fragility, misconceptions about IPFS, off‑chain vs on‑chain... What truths will he reveal? And what’s the surprising nature of the “real NFT art” he secretly collects...?

---
*End of Episode 7*

