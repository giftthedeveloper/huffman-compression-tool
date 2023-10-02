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
  
  
  //stores and jsonify character mappings information (for easy decoding and encoding) for decoding algorithm 
  function WriteHeaderSection(outputFileName: string, codeTable: CodeTable): boolean {
    try {
      const headerData = JSON.stringify(codeTable);
      console.log(headerData)
      const data = fs.writeFileSync(outputFileName, headerData + '\n');
      return true;
    } catch (error) {
      console.error('Error writing header:', error);
      return false;
    }
  }
  

  function encodeText(text: string, codeTable: CodeTable): string {
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
  
  
  function writeCompressedText(outputFileName: string, encodedData: string) {
    const buffer = Buffer.from(encodedData, 'binary');
    fs.appendFileSync(outputFileName, buffer);
  }
  
  
  function readCompressedText(inputFileName: string): string {
    const buffer = fs.readFileSync(inputFileName);
    return buffer.toString('binary');
  }

  function readHeader(inputFileName: string): CodeTable | null {
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

  function decodeData(encodedData: string, root: TreeNode): string {
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
  
  

  function buildTreeFromCodeTable(codeTable: CodeTable): TreeNode {
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
  
  
  

//command line arguments for compression and decompression
if (process.argv.length < 4) {
  console.error('Usage: node script.js <operation> <inputFileName>');
  process.exit(1);
}

// Get the operation (compress or decompress)
const operation = process.argv[2].toLowerCase();
const inputFile = process.argv[3];

if (operation === 'compress') {
  console.log('Compression operation selected.');
  console.log(`Compressing ${inputFile}`)

  const filename = inputFile
  const text = fs.readFileSync(filename, 'utf-8');
  const frequencyMap = countCharFrequency(filename);
  const root = buildTree(frequencyMap);
  const codeTable = generateCodeTable(root);
  const outputFileName = `compressed-${filename}`

  const encodedData = encodeText(text, codeTable);
  
  // Write the header and encoded data to the output file
  WriteHeaderSection(outputFileName, codeTable);
  writeCompressedText(outputFileName, encodedData);

  console.log('Compression completed successfully.');

} else if (operation === 'decompress') {
  console.log('Decompression operation selected.');
  console.log(`Decompressing ${inputFile}`);
  const inputFileName = inputFile;
  const codeTable = readHeader(inputFileName);

  if (codeTable !== null) {
    console.log('Header read successfully.');
    const spaceSymbol = codeTable['SPACE'];
    const root = buildTreeFromCodeTable(codeTable);

    const compressedData = readCompressedText(inputFileName);
   
    const decodedText = decodeData(compressedData, root);

    const outputFileName = 'decompressed-sample.txt';
    fs.writeFileSync(outputFileName, decodedText);
    console.log("Decompression successful!");
  } else {
    console.error('Failed to decompress file.');
  }
} else {
  console.error('Invalid operation. Please use "compress" or "decompress".');
  process.exit(1);
}