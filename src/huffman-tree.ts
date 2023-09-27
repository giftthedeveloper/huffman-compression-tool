
export class TreeNode {
    constructor(public character: string, public frequency: number) {
      this.left = null;
      this.right = null;
    }
    left: TreeNode | null;
    right: TreeNode | null;
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
  