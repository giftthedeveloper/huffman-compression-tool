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

#### To compress a file run the following command

```
npm run start compress <path to desired file>
```
This will automatically create a compressed-file.huff file. 
You can also test it with my sample.txt present in the root directory of this project

```
    npm run start compress sanple.txt
```


#### To decompress a file run the following command

```
npm run start decompress <path to compressed huf file>
```
This will automatically create a decompressed-file.txt file which will generate your original text back after decoding.
You can test my sample.txt and compare the results of the original sample.txt with the decompressed-file.txt

```
    npm run start decompress compressed-file.huff
```



### Project Structure

    main.ts: The main script for command-line interaction.
    huffman.ts: Contains the core Huffman encoding and decoding logic.
    encoding.ts: Encoding-related functions.
    decoding.ts: Decoding-related functions.
    tree.ts: Huffman tree and related data structures.
    package.json: Project dependencies and scripts.
    README.md: This documentation file.


### Thank you for using my tool!