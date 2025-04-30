class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function buildHuffmanTree(text) {
    const freqMap = {};

    for (const char of text) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }

    const nodes = Object.entries(freqMap).map(
        ([char, freq]) => new Node(char, freq)
    );

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        const left = nodes.shift();
        const right = nodes.shift();
        const merged = new Node(null, left.freq + right.freq, left, right);
        nodes.push(merged);
    }

    return {
        root: nodes[0],
        frequencies: Object.entries(freqMap)
            .map(([char, freq]) => ({ char, freq }))
            .sort((a, b) => b.freq - a.freq)
    };
}

function generateHuffmanCodes(node, prefix = '', codes = {}) {
    if (node.char !== null) {
        codes[node.char] = prefix;
    } else {
        generateHuffmanCodes(node.left, prefix + '0', codes);
        generateHuffmanCodes(node.right, prefix + '1', codes);
    }
    return codes;
}

const inputText = "BE STRONG, YOUNG MAN! THROUGH THIS WAY ONE GETS TO THE STARS.";
const { root, frequencies } = buildHuffmanTree(inputText);
const huffmanCodes = generateHuffmanCodes(root);

console.log("Huffman Codes:");
frequencies.forEach(({ char, freq }) => {
    console.log(`'${char}' (${freq}): ${huffmanCodes[char]}`);
});