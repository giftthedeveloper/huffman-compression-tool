import * as fs from 'fs-extra';

//count character frequency
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

//if the filename is not provided on the command line
if (process.argv.length < 3) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1);
}

//get the filename from the cli
const filename = process.argv[2]; 
const frequencyMap = countCharFrequency(filename);

// Print the character frequencies for testing
for (const [char, frequency] of frequencyMap.entries()) {
  console.log(`Character: ${char}, Frequency: ${frequency}`);
}
