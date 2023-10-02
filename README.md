# File Compression Tool

This Command line tool project provides a simple implementation of Huffman encoding and decoding in TypeScript. Huffman coding is a popular algorithm for lossless data compression. It assigns shorter binary codes to more frequent characters and longer codes to less frequent characters, resulting in efficient data compression.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/giftthedeveloper/huffman-compression-tool.git
    ```

   ```
   npm install

   ```

## Usage ( Compression & Decompression)
To compress a file run the following command

```
npm run start compress <path to desired file>
```
This will automatically create a compressed-file.huff file. 


To decompress a file run the following command

```
npm run start decompress <path to compressed huf file>
```
This will automatically create a decompressed-file.txt file which will generate your original text back after decoding.


Certainly! Here's a simple yet informative README.md file for your project:

markdown

# Huffman Encoding and Decoding

This project provides a simple implementation of Huffman encoding and decoding in TypeScript. Huffman coding is a popular algorithm for lossless data compression. It assigns shorter binary codes to more frequent characters and longer codes to less frequent characters, resulting in efficient data compression.

## Usage

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/huffman-encoding.git

    Navigate to the project directory:

    bash

cd huffman-encoding

Install dependencies:

bash

    npm install

Compression

To compress a text file, run the following command:

bash

node main.ts compress input.txt

This command will generate a compressed file named compressed-input.txt. The compression process includes building a Huffman tree, creating a code table, and encoding the text.
Decompression

To decompress a compressed file, run the following command:

bash

node main.ts decompress compressed-input.txt

This command will produce a decompressed file named decompressed-input.txt, which should match the original input text.


### Project Structure

    main.ts: The main script for command-line interaction.
    huffman.ts: Contains the core Huffman encoding and decoding logic.
    encoding.ts: Encoding-related functions.
    decoding.ts: Decoding-related functions.
    tree.ts: Huffman tree and related data structures.
    package.json: Project dependencies and scripts.
    README.md: This documentation file.

### Thank you for using my tool!