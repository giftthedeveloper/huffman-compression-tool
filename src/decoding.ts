import * as fs from 'fs-extra';
import { CodeTable, TreeNode } from './huffman-tree';

export  function readCompressedText(inputFileName: string): string {
    try {
      const fileContent = fs.readFileSync(inputFileName, 'utf-8');
      const parts = fileContent.trim().split('\n');
      return parts.slice(1).join('');
    } catch (error) {
      console.error('Error reading compressed text:', error);
      return '';
    }
  }

  export function decodeData(encodedData: string, root: TreeNode): string {
    let decodedText = '';
    let currentNode = root;
  
    for (const bit of encodedData) {
      if (bit === '0' && currentNode.left) {
        currentNode = currentNode.left;
      } else if (bit === '1' && currentNode.right) {
        currentNode = currentNode.right;
      }
  
      if (currentNode.character !== '') {
        decodedText += currentNode.character;
        currentNode = root;
      }
    }
  
    return decodedText;
  }

    //stores and jsonify character mappings information (for easy decoding and encoding) for decoding algorithm 
  export function WriteHeaderSection(outputFileName: string, codeTable: CodeTable): boolean {
    try {
      const headerData = JSON.stringify(codeTable);
      const data = fs.writeFileSync(outputFileName, headerData + '\n'); 
      return true;
    } catch (error) {
      console.error('Error writing header:', error);
      return false;
    }
  }
  
 