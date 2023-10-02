import { CodeTable } from "./huffman-tree";
import * as fs from 'fs-extra';

  export function writeCompressedText(outputFileName: string, encodedData: string) {
    const buffer = Buffer.from(encodedData, 'binary');
    fs.appendFileSync(outputFileName, buffer);
  }


    export function encodeText(text: string, codeTable: CodeTable): string {
    let encodedData = '';
    for (const char of text) {
      if (char === ' ') {
        encodedData += codeTable[' '];
      } else {
        encodedData += codeTable[char];
      }
    }
    return encodedData;
  }
  