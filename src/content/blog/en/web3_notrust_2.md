---
description: "Series: 'Living in a Zero-Trust Society: My Strange Daily Life Being Overwhelmed by a WEB3.0 Fundamentalist Engineer'"
pubDate: 2025-08-09T03:00:00.000Z
recommended: false
tags:
  - tags.genre.tech-light-novel
  - tags.tech.web3
title: "Episode 2: Run a Full Node or Die"
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

### Episode 2: "Run a Full Node or Die"

A week had passed since I received the USB drive from Mr. D.

When I decrypted the encrypted message, it contained multiple contact methods and just a short sentence: "Let's meet tomorrow at a certain cafe in Akihabara."

At the specified time, I nervously made my way to the cafe. Looking around the interior, I spotted Mr. D at a table in the back. He was operating a laptop while warily surveying his surroundings.

"You're late."

As I took my seat, Mr. D said just that one phrase.

"Sorry, the train was..."

"Excuses are unnecessary. Today I have something important to discuss."

Mr. D turned his laptop screen toward me. Displayed there was the website of a DApp I had recently begun working on in development.

"You seem to be using this DApp."

"Yes, for a company development project..."

"How are you accessing it?"

"Normally through a browser..."

Mr. D's expression instantly became grim. He half-tumbled from his chair, clutching his chest as if he were having a heart attack.

"'Normally'?" he said in a voice that was low but clearly filled with anger. "Are you really working on Web3.0-related projects?"

I answered in confusion.

"Yes... I installed MetaMask, accessed the official website, connected my wallet..."

"Reckless beyond belief!" Mr. D declared in a low but forceful voice. "Using DApps without a full node is like running blindfolded through a minefield! No, it's like being tied hand and foot, blindfolded, with a bomb strapped to your back, tightrope walking over an acid pool filled with swimming sharks!"

I almost burst out laughing at his exaggerated metaphor, but held back when I saw Mr. D's serious expression.

"Think about it. What are you trusting? The browser? Website hosting? Frontend code? MetaMask's source code? RPC providers?"

Mr. D enumerated each point, raising his fingers one by one.

"RPC providers?" I tilted my head at the unfamiliar term.

"What!" Mr. D's eyes widened. "You don't even know that? Using DApps without knowing about RPC providers... this is more serious than I imagined."

He took a deep breath and began explaining like a teacher.

"RPC provider stands for Remote Procedure Call Provider. It's an intermediary service that connects your wallet to the blockchain. MetaMask connects to RPC providers like Infura behind the scenes. All the data you read from the blockchain, all the transactions you write—everything goes through their servers."

"So you mean it's a centralized service?"

"Exactly!" Mr. D showed a slightly satisfied expression at my understanding. "Where's the guarantee that the information they provide is correct? Where's the guarantee that they won't censor transactions?"

I listened in silence. Mr. D's words seemed extreme, but logically they made sense.

"The revolutionary aspect of Web3.0 is that you can verify data yourself without depending on centralized authority. However, most users abandon that right and depend on centralized services again. This is no different from conventional web."

Mr. D reopened the laptop on the table and showed me a terminal screen.

"Before using this DApp, I carefully cloned the source code from GitHub and scrutinized all packages including dependencies. Specifically, I thoroughly checked whether there were any malicious functions in the JavaScript code, any suspicious API calls, or any embedded tracking code."

He continued scrolling.

"And I also confirmed which contract addresses to send what kinds of requests to and what kinds of responses to receive. Unverified contract addresses are out of the question!"

Mr. D's passionate speech continued.

"Is the information displayed in the UI properly processed from RPC endpoint information? Are the permissions requested during wallet connection limited to the absolute minimum? Only after confirming all of these things am I finally ready to use the DApp."

He paused and waited for my reaction.

"That's... quite thorough," I answered while choosing my words carefully. "But I don't think it's realistic for ordinary users to go that far."

"Of course not," Mr. D agreed, surprisingly. "That's exactly why the ideals of Web3.0 have become mere formalities. However, as a minimum self-defense measure, running your own full node is essential."

"Full node?"

"An Ethereum full node. You maintain and verify all blockchain data yourself. This eliminates at least the dependence on RPC providers."

Mr. D pulled a small portable SSD from his backpack.

"This contains an Ethereum Geth client and detailed instructions for building a full node. First, try setting up a test node on your home PC."

As I received the SSD, I asked:

"But doesn't running a full node require a huge amount of disk space? Wouldn't synchronization also take a long time?"

"Quiz time," Mr. D suddenly straightened up. "How long do you think it takes to synchronize an Ethereum full node?"

"Um... a few hours?"

Mr. D snorted.

"Too naive! Several days. Sometimes it can take over a week. But that's exactly the beauty of blockchain. To verify every transaction with your own eyes requires that much time."

He continued.

"A current Ethereum full node requires about 500GB. A standard SSD can handle it adequately. The initial sync might take several days, but once synchronized, you only need to fetch the latest blocks afterward."

Mr. D operated his laptop and remotely connected to his home server. The screen displayed multiple terminal windows with various logs flowing through them.

"This is my full node environment. I'm running full nodes for Ethereum, Polygon, and several other chains."

He pointed to one terminal window.

"The sync mode is full. Archive isn't necessary, but light mode is out of the question. You need to verify all block headers and block bodies yourself."

I peered at the screen. Indeed, multiple blockchain nodes appeared to be running.

"That's impressive... but setting up this much hardware..."

"Think of it as an investment," Mr. D said immediately. "If you're handling assets in the Web3.0 world, investing in their security is natural. You consider security systems when buying a car, right? You think about locks and alarm systems when buying a house, right? It's the same thing."

He put down his coffee cup and looked at me with a serious expression.

"In the Web3.0 world, you can only ensure your own safety yourself. If you depend on someone else, you immediately revert to a centralized system. And centralized systems inevitably become corrupt."

I nodded silently. There was merit to Mr. D's words.

At that moment, a server approached our table.

"Excuse me, would you like to order anything else?"

Mr. D looked up at the server and asked with a serious expression:

"Is this coffee's origin blockchain-verified?"

The server clearly looked confused.

"Uh? I'm sorry... that's..."

"Bean origin, harvest date, transport route, roasting date and time... without these being verifiable on the blockchain, it can't truly be called 'fair trade.'"

The server looked around as if seeking help.

"I apologize... we don't have such certificates..."

"Understood," Mr. D said resignedly. "The world isn't ready yet. Regular coffee will be fine."

After the server left, Mr. D added in a low voice:

"In the future, all products will be tracked on blockchain. Until then, we have no choice but to blindly depend on 'trust.'"

"When I get home today, I'll check the contents of this SSD and try building a test node."

Mr. D's expression softened slightly.

"Good decision. If you have questions, contact me through encrypted channels."

Mr. D stood up and headed to the register. I was a bit surprised. Last time he had refused to pay.

He was explaining something to the cashier. When I approached, Mr. D was saying with a serious expression:

"This coffee payment should be recorded as a verifiable transaction on the blockchain. However, your establishment isn't yet technically prepared for that. Therefore, this transaction needs to be processed as an 'off-chain transaction.'"

While the cashier looked confused, Mr. D pointed at me.

"He will function as my 'payment channel.' By paying with fiat currency through him, I can avoid direct contact with centralized systems myself. This is similar to the principles of the Lightning Network."

Before I knew it, I was once again paying for Mr. D's coffee.

Mr. D nodded with satisfaction and added as he was leaving:

"Also, I recommend ordering pizza during node synchronization."

"Pizza?"

"Bitcoin's historic moment—the first time a physical product was purchased with Bitcoin was pizza. Don't you know the story of the man who bought two pizzas for 10,000 BTC?"

I shook my head.

"Pizza suits blockchain's historic moments," Mr. D said with an unusually soft expression. "I always order pizza when synchronizing nodes at home. Think of it as tradition."

After Mr. D left, I stared at the SSD while lost in thought. His extreme vigilance sometimes seems comical, but the philosophy underlying it might not be wrong.

That night, I connected the SSD to my home PC and began building an Ethereum test node following Mr. D's instructions. The screen displayed Geth client initialization messages, and block synchronization began.

"Block height: 1,245... still a long way to go."

I muttered while picking up my smartphone.

"Should I order pizza delivery... pizza apparently suits blockchain's historic moments."

Remembering Mr. D's words, I ordered pizza.

"Trust nothing. Believe only in code you've verified with your own eyes."

I would gradually come to understand the meaning of these words.

### **Tech Tips**
**Full Node** refers to a computer that maintains the complete transaction history of a blockchain and verifies it independently. By running a full node, you can verify the validity of transactions and blocks yourself without depending on third-party services. For Ethereum, you can build a full node using client software like Geth (Go Ethereum) or OpenEthereum.

**RPC Provider** (Remote Procedure Call Provider) is a service that provides an interface for interacting with blockchains. Famous providers include Infura, Alchemy, and QuickNode, and many DApps and wallets use these services to access blockchains. While convenient, they can become centralized points of failure, which diverges from Web3.0 ideals.

**Minified JavaScript** refers to JavaScript code that has been compressed by removing whitespace, line breaks, and comments, and shortening variable names to reduce file size. While widely used to improve website loading speeds, it becomes difficult for humans to read, raising security concerns as malicious code becomes harder to detect.

### **Next Episode Preview: "Episode 3: MetaMask Can't Be Trusted"**  
Mr. D's next lesson was about wallet selection. "Using MetaMask just because it's popular? Don't make me laugh," says Mr. D. What is his recommended "correct" way to use wallets...?

---
*End of Episode 2*
