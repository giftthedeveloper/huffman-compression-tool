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


//if the filename is not provided on the command line throw error
if (process.argv.length < 3) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1);
}

//get the filename from the cli
const filename = process.argv[2]; 
const frequencyMap = countCharFrequency(filename);
const root = buildTree(frequencyMap);
console.log(root);


for (const [char, frequency] of frequencyMap.entries()) {
  console.log(`Character: ${char}, Frequency: ${frequency}`);
}
