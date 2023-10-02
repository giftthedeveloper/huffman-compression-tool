import * as fs from 'fs-extra';

export interface CodeTable {
    [character: string]: string;
  }


export class TreeNode {
  constructor(public character: string, public frequency: number) {
    this.left = null;
    this.right = null;
  }
  left: TreeNode | null;
  right: TreeNode | null;
}
  

//count the number of times a character occurs
export function countCharFrequency(filename: string): Map<string, number> {
  const text = fs.readFileSync(filename, 'utf-8');
  const frequencyMap = new Map<string, number>();

  for (const char of text) {
    if (frequencyMap.has(char)) {
      frequencyMap.set(char, frequencyMap.get(char)! + 1);
    } else {
      frequencyMap.set(char, 1);
    }
  }

  return frequencyMap;
}


  //function to generate the code table based on the tree. 
  //the helps to store the code for a sepcific character based on the huffman tree for encoding & decoding.
  export function generateCodeTable(root: TreeNode): CodeTable {
    const codeTable: CodeTable = {};
  
    function traverse(node: TreeNode, currentCode: string) {
      if (node.character) {
        codeTable[node.character] = currentCode;
      }
      if (node.character === ' ') {
        codeTable[' '] = currentCode; 
      }
      if (node.left) {
        traverse(node.left, currentCode + '0');
      }
      if (node.right) {
        traverse(node.right, currentCode + '1');
      }
    }
  
    traverse(root, '');
  
    return codeTable;
  }
  
  
//building  huffman tree based on character frequency and nodes
export function buildTree(frequencyMap: Map<string, number>): TreeNode {
  //priority queue for nodes based on frequency
  const priorityQueue: TreeNode[] = Array.from(frequencyMap.entries()).map(
    ([char, frequency]) => new TreeNode(char, frequency)
  );

  while (priorityQueue.length > 1) {
    //sorting piority queue based on asc order
    priorityQueue.sort((a, b) => a.frequency - b.frequency);

    const leftNode = priorityQueue.shift()!;
    const rightNode = priorityQueue.shift()!;

    const internalNode = new TreeNode('', leftNode.frequency + rightNode.frequency);
    internalNode.left = leftNode;
    internalNode.right = rightNode;

    priorityQueue.push(internalNode);
  }

  return priorityQueue[0];
}

  export function readHeader(inputFileName: string): CodeTable | null {
    try {
      const fileContent = fs.readFileSync(inputFileName, 'utf-8');
      const parts = fileContent.trim().split('\n'); 
      const headerData = parts[0];
      const codeTable = JSON.parse(headerData);
      return codeTable;
    } catch (error) {
      console.error('Error reading header:', error);
      return null;
    }
  }


export function buildTreeFromCodeTable(codeTable: CodeTable): TreeNode {
    const root = new TreeNode('', 0);
    for (const [char, code] of Object.entries(codeTable)) {
      let currentNode = root;
      for (const bit of code) {
        if (bit === '0') {
          if (!currentNode.left) {
            currentNode.left = new TreeNode('', 0);
          }
          currentNode = currentNode.left;
        } else if (bit === '1') {
          if (!currentNode.right) {
            currentNode.right = new TreeNode('', 0);
          }
          currentNode = currentNode.right;
        }
      }
      currentNode.character = char;
    }
    return root;
  }
  
  