const TESTS = {'tutorial': [[[[0], 0], [[1], 25], [[25], 625], [[77], 1925], [[123456789], 3086419725]], [[[2], 50], [[999], 24975]]], 'fibonacci': [[[[0], 0], [[1], 1], [[2], 1], [[11], 89], [[31], 1346269], [[44], 701408733]], [[[19], 4181], [[5], 5], [[23], 28657]]], 'count_bits': [[[[0], 0], [[1], 1], [[2], 2], [[15], 4], [[16], 5], [[1357], 11], [[4278124286], 32]], [[[31], 5], [[999], 10], [[1193046], 21]]], 'multiply': [[[[7, 10], 70], [[0, 999], 0], [[1023, 1025], 1048575], [[65535, 65535], 4294836225], [[4275861367, 1], 4275861367], [[1, 4275861367], 4275861367]], [[[42782, 89420], 3825566440], [[100, 0], 0]]], 'test_primality': [[[[0], 0], [[1], 0], [[2], 1], [[3], 1], [[4], 0], [[5], 1], [[23], 1], [[91], 0], [[499], 1], [[961], 0], [[1021], 1], [[1226221], 0], [[9972679], 1], [[100000007], 1], [[2089470557], 0], [[2147483647], 1]], [[[6], 0], [[7], 1], [[8], 0], [[9], 0], [[10], 0], [[11], 1], [[12], 0], [[13], 1], [[2075075809], 0], [[2043484493], 0], [[2000666677], 1], [[169], 0], [[101], 1]]], 'stacking_cannonballs': [[[[0], 0], [[1], 1], [[2], 4], [[3], 10], [[4], 20], [[10], 220], [[250], 2635500], [[2952], 4291795704]], [[[2929], 4192292345], [[2002], 1339342004], [[1021], 177910271], [[8], 120], [[111], 234136], [[666], 49456716], [[343], 6784540]]], 'find_root': [[[[16], 2], [[7], 7], [[2], 2], [[3125], 5], [[343], 7], [[3486784401], 3], [[2147483648], 2], [[214358881], 11], [[1000000007], 1000000007], [[4233193969], 65063]], [[[4049883917], 4049883917], [[1064332261], 1021]]], 'contains_own_hex': [[[[0], 1], [[7], 1], [[9], 1], [[357445], 1], [[357439], 0], [[1081713], 1], [[111111], 0], [[2182104649], 1], [[2182104650], 0], [[7950400], 1]], [[[4294967295], 0], [[2182104639], 0], [[1122966], 1], [[357449], 1], [[2182104640], 1], [[2182104649], 1], [[7950400], 1], [[357444], 1], [[1122966], 1], [[1081713], 1], [[1], 1], [[3371313], 1], [[357441], 1], [[357440], 1], [[5658739], 1], [[357446], 1], [[6825253], 1], [[357447], 1], [[3494694466], 0], [[2636163191], 0], [[1466694727], 0], [[4204418936], 0], [[3999998957], 0], [[1507480168], 0], [[4236399545], 0], [[4197715867], 0], [[2239955890], 0], [[3769243213], 0], [[2446034965], 0], [[4092607313], 0], [[1352771255], 0], [[3100595705], 0], [[361047948], 0], [[3485979836], 0]]], 'poker_hands': [[[[1], 0], [[2], 38310], [[3], 306480], [[4], 1302540], [[5], 3984240], [[6], 9922290], [[7], 21453600], [[8], 41834520], [[9], 75394080], [[10], 127687230], [[11], 205648080], [[12], 317743140], [[13], 474124560], [[14], 686783370], [[15], 969702720], [[16], 1339011120], [[17], 1813135680], [[18], 2412955350], [[19], 3161954160], [[20], 4086374460]], []], 'power_of_two': [[[[1], 1], [[2], 1], [[3], 0], [[4], 1], [[65536], 1], [[777], 0], [[1023], 0], [[257], 0], [[2147483648], 1]], [[[1048576], 1], [[134217728], 1], [[32], 1], [[24879], 0], [[42873980], 0], [[4294965003], 0]]], 'palindrome': [[[['racecar'], 1], [['sand'], 0], [[''], 1], [['I'], 1], [['Wow'], 0], [['1331'], 1], [['111111111111'], 1], [['32'], 0]], [[['32'], 0], [['wow'], 1], [['abcdefghijihgfedcba'], 1], [['333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333'], 1]]], 'base_basics': [[[['100,2'], 4], [['100,10'], 100], [['100,16'], 256], [['0,17'], 0], [['SAND,30'], 765703], [['sand,36'], 1320169], [['ffffffff,16'], 4294967295]], [[['alpha,33'], 12641683], [['4444,11'], 5856], [['e2d8g,19'], 1843073]]], 'collatz_simple': [[[[1], 0], [[5], 5], [[67], 27], [[23181], 144], [[16], 4], [[1234], 132], [[777], 33], [[2147483648], 31]], [[[398113971], 308], [[198309], 160], [[378198], 130], [[2], 1], [[1222919], 204], [[1830], 130], [[35432], 142]]], 'counting_collatz': [[[[1], 0], [[5], 5], [[4294896353], 588], [[67], 27], [[23181], 144], [[16], 4], [[1234], 132], [[2863311531], 254]], [[[398113971], 308], [[198309], 160], [[378198], 130], [[2], 1], [[1222919], 204], [[1830], 130], [[35432], 142]]], 'parse_int': [[[['0'], 0], [['0xfF'], 255], [['77'], 77], [['0b0000101'], 5], [['0o321'], 209], [['0x01234567'], 19088743], [['0x89abcdef'], 2309737967], [['4294967295'], 4294967295], [['0xffffffff'], 4294967295], [['0b11111111111111111111111111111111'], 4294967295], [['0o37777777777'], 4294967295]], [[['1029384756'], 1029384756], [['0b111000111'], 455], [['0o76543210'], 16434824], [['0xFEDCAB'], 16702635]]]};






let labels, inst_cnt;
let register_aliases = {
    'zero': 0,
    'ra': 1,
    'sp': 2,
    'gp': 3,
    'tp': 4,
    't0': 5,
    't1': 6,
    't2': 7,
    's0': 8,
    's1': 9,
    'a0': 10,
    'a1': 11,
    'a2': 12,
    'a3': 13,
    'a4': 14,
    'a5': 15,
    'a6': 16,
    'a7': 17,
    's2': 18,
    's3': 19,
    's4': 20,
    's5': 21,
    's6': 22,
    's7': 23,
    's8': 24,
    's9': 25,
    's10': 26,
    's11': 27,
    't3': 28,
    't4': 29,
    't5': 30,
    't6': 31
}
function encodeInstructions(instructions) {
    register_aliases = {
        'zero': 0,
        'ra': 1,
        'sp': 2,
        'gp': 3,
        'tp': 4,
        't0': 5,
        't1': 6,
        't2': 7,
        's0': 8,
        's1': 9,
        'a0': 10,
        'a1': 11,
        'a2': 12,
        'a3': 13,
        'a4': 14,
        'a5': 15,
        'a6': 16,
        'a7': 17,
        's2': 18,
        's3': 19,
        's4': 20,
        's5': 21,
        's6': 22,
        's7': 23,
        's8': 24,
        's9': 25,
        's10': 26,
        's11': 27,
        't3': 28,
        't4': 29,
        't5': 30,
        't6': 31
    }
    const machinecode = [];
    let bitcount = 0;
    labels = {};
    instructions.forEach((instruction) => {
        if (instruction.split(';')[0].trim() !== '') {
            if (/^[^\s0-9][^\s]*\:$/.test(instruction.split(';')[0].trim())) {// OLD: /^\.[A-Za-z][A-Za-z0-9]*\:$/
                labels[instruction.split(';')[0].trim().slice(0, -1)] = -1;
            } else if (instruction.slice(0, 1) == '#' && instruction.match(/=/g) && instruction.match(/=/g).length == 1) {
                [key, val] = instruction.slice(1).split('=');
                key = key.trim();
                val = val.trim();
                if (/^[A-Za-z][A-Za-z0-9_]*$/.test(key) && register_aliases[key] === undefined && /^x(3[01]|(0?|[12])[0-9])/.test(val)) {
                    register_aliases[key] = -1;
                }
            }
        }
    });
    inst_cnt = 0;
    instructions.forEach((instruction) => {
        instruction = instruction.split(';')[0].trim();
        if (instruction !== '') {
            if (instruction.slice(0, 1) === '>') {
                instruction = instruction.slice(1);
            }
            let encodedInstructionFormatted = "";
            if (/^[^\s0-9][^\s]*\:$/.test(instruction)) {
                if (labels[instruction.slice(0, -1)] === -1) {
                    labels[instruction.slice(0, -1)] = inst_cnt << 2;
                }
            } else if (instruction.slice(0, 1) === '#') {
            } else {
                encodedInstructionFormatted = encodeInstruction(instruction);
            }
            const encodedInstruction = encodedInstructionFormatted.replace(/[^01]/g, '');
            const numBits = (encodedInstruction.match(/1/g) || []).length;
            if (numBits !== 0) {
                inst_cnt++;
            }
        }
    });

    inst_cnt = 0;
    instructions.forEach((instruction) => {
        let numBits = 0;
        instruction = instruction.split(';')[0].trim();
        if (instruction !== '') {
            if (instruction.slice(0, 1) === '>') {
                instruction = instruction.slice(1);
            }
            let encodedInstructionFormatted = "";
            if (/^[^\s0-9][^\s]*\:$/.test(instruction)) {
            } else if (instruction.slice(0, 1) === '#') {
                if (instruction.match(/=/g) && instruction.match(/=/g).length == 1) {
                    [key, val] = instruction.slice(1).split('=');
                    key = key.trim();
                    val = val.trim();
                    if (register_aliases[key] === -1) {
                        register_aliases[key] = parseInt(val.slice(1));
                    }
                }
            } else {
                encodedInstructionFormatted = encodeInstruction(instruction);
                numBits = (encodedInstructionFormatted.match(/1/g) || []).length;
            }
            const encodedInstruction = encodedInstructionFormatted.replace(/[^01]/g, '');
            if (numBits !== 0) {
                inst_cnt++;
                machinecode.push(parseInt(encodedInstruction, 2));
            }
            bitcount += numBits;
        }
    });
    return [bitcount, machinecode];
}

const instructionTypes = {
    'add': 'R', 'sub': 'R', 'and': 'R', 'or': 'R', 'xor': 'R', 'sll': 'R', 'srl': 'R', 'sra': 'R', 'slt': 'R', 'sltu': 'R',// R-type: register arithmetic
    'addi': 'I', 'andi': 'I', 'ori': 'I', 'xori': 'I', 'slli': 'II', 'srli': 'II', 'srai': 'II', 'slti': 'I', 'sltiu': 'I',// I-type: immediate arithmetic; II-type: immediate arithmetic (different encoding)
    'lb': 'L', 'lbu': 'L', 'lh': 'L', 'lhu': 'L', 'lw': 'L',// L-type: loads
    'sb': 'S', 'sh': 'S', 'sw': 'S',// S-type: stores
    'beq': 'B', 'bge': 'B', 'bgeu': 'B', 'blt': 'B', 'bltu': 'B', 'bne': 'B',// B-type: branches
    'jal': 'J',// J-type: JAL
    'jalr': 'I',// JR-type: relative jump (JALR)
    'auipc': 'U', 'lui': 'U',// U-type: upper immediate
    'input': 'E', 'output': 'E',// E-type: ECALL
    'beqz': 'P', 'bnez': 'P', 'j': 'P', 'jr': 'P', 'la': 'P', 'li': 'P', 'mv': 'P', 'neg': 'P', 'nop': 'P', 'not': 'P', 'ret': 'P', 'ja': 'P', // Pseudoinstructions
    'ble': 'P', 'bleu': 'P', 'bgt': 'P', 'bgtu': 'P', 'seqz': 'P', 'snez': 'P', 'nops': 'P', 
}

const extensions_instruction_types = {
    'M': {'mul': 'R', 'mulh': 'R', 'mulhsu': 'R', 'mulhu': 'R', 'div': 'R', 'divu': 'R', 'rem': 'R', 'remu': 'R'}
}

const instructionOpcodes = { // [opcode, funct7 (if applicable), funct3 (if applicable)]
    'add': [0b0110011, 0, 0b000], 'sub': [0b0110011, 0b0100000, 0b000], 'sll': [0b0110011, 0, 0b001], 'slt': [0b0110011, 0, 0b010], 'sltu': [0b0110011, 0, 0b011],
    'xor': [0b0110011, 0, 0b100], 'srl': [0b0110011, 0, 0b101], 'sra': [0b0110011, 0b0100000, 0b101], 'or': [0b0110011, 0, 0b110], 'and': [0b0110011, 0, 0b111],// R-type: register arithmetic
    'addi': [0b0010011, 0b000], 'slti': [0b0010011, 0b010], 'sltiu': [0b0010011, 0b011], 'xori': [0b0010011, 0b100], 'ori': [0b0010011, 0b110], 'andi': [0b0010011, 0b111],// I-type: immediate arithmetic
    'slli': [0b0010011, 0, 0b001], 'srli': [0b0010011, 0, 0b101], 'srai': [0b0010011, 0b0100000, 0b101],// II-type: immediate arithmetic (different encoding)
    'lb': [0b0000011, 0b000], 'lbu': [0b0000011, 0b100], 'lh': [0b0000011, 0b001], 'lhu': [0b0000011, 0b101], 'lw': [0b0000011, 0b010],// L-type: loads
    'sb': [0b0100011, 0b000], 'sh': [0b0100011, 0b001], 'sw': [0b0100011, 0b010],// S-type: stores
    'beq': [0b1100011, 0b000], 'bge': [0b1100011, 0b101], 'bgeu': [0b1100011, 0b111], 'blt': [0b1100011, 0b100], 'bltu': [0b1100011, 0b110], 'bne': [0b1100011, 0b001],// B-type: branches
    'jal': [0b1101111],// J-type: JAL
    'jalr': [0b1100111, 0],// JR-type: relative jump (JALR)
    'auipc': [0b0010111], 'lui': [0b0110111],// U-type: upper immediate
    'input': [0b1110011, 0b000], 'output': [0b1110011, 0b001],// E-type: ECALL
    'mul': [0b0110011, 0b0000001, 0b000], 'mulh': [0b0110011, 0b0000001, 0b001], 'mulhsu': [0b0110011, 0b0000001, 0b010], 'mulhu': [0b0110011, 0b0000001, 0b011], 'div': [0b0110011, 0b0000001, 0b100], 'divu': [0b0110011, 0b0000001, 0b101], 'rem': [0b0110011, 0b0000001, 0b110], 'remu': [0b0110011, 0b0000001, 0b111], // RV32M R-type
}
const unknownInstruction = 'Invalid instruction';

function encodeInstruction(instruction) {
    let binaryEncoding = '';

    // Parse the instruction (This is a simplified example for 'add' instruction)
    const parts = instruction.split(/\s|,/).filter(p => p);
    if (parts[0] in instructionTypes) {
        itype = instructionTypes[parts[0]]
        if (itype == 'R') {
            binaryEncoding = encodeRType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'I') {
            binaryEncoding = encodeIType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'II') {
            binaryEncoding = encodeIIType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'L') {
            binaryEncoding = encodeLType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'S') {
            binaryEncoding = encodeSType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'B') {
            binaryEncoding = encodeBType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'J') {
            binaryEncoding = encodeJType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'U') {
            binaryEncoding = encodeUType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'E') {
            binaryEncoding = encodeEType(instructionOpcodes[parts[0]], parts.slice(1));
        } else if (itype == 'P') {
            binaryEncoding = encodePseudoInstruction(parts);
        }
    } else {
        binaryEncoding = "Unknown opcode";
    }

    return binaryEncoding;
}

function encodeRType(opcodes, parts) {
    if (parts.length !== 3) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    const r1 = registerToBinary(parts[1]);
    const r2 = registerToBinary(parts[2]);
    if (rd === -1 || r1 === -1 || r2 === -1) return unknownInstruction;
    const [opcode, funct7, funct3] = opcodes;
    const binaryString =
        funct7.toString(2).padStart(7, '0') +
        r2 +
        r1 +
        funct3.toString(2).padStart(3, '0') +
        rd +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodeIType(opcodes, parts) {
    if (parts.length !== 3) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    const r1 = registerToBinary(parts[1]);
    const imm = parseImmediateI(parts[2]);
    if (rd === -1 || r1 === -1 || imm === -1) return unknownInstruction;
    const [opcode, funct3] = opcodes;
    const binaryString =
        imm +
        r1 +
        funct3.toString(2).padStart(3, '0') +
        rd +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodeIIType(opcodes, parts) {
    if (parts.length !== 3) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    const r1 = registerToBinary(parts[1]);
    const imm = parseImmediateII(parts[2]);
    if (rd === -1 || r1 === -1 || imm === -1) return unknownInstruction;
    const [opcode, funct7, funct3] = opcodes;
    const binaryString =
        funct7.toString(2).padStart(7, '0') +
        imm +
        r1 +
        funct3.toString(2).padStart(3, '0') +
        rd +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodeLType(opcodes, parts) {
    if (parts.length !== 2) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    const loc = (parts[1]);
    if (!/^[^\(\)]+\([^\(\)]+\)/.test(loc)) return unknownInstruction;
    const imm = parseImmediateI(loc.split('(')[0]);
    const r1 = registerToBinary(loc.split('(')[1].slice(0, -1));
    if (rd === -1 || r1 === -1 || imm === -1) return unknownInstruction;
    const [opcode, funct3] = opcodes;
    const binaryString =
        imm +
        r1 +
        funct3.toString(2).padStart(3, '0') +
        rd +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodeSType(opcodes, parts) {
    if (parts.length !== 2) return unknownInstruction;
    const r2 = registerToBinary(parts[0]);
    const loc = (parts[1]);
    if (!/^[^\(\)]+\([^\(\)]+\)/.test(loc)) return unknownInstruction;
    const imm = parseImmediateI(loc.split('(')[0]);
    const r1 = registerToBinary(loc.split('(')[1].slice(0, -1));
    if (r2 === -1 || r1 === -1 || imm === -1) return unknownInstruction;
    const [opcode, funct3] = opcodes;
    const binaryString =
        imm.slice(0, 7) +
        r2 +
        r1 +
        funct3.toString(2).padStart(3, '0') +
        imm.slice(7) +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodeBType(opcodes, parts) {
    if (parts.length !== 3) return unknownInstruction;
    const r1 = registerToBinary(parts[0]);
    const r2 = registerToBinary(parts[1]);
    const imm = parseImmediateB(parts[2]);
    if (r2 === -1 || r1 === -1 || imm === -1) return unknownInstruction;
    const [opcode, funct3] = opcodes;
    const binaryString =
        imm.slice(0, 1) + imm.slice(2, 8) +
        r2 +
        r1 +
        funct3.toString(2).padStart(3, '0') +
        imm.slice(-4) + imm.slice(1, 2) +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodeJType(opcodes, parts) {
    if (parts.length !== 2) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    const imm = parseImmediateJ(parts[1]);
    if (rd === -1 || imm === -1) return unknownInstruction;
    const [opcode] = opcodes;
    const binaryString =
        imm.slice(0, 1) + imm.slice(10, 20) + imm.slice(9, 10) + imm.slice(1, 9) +
        rd +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodeUType(opcodes, parts) {
    if (parts.length !== 2) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    const imm = parseImmediateU(parts[1]);
    if (rd === -1 || imm === -1) return unknownInstruction;
    const [opcode] = opcodes;
    const binaryString =
        imm +
        rd +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodeEType(opcodes, parts) {
    if (parts.length !== 1) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    if (rd === -1) return unknownInstruction;
    const [opcode, funct3] = opcodes;
    const binaryString =
        '00000000000000000' +
        funct3.toString(2).padStart(3, '0') +
        rd +
        opcode.toString(2).padStart(7, '0');
    return binaryString;
}
function encodePseudoInstruction(parts) {
    const inst = parts[0];
    if (inst == "beqz") {
        if (parts.length !== 3) return unknownInstruction;
        return encodeBType(instructionOpcodes["beq"], [parts[1], 'x0', parts[2]])
    } else if (inst == ["bnez"]) {
        if (parts.length !== 3) return unknownInstruction;
        return encodeBType(instructionOpcodes["bne"], [parts[1], 'x0', parts[2]])
    } else if (inst == ["bgt"]) {
        if (parts.length !== 4) return unknownInstruction;
        return encodeBType(instructionOpcodes["blt"], [parts[2], parts[1], parts[3]])
    } else if (inst == ["bgtu"]) {
        if (parts.length !== 4) return unknownInstruction;
        return encodeBType(instructionOpcodes["bltu"], [parts[2], parts[1], parts[3]])
    } else if (inst == ["ble"]) {
        if (parts.length !== 4) return unknownInstruction;
        return encodeBType(instructionOpcodes["bge"], [parts[2], parts[1], parts[3]])
    } else if (inst == ["bleu"]) {
        if (parts.length !== 4) return unknownInstruction;
        return encodeBType(instructionOpcodes["bgeu"], [parts[2], parts[1], parts[3]])
    } else if (inst == ["seqz"]) {
        if (parts.length !== 3) return unknownInstruction;
        return encodeIType(instructionOpcodes["sltiu"], [parts[1], parts[2], "1"])
    } else if (inst == ["snez"]) {
        if (parts.length !== 3) return unknownInstruction;
        return encodeRType(instructionOpcodes["sltu"], [parts[1], 'x0', parts[2]])
    } else if (inst == ["j"]) {
        if (parts.length !== 2) return unknownInstruction;
        return encodeJType(instructionOpcodes["jal"], ['x0', parts[1]])
    } else if (inst == ["jr"]) {
        if (parts.length !== 2) return unknownInstruction;
        return encodeIType(instructionOpcodes["jalr"], ['x0', parts[1], '0'])
    } else if (inst == ["la"]) {
        if (parts.length !== 3) return unknownInstruction;
        return "Not implemented";
    } else if (inst == ["li"]) { // TODO support upper immediates
        if (parts.length !== 3) return unknownInstruction;
        return encodeIType(instructionOpcodes["addi"], [parts[1], 'x0', parts[2]])
    } else if (inst == ["mv"]) {
        if (parts.length !== 3) return unknownInstruction;
        return encodeIType(instructionOpcodes["addi"], [parts[1], parts[2], '0'])
    } else if (inst == ["neg"]) {
        if (parts.length !== 3) return unknownInstruction;
        return encodeRType(instructionOpcodes["sub"], [parts[1], 'x0', parts[2]])
    } else if (inst == ["nop"]) {
        if (parts.length !== 1) return unknownInstruction;
        return encodeIType(instructionOpcodes["addi"], ["x0", 'x0', "0"])
    } else if (inst == ["not"]) {
        if (parts.length !== 3) return unknownInstruction;
        return encodeIType(instructionOpcodes["xori"], [parts[1], parts[2], "-1"])
    } else if (inst == ["ret"]) {
        if (parts.length !== 1) return unknownInstruction;
        return encodeIType(instructionOpcodes["jalr"], ['x0', 'x1', '0'])
    } else if (inst == ["ja"]) {
        if (parts.length !== 2) return unknownInstruction;
        return encodeIType(instructionOpcodes["jalr"], ['x0', 'x0', parseImmediateAbs(parts[1])]);
    } else if (inst == ["nops"]) {
        if (parts.length !== 1) return unknownInstruction;
        return encodeLType(instructionOpcodes["lb"], ['x0', '0(x0)']);
    }
}

function registerToBinary(reg) {
    if (/^x(31|30|[012]?\d)$/.test(reg)) {
        regNumber = parseInt(reg.replace('x', ''), 10);
    } else if (reg in register_aliases) {
        regNumber = register_aliases[reg];
    } else {
        return -1
    }
    return regNumber.toString(2).padStart(5, '0');
}
function parseImmediate(immediate) { // convert string from decimal, octal, hex, or binary to an integer
    immediate = immediate.toUpperCase();
    if (/^0X[\dA-F]+$/.test(immediate)) return parseInt(immediate.slice(2), 16);
    if (/^0O[0-7]+$/.test(immediate)) return parseInt(immediate.slice(2), 8);
    if (/^0B[01]+$/.test(immediate)) return parseInt(immediate.slice(2), 2);
    if (/^-0X[\dA-F]+$/.test(immediate)) return -parseInt(immediate.slice(3), 16);
    if (/^-0O[0-7]+$/.test(immediate)) return -parseInt(immediate.slice(3), 8);
    if (/^-0B[01]+$/.test(immediate)) return -parseInt(immediate.slice(3), 2);
    if (/^-?\d+$/.test(immediate)) return parseInt(immediate, 10);
    return NaN;
}
function parseImmediateI(immediate) {// also for L and JALR, and S
    immediate = parseImmediate(immediate);
    if (isNaN(immediate)) return -1;
    if (immediate > 2047 || immediate < -2048) return -1;
    return (immediate + 4096).toString(2).slice(-12);
}
function parseImmediateII(immediate) {
    immediate = parseImmediate(immediate);
    if (isNaN(immediate)) return -1;
    if (immediate > 31 || immediate < 0) return -1;
    return (immediate + 32).toString(2).slice(1);
}
function parseImmediateB(immediate) {
    if (immediate in labels) return (labels[immediate] - inst_cnt * 4 + 8192).toString(2).slice(-13, -1);
    immediate = parseImmediate(immediate);
    if (isNaN(immediate)) return -1;
    if (immediate % 2 == 1 || immediate > 4095 || immediate < -4096) return -1;
    return (immediate + 8192).toString(2).slice(-13, -1);
}
function parseImmediateJ(immediate) {
    if (immediate in labels) return (labels[immediate] - inst_cnt * 4 + (1 << 21)).toString(2).slice(-21, -1);
    immediate = parseImmediate(immediate);
    if (isNaN(immediate)) return -1;
    if (immediate % 2 == 1 || immediate > ((1 << 20) - 1) || immediate < -(1 << 20)) return -1;
    return (immediate + (1 << 21)).toString(2).slice(-21, -1);
}
function parseImmediateU(immediate) {
    immediate = parseImmediate(immediate);
    if (isNaN(immediate)) return -1;
    if (immediate > ((1 << 20) - 1) || immediate < -(1 << 19)) return -1;
    return (immediate + (1 << 20)).toString(2).slice(-20);

}
function parseImmediateAbs(immediate) {
    if (immediate in labels) return labels[immediate].toString();
    return immediate;
}

class RISCVSimulator {
    constructor(inputs = [], breakpoints = [], memorySize = 0x100000, cycle_limit = 1 << 24) { // 1 MiB
        this.memory = new Uint8Array(memorySize);
        this.registers = new Int32Array(32); // 32 registers, RV32I
        this.pc = 0; // Program counter
        this.imem = new Uint32Array(1024);
        this.cycle_limit = cycle_limit;
        this.inst_count = 0;
        this.cycles = 0;
        this.breakpoints = breakpoints;
        this.inputs = [];
        let input, i;
        for (input of inputs) {
            if (typeof(input) === 'string') {
                for (i in input) {
                    this.inputs.push(input.charCodeAt(i));
                }
                this.inputs.push(0)
            } else if (typeof(input) === 'number') {
                this.inputs.push(input);
            } else {
                console.error(`Unsupported input type ${typeof(input)} for input ${input}`);
            }
        }
        this.input_index = 0;
        this.output = -1;
        this.halted = false;
    }

    readWord(address) {
        return this.memory[address + 0] |
            (this.memory[address + 1] << 8) |
            (this.memory[address + 2] << 16) |
            (this.memory[address + 3] << 24);
    }

    writeWord(address, value) {
        this.memory[address + 0] = value & 0xFF;
        this.memory[address + 1] = (value >> 8) & 0xFF;
        this.memory[address + 2] = (value >> 16) & 0xFF;
        this.memory[address + 3] = (value >> 24) & 0xFF;
    }

    fetch() {
        const instruction = this.imem[this.pc >> 2];
        this.pc += 4;
        return instruction;
    }

    sign_extend(value, bits) {
        if ((value >> (bits - 1)) & 1) {
            return (((1 << (32 - bits)) - 1) << bits) | value;
        }
        return value;
    }

    execute(instruction) {
        const opcode = instruction & 0x7F;
        const rd = (instruction >> 7) & 0x1F;
        const funct3 = (instruction >> 12) & 0x7;
        const rs1 = (instruction >> 15) & 0x1F;
        const rs2 = (instruction >> 20) & 0x1F;
        const funct7 = (instruction >> 25) & 0x7F;
        const imm_i = this.sign_extend((instruction >> 20) & 0xFFF, 12);
        const imm_s = this.sign_extend(((instruction >> 25) << 5) | ((instruction >> 7) & 0x1F), 12);
        const imm_b = this.sign_extend(((instruction >> 31) << 12) |
            (((instruction >> 7) & 0x1) << 11) |
            (((instruction >> 25) & 0x3F) << 5) |
            (((instruction >> 8) & 0xF) << 1), 13);
        const imm_u = instruction & 0xFFFFF000;
        const imm_j = this.sign_extend(((instruction >> 31) << 20) |
            (((instruction >> 21) & 0x3FF) << 1) |
            (((instruction >> 20) & 0x1) << 11) |
            (((instruction >> 12) & 0xFF) << 12), 21);

        switch (opcode) {
            case 0x13: // I-type
                this.handleIType(funct3, rd, rs1, imm_i);
                break;
            case 0x33: // R-type
                this.handleRType(funct3, funct7, rd, rs1, rs2);
                break;
            case 0x3: // Load
                this.handleLoad(funct3, rd, rs1, imm_i);
                break;
            case 0x23: // Store
                this.handleStore(funct3, rs1, rs2, imm_s);
                break;
            case 0x63: // B-type
                this.handleBType(funct3, rs1, rs2, imm_b);
                break;
            case 0x37: // U-type (LUI)
                this.handleUTypeLUI(rd, imm_u);
                break;
            case 0x17: // U-type (AUIPC)
                this.handleUTypeAUIPC(rd, imm_u);
                break;
            case 0x6F: // J-type (JAL)
                this.handleJTypeJAL(rd, imm_j);
                break;
            case 0x67: // I-type (JALR)
                this.handleITypeJALR(rd, rs1, imm_i);
                break;
            case 0x73: // ECALL (INPUT or OUPUT)
                this.handleEType(rd, funct3);
                break;
            default:
                console.error(`Unsupported opcode: 0x${opcode.toString(16)}`);
        }
    }

    handleIType(funct3, rd, rs1, imm) {
        if (rd === 0) return;
        switch (funct3) {
            case 0x0: // ADDI
                this.registers[rd] = this.registers[rs1] + imm;
                break;
            case 0x1: // SLLI
                this.registers[rd] = this.registers[rs1] << (imm & 31);
                break;
            case 0x2: // SLTI
                this.registers[rd] = this.registers[rs1] < imm;
                break;
            case 0x3: // SLTIU
                this.registers[rd] = (this.registers[rs1] + 0x1_0000_0000) % (0x1_0000_0000) < (imm & 0xFFF);
                break;
            case 0x4: // XORI
                this.registers[rd] = this.registers[rs1] ^ imm;
                break;
            case 0x5: // 
                const funct7 = imm >> 5;
                if (funct7 === 0x00) { // SRLI
                    this.registers[rd] = this.registers[rs1] >>> (imm & 31);
                } else if (funct7 === 0x20) { // SRAI
                    this.registers[rd] = this.registers[rs1] >> (imm & 31);
                }
                break;
            case 0x6: // ORI
                this.registers[rd] = this.registers[rs1] | imm;
                break;
            case 0x7: // ANDI
                this.registers[rd] = this.registers[rs1] & imm;
                break;
            default:
                console.error(`Unsupported I-type funct3: 0x${funct3.toString(16)}`);
        }
    }

    handleRType(funct3, funct7, rd, rs1, rs2) {
        if (rd === 0) return;
        switch (funct7) {
            case 0x00:
                switch (funct3) {
                    case 0x0: // ADD
                        this.registers[rd] = this.registers[rs1] + this.registers[rs2];
                        break;
                    case 0x1: // SLL
                        this.registers[rd] = this.registers[rs1] << (this.registers[rs2] & 31);
                        break;
                    case 0x2: // SLT
                        this.registers[rd] = this.registers[rs1] < this.registers[rs2];
                        break;
                    case 0x3: // SLTU
                        this.registers[rd] = (this.registers[rs1] + 0x1_0000_0000) % 0x1_0000_0000 < (this.registers[rs2] + 0x1_0000_0000) % 0x1_0000_0000;
                        break;
                    case 0x4: // XOR
                        this.registers[rd] = this.registers[rs1] ^ this.registers[rs2];
                        break;
                    case 0x5: // SRL
                        this.registers[rd] = this.registers[rs1] >>> (this.registers[rs2] & 31);
                        break;
                    case 0x6: // OR
                        this.registers[rd] = this.registers[rs1] | this.registers[rs2];
                        break;
                    case 0x7: // AND
                        this.registers[rd] = this.registers[rs1] & this.registers[rs2];
                        break;
                    default:
                        console.error(`Unsupported R-type funct7: 0x${funct7.toString(16)} funct3: 0x${funct3.toString(16)}`);
                        break;
                }
                break;
            case 0x20:
                switch (funct3) {
                    case 0x0: // SUB
                        this.registers[rd] = this.registers[rs1] - this.registers[rs2];
                        break;
                    case 0x5: // SRA
                        this.registers[rd] = this.registers[rs1] >> (this.registers[rs2] & 31);
                        break;
                    default:
                        console.error(`Unsupported R-type funct7: 0x${funct7.toString(16)} funct3: 0x${funct3.toString(16)}`);
                        break;
                }
                break
            case 0x01:
                let rs1_bigint_val = BigInt(this.registers[rs1]);
                let rs2_bigint_val = BigInt(this.registers[rs2]);
                let rs1_bigint_val_u = BigInt(this.registers[rs1]) & 0xFFFFFFFFn;
                let rs2_bigint_val_u = BigInt(this.registers[rs2]) & 0xFFFFFFFFn;
                switch (funct3) {
                    case 0x0: // MUL
                        this.registers[rd] = parseInt((rs1_bigint_val * rs2_bigint_val) & 0xFFFFFFFFn);
                        break;
                    case 0x1: // MULH
                        this.registers[rd] = parseInt((((rs1_bigint_val * rs2_bigint_val) >> 32n)) & 0xFFFFFFFFn);
                        break;
                    case 0x2: // MULHU
                        this.registers[rd] = parseInt((((rs1_bigint_val_u * rs2_bigint_val_u) >> 32n)) & 0xFFFFFFFFn);
                        break;
                    case 0x3: // MULHSU
                        this.registers[rd] = parseInt((((rs1_bigint_val * rs2_bigint_val_u) >> 32n)) & 0xFFFFFFFFn);
                        break;
                    case 0x4: // DIV
                        this.registers[rd] = (rs2_bigint_val == 0n) ? -1 : ((rs1_bigint_val == -0x80000000n && rs2_bigint_val == -1n) ? -0x80000000 : parseInt(rs1_bigint_val / rs2_bigint_val));
                        break;
                    case 0x5: // DIVU
                        this.registers[rd] = (rs2_bigint_val_u == 0n) ? 0xFFFFFFFF : parseInt(rs1_bigint_val_u / rs2_bigint_val_u);
                        break;
                    case 0x6: // REM
                        this.registers[rd] = (rs2_bigint_val == 0n) ? rs1_bigint_val : ((rs1_bigint_val == -0x80000000n && rs2_bigint_val == -1n) ? 0 : parseInt(rs1_bigint_val % rs2_bigint_val));
                        break;
                    case 0x7: // REMU
                        this.registers[rd] = (rs2_bigint_val_u == 0n) ? rs1_bigint_val_u : parseInt(rs1_bigint_val_u % rs2_bigint_val_u);
                        break;
                    default:
                        console.error(`Unsupported R-type funct7: 0x${funct7.toString(16)} funct3: 0x${funct3.toString(16)}`);
                        break;
                }
                break
            default:
                console.error(`Unsupported R-type funct7: 0x${funct7.toString(16)} funct3: 0x${funct3.toString(16)}`);
                break;
        }
    }

    handleLoad(funct3, rd, rs1, imm) {
        if (rd === 0) return;
        const address = this.registers[rs1] + imm;
        switch (funct3) {
            case 0x0: // LB
                this.registers[rd] = this.sign_extend(this.memory[address], 8);
                break;
            case 0x1: // LH
                this.registers[rd] = this.sign_extend(this.memory[address] | (this.memory[address + 1] << 8), 16);
                break;
            case 0x2: // LW
                this.registers[rd] = this.readWord(address);
                break;
            case 0x4: // LBU
                this.registers[rd] = this.memory[address];
                break;
            case 0x5: // LHU
                this.registers[rd] = this.memory[address] | (this.memory[address + 1] << 8);
                break;
            default:
                console.error(`Unsupported load funct3: 0x${funct3.toString(16)}`);
        }
    }

    handleStore(funct3, rs1, rs2, imm) {
        const address = this.registers[rs1] + imm;
        switch (funct3) {
            case 0x0: // SB
                this.memory[address] = this.registers[rs2] & 0xFF;
                break;
            case 0x1: // SH
                this.memory[address + 1] = this.registers[rs2] & 0xFF;
                this.memory[address + 0] = (this.registers[rs2] >> 8) & 0xFF;
                break;
            case 0x2: // SW
                this.writeWord(address, this.registers[rs2]);
                break;
            default:
                console.error(`Unsupported store funct3: 0x${funct3.toString(16)}`);
        }
    }

    handleBType(funct3, rs1, rs2, imm) {
        switch (funct3) {
            case 0x0: // BEQ
                if (this.registers[rs1] === this.registers[rs2]) {
                    this.pc += imm - 4;
                }
                break;
            case 0x1: // BNE
                if (this.registers[rs1] !== this.registers[rs2]) {
                    this.pc += imm - 4;
                }
                break;
            case 0x4: // BLT
                if (this.registers[rs1] < this.registers[rs2]) {
                    this.pc += imm - 4;
                }
                break;
            case 0x5: // BGE
                if (this.registers[rs1] >= this.registers[rs2]) {
                    this.pc += imm - 4;
                }
                break;
            case 0x6: // BLTU
                if ((this.registers[rs1] + 0x1_0000_0000) % 0x1_0000_0000 < (this.registers[rs2] + 0x1_0000_0000) % 0x1_0000_0000) {
                    this.pc += imm - 4;
                }
                break;
            case 0x7: // BGEU
                if ((this.registers[rs1] + 0x1_0000_0000) % 0x1_0000_0000 >= (this.registers[rs2] + 0x1_0000_0000) % 0x1_0000_0000) {
                    this.pc += imm - 4;
                }
                break;
            default:
                console.error(`Unsupported B-type funct3: 0x${funct3.toString(16)}`);
        }
    }

    handleUTypeLUI(rd, imm) {
        if (rd === 0) return;
        this.registers[rd] = imm;
    }

    handleUTypeAUIPC(rd, imm) {
        if (rd === 0) return;
        this.registers[rd] = this.pc + imm - 4;
    }

    handleJTypeJAL(rd, imm) {
        this.pc += imm - 4;
        if (rd === 0) return;
        this.registers[rd] = this.pc - imm + 4;;
    }

    handleITypeJALR(rd, rs1, imm) {
        const temp = this.pc - imm + 4;;
        this.pc = (this.registers[rs1] + imm) & ~1;
        if (rd === 0) return;
        this.registers[rd] = temp;
    }

    handleEType(rd, funct3) {
        if (funct3 == 0x0) {
            if (this.input_index < this.inputs.length) {
                this.input_index++;
                if (rd === 0) return;
                this.registers[rd] = this.inputs[this.input_index - 1];
            } else {
                this.input_index++;
                this.registers[rd] = -1;
            }
        } else if (funct3 == 0x1) {
            this.output = this.registers[rd];
            this.halted = true;
        } else {
            console.error(`Unknown E-type funct3 ${funct3}`);
        }
    }

    loadProgram(program) {
        for (let i = 0; i < program.length; i++) {
            this.imem[i] = program[i];
        }
        this.inst_count = program.length;
    }

    run() {
        while (!this.halted && this.pc%4 === 0 && this.pc < this.inst_count * 4 && this.cycles < this.cycle_limit) {
            const instruction = this.fetch();
            this.execute(instruction);
            this.cycles++;
        }
    }
}



function runAllTests(instructionfile, challenge_name, isa) {

    for (extension of isa) {
        if (extension in extensions_instruction_types) {
            for (i in extensions_instruction_types[extension]) {
                instructionTypes[i] = extensions_instruction_types[extension][i];
            }
        }
    }

    let instructions = fs.readFileSync(instructionfile, 'utf8').split('\n');
    const [visible, hidden] = TESTS[challenge_name];
    const [bitcount, machinecode] = encodeInstructions(instructions);
//        machinecode.forEach((val) => {console.log(val.toString(2))});
    let vis_passed = 0;
    let hid_passed = 0;
    if (bitcount !== -1) {
        visible.forEach((test, idx) => {
            sim = new RISCVSimulator(test[0]);
            sim.loadProgram(machinecode);
            sim.run();
            if (sim.halted && (sim.output + 0x1_0000_0000) % 0x1_0000_0000 === (test[1] + 0x1_0000_0000) % 0x1_0000_0000) {
                vis_passed++;
            }
        })
        hidden.forEach((test, idx) => {
            sim = new RISCVSimulator(test[0]);
            sim.loadProgram(machinecode);
            sim.run();
            if (sim.halted && (sim.output + 0x1_0000_0000) % 0x1_0000_0000 === (test[1] + 0x1_0000_0000) % 0x1_0000_0000) {
                hid_passed++;
            }
        })
    }
    return [[vis_passed, visible.length], [hid_passed, hidden.length], bitcount];
}

const fs = require('fs');
if (process.argv.length === 5) {
    const results = runAllTests(process.argv[3], process.argv[2], process.argv[4]);
    console.log(results[0][0]);
    console.log(results[0][1]);
    console.log(results[1][0]);
    console.log(results[1][1]);
    console.log(results[2]);
}