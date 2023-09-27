import * as fs from 'fs-extra';

//count the number of times a character occurs
function countCharFrequency(filename: string): Map<string, number> {
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


class TreeNode {
  constructor(public character: string, public frequency: number) {
    this.left = null;
    this.right = null;
  }
  left: TreeNode | null;
  right: TreeNode | null;
}

//building  huffman tree based on character frequency and nodes
function buildTree(frequencyMap: Map<string, number>): TreeNode {
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


interface CodeTable {
    [character: string]: string;
  }
  
  //function to generate the code table based on the tree. 
  //the helps to store the code for a sepcific character based on the huffman tree for encoding & decoding.
  function generateCodeTable(root: TreeNode): CodeTable {
    const codeTable: CodeTable = {};
  
    function traverse(node: TreeNode, currentCode: string) {
      if (node.character) {
        codeTable[node.character] = currentCode;
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
  
  //stores and jsonify character mappings information (for easy decoding and encoding) for decoding algorithm 
  function WriteHeaderSection(outputFileName: string, codeTable: CodeTable): boolean {
    try {
      const headerData = JSON.stringify(codeTable);
      fs.writeFileSync(outputFileName, headerData);
      return true;

    } catch (error) {
      console.error('Error writing header:', error);
          return false;
    }
  }
  

  function encodeText(text: string, codeTable: CodeTable): string {
    let encodedData = '';
    for (const char of text) {
      encodedData += codeTable[char];
    }
    return encodedData;
  }
  
  function writeCompressedText(outputFileName: string, encodedData: string) {
    fs.appendFileSync(outputFileName, encodedData);
  }
  

//if the filename is not provided on the command line throw error
if (process.argv.length < 3) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1);
}

//get the filename from the cli
const filename = process.argv[2]; 
console.log(filename)
const frequencyMap = countCharFrequency(filename);
const root = buildTree(frequencyMap);
const codeTable = generateCodeTable(root);
const outputFileName = `compressed-${filename}`
console.log(outputFileName)
const headerSection = WriteHeaderSection(outputFileName, codeTable);

if (!headerSection) {
  console.error('Failed to write the header.');
} else {
  const encodedData = encodeText(filename, codeTable);
  console.log(encodedData, headerSection)
  writeCompressedText(outputFileName, encodedData);

  console.log('Compression completed successfully.');
}


// for (const [char, frequency] of frequencyMap.entries()) {
//   console.log(`Character: ${char}, Frequency: ${frequency}`);
// }
