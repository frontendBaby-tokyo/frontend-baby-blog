---
description: "Series: 'Living in a Zero-Trust Society: My Strange Daily Life Being Overwhelmed by a WEB3.0 Fundamentalist Engineer'"
pubDate: 2025-08-10T06:00:00.000Z
recommended: false
tags:
  - tags.genre.tech-light-novel
  - tags.tech.web3
title: "Episode 8: The Truth About NFTs, Part 1 — The Illusion of Digital Ownership"
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

### Episode 8: "The Truth About NFTs, Part 1 — The Illusion of Digital Ownership"

I hesitated with the USB drive from Mr. D in front of me.

“Before you open this USB, do it offline in your own sandboxed system.”

His words echoed in my head. Normally I’d laugh that off as overkill, but experience had taught me he always had reasons.

I unplugged Ethernet, disabled Wi‑Fi and Bluetooth, and prepared an “air‑gapped machine”—an old laptop freshly formatted with a clean OS. A basic practice Mr. D had drilled into me.

Plugging in the USB revealed a text file and an encrypted folder. The text read:

```
99% of NFT projects are scams or born of ignorance.
If you want the truth, come to the coordinates below at 8 PM tomorrow.
The password for the encrypted folder is the last 10 characters of the init command for the MEV defense system I taught you.
Physically destroy this USB after reading.
```

The coordinates pointed to a room in an old building a little ways from Akihabara.

The next day, I climbed five dimly lit flights of stairs to an unmarked door. When I knocked, a voice said, “State the passphrase.”

“Another joke?” I said, and the door opened.

Inside, projections of various NFT artworks covered the walls. Multiple monitors and server racks sat in the center. Mr. D wore a black hoodie at the monitors.

“Right on time.”

Beside him sat a woman I didn’t know.

“This is M. She’s an NFT artist and a cryptographer. Details unnecessary.”

M nodded politely—early thirties, sharp gaze, calm presence.

“Today’s topic: the truth about NFTs,” Mr. D said, pointing at an image on the wall. “What do you see?”

It was a high-profile, expensive NFT collection.

“An NFT. I think one traded for over 100 ETH last month.”

“Wrong,” Mr. D said flatly. “That’s an image destined for ‘404 Not Found.’”

He brought up the NFT’s metadata.

“Look. The token ID is on-chain. Where is the image?”

The metadata referenced `https://example-nft.io/metadata/1234.json`.

“A centralized server,” I said.

“Exactly. When that server dies, what will this NFT be?”

“A broken link...”

“Trash,” Mr. D said. “You paid thousands for a pointer on-chain. The actual asset depends on a centralized server.”

He showed another screen listing NFTs now showing “404 Not Found.”

“All lost due to service shutdowns and rug pulls. Combined market value: billions of yen.”

I gasped. I had no idea so many NFTs had effectively vanished.

“But recent NFTs use IPFS, right? Isn’t that safe?”

Mr. D and M exchanged a small smile.

“Common misconception,” Mr. D said. “IPFS is decentralized storage—but only if someone pins the data.”

M explained gently, “IPFS uses content addressing (CIDs) derived from the data itself. But unless someone is actually hosting (pinning) that content, it won’t be retrievable.”

Mr. D continued, “Many projects host metadata via IPFS gateways with no guarantee of permanent pinning. If gateways shut down, the data becomes inaccessible.”

He displayed an IPFS link of a project.

“Can you tell where this CID is hosted now?”

I shook my head.

“That’s the problem,” he said. “We don’t know. Host unknown; it could disappear any time. Can you call this ‘decentralized’?”

He walked to a server rack.

“This is my IPFS node. Runs 24/7 and pins metadata for valuable NFTs.”

LEDs blinked in rhythm across multiple drives.

“Currently hosting ~30TB. Backups in three geographically distributed locations. Solar and batteries for power backup, redundant internet.”

I was stunned by his thoroughness.

“Why go that far?”

“A mission as a digital archaeologist,” he said. “Much NFT data will disappear. It’s my role to prevent that.”

M added, “The beauty of IPFS is anyone can host. But that also means no one might host. Without people like Mr. D, much data vanishes.”

Mr. D showed a tool he called his “NFT Scam Detector,” which analyzes metadata structures and scores risk.

“This measures an NFT’s ‘true decentralization.’ Lower score means more centralized, more dangerous.”

He analyzed some popular projects and showed surprising results.

“This one scores 2.1/10. Metadata on centralized servers, images in AWS S3. Selling the illusion of ownership.”

Next, another project.

“Slightly better. 4.3/10. Metadata on IPFS, but pinning depends on a single org. If they disappear, so does the data.”

“Then what’s ideal?” I asked.

He smiled. “Next topic: on‑chain NFTs.”

He displayed a new NFT—simple at first glance, but complex on close look.

“This one is fully on‑chain. Metadata and image live directly on the blockchain.”

He opened the contract; the image was embedded as SVG.

“As long as Ethereum exists, this NFT persists. No central servers, no IPFS pinning required.”

M added, “This is what NFTs should be: truly decentralized and truly permanent digital assets.”

“There are challenges,” Mr. D continued. “On‑chain storage is expensive. Saving 1 MB costs a fortune in gas.”

He showed more code.

“So compression and encoding matter. SVG, Base64, even custom schemes to minimize bytes.”

I scribbled notes, trying to keep up.

“What’s the essence of NFTs?” he suddenly asked.

“Proof of ownership of digital assets...?”

“Half right. More fundamentally, ‘verifiable scarcity.’ Digital data can be copied infinitely, but blockchains can prove scarcity. That’s the revolution. But if that scarcity depends on centralized servers, it’s meaningless. True NFTs must be decentralized and permanent.”

He opened a safe and took out a small hardware wallet.

“I’ll show you ‘real NFTs.’”

He connected it, performed a complex authentication flow, and launched a special gallery app.

“My collection. All fully on‑chain.”

Abstract geometry, intricate pixel art, dynamic generative pieces—it was a diverse collection.

“These live entirely on-chain. True, permanent digital assets.”

He selected one and showed its code.

“Not just a static image—an algorithm running on-chain. It changes based on variables like owner address and block height.”

I was overwhelmed. This was a different dimension of NFTs.

“But such pieces are rare,” he said. “Less than 1% of NFTs, limited by gas and difficulty.”

M added, “That’s why they’re valuable—rarity and technical innovation.”

Mr. D checked the time. “That’s it for today.” He handed me a USB.

“Detailed material on on‑chain NFTs. Read it by next time.”

“Next time?”

“Part 2,” he smiled. “We’ll talk about the on‑chain revolution—and a project I’m secretly building.”

On the way out, M handed me a small card. “An access key to an on‑chain NFT. See for yourself.” It had an Ethereum address and token ID.

Back home, I investigated with Etherscan. The contract deviated from standard NFT patterns. Both metadata and image were implemented directly in the contract—and dynamically generated.

Decoding the code, I saw it generated unique patterns based on the owner’s on-chain history. The appearance differed for each owner.

“So this is a real NFT...”

Further digging revealed a hidden message triggered by a specific function. Using basics Mr. D taught me, I decrypted it:

```
True digital ownership is: unseizable, uncensorable, and permanent.
Only fully on‑chain code can realize it.
Next time, we’ll cover technical details and philosophical meaning.
Coordinates: [encrypted]
Time: Same time next week
```

I closed my laptop and looked out at the stars.

Mr. D’s words echoed: a “mission as a digital archaeologist.” Behind his extreme actions lay a philosophy of permanence and decentralization.

And I finally grasped his warning: many NFTs claim “decentralization” while depending on centralized infrastructure—an empty promise against Web3.0’s ideals.

I opened a popular marketplace. Through Mr. D’s lens, many listed NFTs felt like future “404 Not Found.”

“I’ll build an on‑chain NFT myself.”

I began coding, aiming to create a truly decentralized digital asset.

---

### Tech Tips
**IPFS**  
InterPlanetary File System, a decentralized file system using content addressing. Unlike HTTP’s location‑based URLs, IPFS identifies content by a CID (hash). It removes single points of failure and improves censorship resistance—but content must actually be hosted (pinned); unpinned content can disappear over time.

**NFT Metadata Pitfall**  
Many NFTs keep only the token on-chain while artwork and metadata live off-chain (servers or IPFS). These “off‑chain metadata” NFTs are cheaper to store but become broken links if those resources vanish—something that has already happened during shutdowns and rug pulls.

**On‑Chain NFTs**  
NFTs whose artwork and metadata are stored directly on-chain. Rare due to gas/storage constraints (e.g., Autoglyphs, Chain Runners, OnChainMonkey). They offer true permanence as long as the chain exists.

### **Next Episode Preview: "Episode 9: The Truth About NFTs, Part 2 — The On-Chain Revolution"**  
In Mr. D’s secret atelier, we dig into technical details and philosophy—SVG art, compression, gas optimization—and his “ultimate on‑chain NFT” project. What is the essence of digital ownership, and what kind of decentralization does Web3.0 truly seek?

---
*End of Episode 8*

