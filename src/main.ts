// import * as fs from 'fs-extra';

  

  


  
  
  


//   function readHeader(inputFileName: string): CodeTable | null {
//     try {
//       const fileContent = fs.readFileSync(inputFileName, 'utf-8');
//       const parts = fileContent.trim().split('\n'); 
//       const headerData = parts[0];
//       const codeTable = JSON.parse(headerData);
//       return codeTable;
//     } catch (error) {
//       console.error('Error reading header:', error);
//       return null;
//     }
//   }




import * as fs from 'fs-extra';
import { encodeAndCompress, decompressAndDecode } from './huffman';

// Command-line argument handling here
if (process.argv.length < 4) {
  console.error('Usage: node main.js <operation> <inputFileName>');
  process.exit(1);
}

// Get the operation (compress or decompress)
const operation = process.argv[2].toLowerCase();
const inputFile = process.argv[3];

if (operation === 'compress') {
  console.log('Compression operation selected.');
  encodeAndCompress(inputFile);
} else if (operation === 'decompress') {
  console.log('Decompression operation selected.');
  decompressAndDecode(inputFile);
} else {
  console.error('Invalid operation. Please use "compress" or "decompress".');
  process.exit(1);
}
