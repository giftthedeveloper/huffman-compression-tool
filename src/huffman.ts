import * as fs from 'fs';

//function to read text from desired file
function readFileText(filename: string) {
    try {
        const text = fs.readFileSync(filename, 'utf-8');
        return text;

    }catch(error) {
        console.error(`Error reading from file ${filename}`, error)
        process.exit(1)

    }
}

function countCharacterFrequency(text: string): Map<string, number> {
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

function main() {
    const filename = process.argv[2];
    const text = readFileText(filename)
    const frequencyMap = countCharacterFrequency(text)

    for (const [char, frequency] of frequencyMap.entries()) {
        console.log(`Character: ${char}, Frequency: ${frequency}`);
      }

  }

main()