---
description: "Series: 'Living in a Zero-Trust Society: My Strange Daily Life Being Overwhelmed by a WEB3.0 Fundamentalist Engineer'"
pubDate: 2025-08-10T15:00:00.000Z
recommended: false
tags:
  - tags.genre.tech-light-novel
  - tags.tech.web3
title: "Episode 9: The Truth About NFTs, Part 2 — The On‑Chain Revolution"
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

### Episode 9: "The Truth About NFTs, Part 2 — The On‑Chain Revolution"

A week passed.

Armed with the on‑chain NFT knowledge Mr. D taught me, I tried building my own project. I got a simple SVG-based generative art piece deployed to a testnet—but hit a wall with gas optimization.

“Mainnet costs will be way too high...”

The gas estimate blew past my budget. How did Mr. D make efficient on‑chain NFTs?

I headed to the encrypted coordinates he had sent—this time, a corner of an old industrial zone away from the city center.

A rusty steel door’s camera scanned me; seconds later it opened.

Inside was a vast loft: cutting‑edge computers next to displayed artworks. Code scrolled across a wall‑sized projection; holographic displays hung from the ceiling.

“You’re here,” Mr. D said—dressed, unusually, in a black T‑shirt and jeans.

“This is my atelier. A space for creation and experimentation.”

M was there, coding in front of a huge display.

“Did you examine the NFT from last time?”

“Yes. Fully on‑chain, generating unique patterns from owner history. I also decrypted the hidden message.”

“Good. So you have basic crypto chops,” he nodded, then guided me to a central workstation.

“Today: technical details and philosophy of on‑chain NFTs.”

He displayed code and images from various projects.

“Definition first: a truly on‑chain NFT stores artwork, metadata, and logic directly on-chain.”

He showed multiple approaches: SVG-based, Base64-embedded images, and algorithmic art.

M added, “Storage is expensive. On Ethereum, each byte costs gas. Storing 1 MB can cost a fortune.”

“Hence compression and encoding,” Mr. D said. “For example, look at this SVG-based contract.”

```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory) {
    string memory svg = generateSVG(tokenId);
    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "OnChain Art #',
                    toString(tokenId),
                    '", "description": "Fully on-chain generative art", "image": "data:image/svg+xml;base64,',
                    Base64.encode(bytes(svg)),
                    '"}'
                )
            )
        )
    );
    return string(abi.encodePacked("data:application/json;base64,", json));
}
```

“Understand this?”

“It generates SVG, Base64‑encodes it, embeds it in JSON, then Base64‑encodes the JSON and returns it as a data URI.”

“Correct. That way, both metadata and image live on-chain, eliminating external dependencies.”

He showed a project using custom compression (RLE) to encode pixel data efficiently.

M gave a quick example: “AAAABBBCCDAA → 4A3B2C1D2A. We compress repetition. Real art compresses far better.”

“Palette compression is also powerful when color counts are limited,” Mr. D said, showing a tool that analyzes images and suggests optimal encodings with gas estimates.

I asked about my code. He immediately pointed out: “Verbose SVG. Compress paths, remove needless attributes, lower numeric precision—30%+ gas savings.”

He went into specifics: “Precision to one decimal is often enough; shorten color codes: use ‘#f00’ instead of ‘#ff0000’.” M added: “Use an optimizer like SVGO.”

Then he shifted: “Beyond technique, understand the philosophy.”

He showed the historical arc: from “proof of ownership” pointers to fully self‑contained digital assets.

“Essence of digital ownership: verifiable scarcity and permanent access. Off‑chain NFTs meet the first but not the second. On‑chain is essential.”

M added, “Distinguish art from speculation. True value lies in technical innovation and artistic expression.”

Mr. D nodded. “Exactly. I collect only technically innovative and artistically meaningful on‑chain NFTs.”

He led me to a special display.

“My latest project—Eternal Fragments.”

On screen, a complex generative piece flowed, geometry and color shifting continuously.

“Fully on‑chain and dynamic. It changes with time, owner address, network state.”

He showed the code—astonishingly efficient, creating rich visuals with minimal data.

“It includes ‘time’ as a concept. NFTs aren’t static—they evolve.”

M explained: “We use block timestamps as seeds and PRNGs to generate patterns—predictable yet ever‑changing.”

“There’s also ‘memory,’” Mr. D said. “Owner actions can permanently alter state.” He demonstrated a function call; the artwork subtly changed, adding new elements.

“Thus the owner forms a relationship with the NFT—it grows with you.”

I was enthralled.

“Challenges remain,” he admitted. “Gas cost, throughput, and the biggest: ‘the wall of understanding.’ Many can’t tell a JPEG link from a fully on‑chain NFT. Education is needed.”

He showed a timeline of “vanished NFT projects” once valued in the millions.

“They depended on centralized infra. This is the fate of faux decentralization.”

M spoke softly: “We aim for assets that still exist in 100 or 1,000 years.”

Then Mr. D turned to me. “Let’s talk about your project.”

I showed my code; he and M provided a stream of optimizations. Gas estimates plunged by ~60%.

“Now it’s deployable,” he said.

“Thank you!”

“But concept matters too,” he added. “Turn constraints into the art.”

He pointed to Eternal Fragments. “We treat storage limits as a creative source—mathematics for maximal expression with minimal data.”

“Like haiku,” M said. “Rich expression within strict constraints—that’s the charm of on‑chain art.”

We rethought my concept: from static SVG to dynamic, algorithmic generative art. After hours, we designed a new project: “Digital Echoes,” generating visuals from the owner’s wallet address—fully on‑chain.

“This has value, technically and artistically,” he said.

Between work, he shared his philosophy: “I insist on on‑chain NFTs to pursue true decentralization and permanence. Many projects mouth ‘decentralization’ while relying on centralized infra.”

M added, “In digital art, preservation and transmission are core problems. On‑chain NFTs can address them.”

He showed me a treasured piece: “Genesis,” a fully on‑chain NFT from 2017. “Technically and historically precious,” he said. “Back then it cost dollars; now it’d be tens of thousands. But the value isn’t money—it’s permanence. As long as Ethereum exists, this art persists.”

“Your ‘Digital Echoes’ shares the same philosophy,” he said, then handed me a sealed hardware wallet. “A gift. But I won’t set it up. Initialize it yourself.”

I followed strict procedures, generated a new seed, and shared only my public address.

“I’ve sent you a small amount of ETH and one NFT from my collection. Verify via your own full node.”

Minutes later, the wallet showed ETH and an NFT.

“Thank you. I’ll treasure it.”

“Use it,” he smiled. “Knowledge gains value when shared. Practice—and advance it.”

Back home, I checked: the NFT was part of Eternal Fragments. Its patterns hid a subtle message only visible at certain angles: “True revolutions happen where no one is looking.”

I resumed building Digital Echoes, determined to create a truly decentralized, permanent asset.

Weeks later, I deployed to mainnet. Gas costs were lower than expected—thanks to their advice. Minting the first piece left me speechless. It wasn’t just digital art; it was my creation, living permanently on-chain.

Mr. D replied, unusually warmly: “Well done. You’ve taken your first step as an on‑chain artist. Next time: the truth about DAOs.”

---

### Tech Tips
**Techniques for On‑Chain NFTs**  
1) SVG‑based images as text embedded in metadata; 2) Base64‑encoding for data URIs; 3) Compression like RLE or palette compression; 4) Generative algorithms (fractals, Perlin noise, cellular automata) for rich visuals from minimal code.

**Digital Archaeology**  
An emerging practice of preserving, restoring, and interpreting digital assets. With blockchains’ immutability and permanence, on‑chain storage becomes a powerful tool to safeguard digital culture for future generations.

### **Next Episode Preview: "Episode 10: The Truth About DAOs"**  
“Decentralized Autonomous Organizations” promise governance without centralized power—but Mr. D warns most are decentralization in name only. Token distribution, multisig centralization, voting vulnerabilities... What truths will he reveal, and what is the surprising reality of the truly decentralized organization he secretly participates in?

---
*End of Episode 9*

