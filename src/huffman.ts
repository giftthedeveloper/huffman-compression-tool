import * as fs from 'fs-extra';
import { countCharFrequency, buildTree, generateCodeTable, buildTreeFromCodeTable, readHeader } from './huffman-tree';
import { WriteHeaderSection, decodeData, readCompressedText } from './decoding';
import { encodeText, writeCompressedText } from './encoding';

export function encodeAndCompress(inputFile: string) {

  const filename = inputFile
  const text = fs.readFileSync(filename, 'utf-8');
  const frequencyMap = countCharFrequency(filename);
  const root = buildTree(frequencyMap);
  const codeTable = generateCodeTable(root);
  const outputFileName = `compressed-file.huff`

  const encodedData = encodeText(text, codeTable);
  
  // Write the header and encoded data to the output file
  WriteHeaderSection(outputFileName, codeTable);
  writeCompressedText(outputFileName, encodedData);

  console.log('Compression completed successfully.');


}

export function decompressAndDecode(inputFile: string) {
  const inputFileName = inputFile;
  const codeTable = readHeader(inputFileName);

  if (codeTable !== null) {
    console.log('Header read successfully.');
    const spaceSymbol = codeTable['SPACE'];
    const root = buildTreeFromCodeTable(codeTable);

    const compressedData = readCompressedText(inputFileName);
   
    const decodedText = decodeData(compressedData, root);

    const outputFileName = 'decompressed-file.txt';
    fs.writeFileSync(outputFileName, decodedText);
    console.log("Decompression successful!");
  } else {
    console.error('Failed to decompress file.');
  }

}