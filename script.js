document.getElementById('instructions').addEventListener('input', encodeInstructions);
document.getElementById("client-cycle-limit-spanner").innerHTML = CYCLE_LIMIT;

document.getElementById('instructions').focus();
if (localStorage["code_" + url] !== undefined) {
    document.getElementById('instructions').value = localStorage["code_" + url];
} else {
    document.getElementById('instructions').value = 'input a0\n\n\noutput a0';
}

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
const regs_x_to_named = {};
for (r in register_aliases) { regs_x_to_named[register_aliases[r]] = r; }




function highlight_active_line() {
    if (document.getElementById("inst" + active_line) !== null)
        document.getElementById("inst" + active_line).classList.remove('active-line');
    active_line = simulator.pc >> 2;
    if (document.getElementById("inst" + active_line) !== null)
        document.getElementById("inst" + active_line).classList.add('active-line');
    /*    const outputTable = document.getElementById('instructionTable').querySelector('tbody');
        if ((simulator.pc >> 2) < outputTable.children.length) {
            outputTable.children[active_line].classList.remove('active-line');
            active_line = simulator.pc >> 2;
            outputTable.children[active_line].classList.add('active-line');
        } else if (active_line < outputTable.children.length) {
            outputTable.children[active_line].classList.remove('active-line');
        }*/

}
function update_mem_viewer() {
    const styles = ["", " style=\"background-color:#ddf\"", " style=\"background-color:#ffd\"", " style=\"background:repeating-linear-gradient(45deg, #ddf, #ddf 4px, #ffd 4px, #ffd 8px)\""];
    const inp = document.getElementById("mem_page_selector");
    if (/^[0-9a-fA-F]{3}$/.test(inp.value)) {
        inp.classList.remove("highlight");
        document.getElementById("mem_viewer_active_page").innerHTML = "Currently viewing page 0x" + inp.value.toUpperCase() + '.';
        const table = document.getElementById("memorytable");
        table.innerHTML = "<th>ROW</th><th>_0</th><th>_1</th><th>_2</th><th>_3</th><th>_4</th><th>_5</th><th>_6</th><th>_7</th><th>_8</th><th>_9</th><th>_A</th><th>_B</th><th>_C</th><th>_D</th><th>_E</th><th>_F</th>"
        const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        mem_addr = parseInt(inp.value, 16) << 8;
        cur_inst = simulator.imem[simulator.pc >> 2];
        touched_by_cur_inst = [];
        if ((cur_inst & 0b1011111) == 0b0000011) { // if load / store for current inst
            funct3 = (cur_inst >> 12) & 0x7;
            const rs1 = (cur_inst >> 15) & 0x1F;
            const imm_i = simulator.sign_extend((cur_inst >> 20) & 0xFFF, 12);
            const imm_s = simulator.sign_extend(((cur_inst >> 25) << 5) | ((cur_inst >> 7) & 0x1F), 12);
            mem_touch_sizes = [1, 2, 4, 0, 1, 2, 0, 0];
            touched_start_address = simulator.registers[rs1] + ((cur_inst & 0b1111111) == 0x03 ? imm_i : imm_s);
            console.log(touched_start_address);
            for (i = 0; i < mem_touch_sizes[funct3]; i++) {
                touched_by_cur_inst.push(touched_start_address + i);
            }
        }
        for (row = 0; row < 16; row++) {
            let newRow = table.insertRow();
            newRow.innerHTML = "<td>" + hex[row] + "_</td>";
            for (col = 0; col < 16; col++) {
                if (touched_by_cur_inst.includes(mem_addr + 16 * row + col)) {
                    newRow.innerHTML += "<td class='right-align' style=background:#ddd>" + hex[v >> 4] + hex[v & 15] + "</td>";
                } else {
                    v = simulator.memory[mem_addr + 16 * row + col];
                    wr = simulator.memory_accesses[mem_addr + 16 * row + col];
                    newRow.innerHTML += "<td class='right-align'" + styles[wr] + ">" + hex[v >> 4] + hex[v & 15] + "</td>";
                }
            }
        }

    } else {
        inp.classList.add("highlight");
    }
}
function runsingle() {
    simulator.step();
    show_regs(simulator);
    update_mem_viewer();
    highlight_active_line()
}
function runbreakpoint() {
    simulator.run_until_breakpoint();
    show_regs(simulator);
    update_mem_viewer();
    highlight_active_line()
}
function runhalt() {
    simulator.run();
    show_regs(simulator);
    update_mem_viewer();
    highlight_active_line()
}

let labels, inst_cnt, definitions;
function encodeInstructions() {
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
    localStorage["code_" + url] = document.getElementById('instructions').value;
    const instructions = document.getElementById('instructions').value.split('\n');
    const outputTable = document.getElementById('instructionTable').querySelector('tbody');

    outputTable.innerHTML = ''; // Clear existing rows
    machinecode = [];
    const breakpoints = []
    let bitcount = 0;
    let is_breakpoint = false;

    labels = {};
    instructions.forEach((instruction, line) => {
        instruction = instruction.split(';')[0].trim();
        if (instruction !== '') {
            if (/^[^\s0-9][^\s]*\:$/.test(instruction)) {
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
    instructions.forEach((instruction, line) => {
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
                encodedInstructionFormatted = 'Definition';
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
    instructions.forEach((instruction, line) => {
        instruction = instruction.split(';')[0].trim();
        if (instruction !== '') {
            let numBits = 0;
            if (instruction.slice(0, 1) === '>') {
                is_breakpoint = true;
                instruction = instruction.slice(1);
            } else {
                is_breakpoint = false;
            }
            let encodedInstructionFormatted = ""
            if (/^[^\s0-9][^\s]*\:$/.test(instruction)) {
                if (labels[instruction.slice(0, -1)] === inst_cnt << 2) {
                    encodedInstructionFormatted = "Label: " + instruction.slice(0, -1);
                } else {
                    encodedInstructionFormatted = "Label already declared";
                }
            } else if (instruction.slice(0, 1) === '#') {
                if (instruction.match(/=/g) && instruction.match(/=/g).length == 1) {
                    [key, val] = instruction.slice(1).split('=');
                    key = key.trim();
                    val = val.trim();
                    if (register_aliases[key] === -1) {
                        register_aliases[key] = parseInt(val.slice(1));
                        encodedInstructionFormatted = `Definition: ${key} = ${val}`
                    } else {
                        encodedInstructionFormatted = "Invalid Definition";
                    }
                } else {
                    encodedInstructionFormatted = "Invalid Definition";
                }
            } else {
                for (key in definitions) {
                    instruction = instruction.replace(key, definitions[key]);
                }
                encodedInstructionFormatted = encodeInstruction(instruction);
                numBits = (encodedInstructionFormatted.match(/1/g) || []).length;
            }
            const encodedInstruction = encodedInstructionFormatted.replace(/[^01]/g, '');
            const newRow = outputTable.insertRow();
            if (numBits !== 0) {
                newRow.id = "inst" + inst_cnt;
                inst_cnt++;
                breakpoints.push(is_breakpoint);
                machinecode.push(parseInt(encodedInstruction, 2));
            }
            newRow.innerHTML = `
            <td>${numBits !== 0 && breakpoints[breakpoints.length - 1] ? '🔴' : ' '}</td>
              <td>${numBits == 0 ? '' : breakpoints.length - 1}</td>
              <td>${instruction}</td>
              <td class="right-align">${encodedInstructionFormatted}</td>
              <td class="right-align">${numBits === 0 ? '' : numBits}</td>`;
            bitcount += numBits;
        }
        //        machinecode.forEach((val) => {console.log(val.toString(2))});
    });



    simulator = new RISCVSimulator(active_test == tests.length ? customTest : tests[active_test][0], breakpoints, register_breakpoints);
    simulator.loadProgram(machinecode);
    highlight_active_line();
    run_tests();
    document.getElementById("bitcount").innerHTML = "Total bits used: " + bitcount;
    document.getElementById("bitcount_avg").innerHTML = "Bits per instruction: " + (bitcount / machinecode.length).toFixed(2);
    //        simulator.run()
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

for (extension of ISA_EXTENSIONS) {
    if (extension in extensions_instruction_types) {
        for (i in extensions_instruction_types[extension]) {
            instructionTypes[i] = extensions_instruction_types[extension][i];
        }
    }
}

// Can add all extensions here //
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
        colorBits(funct7.toString(2).padStart(7, '0'), 'funct7') +
        colorBits(r2, 'rs2') +
        colorBits(r1, 'rsone') +
        colorBits(funct3.toString(2).padStart(3, '0'), 'funct3') +
        colorBits(rd, 'rd') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
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
        colorBits(imm, 'imm') +
        colorBits(r1, 'rsone') +
        colorBits(funct3.toString(2).padStart(3, '0'), 'funct3') +
        colorBits(rd, 'rd') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
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
        colorBits(funct7.toString(2).padStart(7, '0'), 'funct7') +
        colorBits(imm, 'imm') +
        colorBits(r1, 'rsone') +
        colorBits(funct3.toString(2).padStart(3, '0'), 'funct3') +
        colorBits(rd, 'rd') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
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
        colorBits(imm, 'imm') +
        colorBits(r1, 'rsone') +
        colorBits(funct3.toString(2).padStart(3, '0'), 'funct3') +
        colorBits(rd, 'rd') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
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
        colorBits(imm.slice(0, 7), 'imm') +
        colorBits(r2, 'rs2') +
        colorBits(r1, 'rsone') +
        colorBits(funct3.toString(2).padStart(3, '0'), 'funct3') +
        colorBits(imm.slice(7), 'imm') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
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
        colorBits(imm.slice(0, 1) + imm.slice(2, 8), 'imm') +
        colorBits(r2, 'rs2') +
        colorBits(r1, 'rsone') +
        colorBits(funct3.toString(2).padStart(3, '0'), 'funct3') +
        colorBits(imm.slice(-4) + imm.slice(1, 2), 'imm') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
    return binaryString;
}
function encodeJType(opcodes, parts) {
    if (parts.length === 1) return encodeJType(opcodes, ['x1', parts[0]]);
    if (parts.length !== 2) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    const imm = parseImmediateJ(parts[1]);
    if (rd === -1 || imm === -1) return unknownInstruction;
    const [opcode] = opcodes;
    const binaryString =
        colorBits(imm.slice(0, 1) + imm.slice(10, 20) + imm.slice(9, 10) + imm.slice(1, 9), 'imm') +
        colorBits(rd, 'rd') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
    return binaryString;
}
function encodeUType(opcodes, parts) {
    if (parts.length !== 2) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    const imm = parseImmediateU(parts[1]);
    if (rd === -1 || imm === -1) return unknownInstruction;
    const [opcode] = opcodes;
    const binaryString =
        colorBits(imm, 'imm') +
        colorBits(rd, 'rd') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
    return binaryString;
}
function encodeEType(opcodes, parts) {
    if (parts.length !== 1) return unknownInstruction;
    const rd = registerToBinary(parts[0]);
    if (rd === -1) return unknownInstruction;
    const [opcode, funct3] = opcodes;
    const binaryString =
        colorBits('00000000000000000', 'funct7') +
        colorBits(funct3.toString(2).padStart(3, '0'), 'funct3') +
        colorBits(rd, 'rd') +
        colorBits(opcode.toString(2).padStart(7, '0'), 'opcode');
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
function colorBits(bits, type) {
    return `<span class="${type}">${bits}</span>`;
}

function show_regs(instance) {
    const infoTable = document.getElementById('infoTable').querySelector('tbody');
    infoTable.innerHTML = '';
    const pcRow = infoTable.insertRow();
    pcRow.innerHTML = `
        <td>PC</td>
        <td>0x${instance.pc.toString(16).padStart(8, '0')}</td>
        <td>0b${instance.pc.toString(2).padStart(32, '0')}</td>
        <td>${instance.pc.toString(10)}</td>`
    const cycleRow = infoTable.insertRow();
    cycleRow.innerHTML = `
            <td>CPU cycles</td>
            <td>0x${instance.cycles.toString(16).padStart(8, '0')}</td>
            <td>0b${instance.cycles.toString(2).padStart(32, '0')}</td>
            <td>${instance.cycles.toString(10)}</td>`

    const registerTable = document.getElementById('registerTable').querySelector('tbody');
    registerTable.innerHTML = '';
    instance.registers.forEach((val, reg) => {
        const newRow = registerTable.insertRow();
        newRow.reg_number = reg;
        newRow.onclick = function() {register_clicked(this)};
        if ((register_breakpoints >> reg) & 1) {
            newRow.style.background = 'red';
        }
        val = (val + 0x1_0000_0000) % 0x1_0000_0000;
        newRow.innerHTML = `
                  <td>x${reg}; ${regs_x_to_named[reg]}</td>
                  <td>0x${val.toString(16).padStart(8, '0')}</td>
                  <td>0b${val.toString(2).padStart(32, '0')}</td>
                  <td>${val.toString(10)}</td>`
    }
    );
}

let register_breakpoints = 0;
function register_clicked(el) {
    register_breakpoints ^= (1 << el.reg_number);
    simulator.register_breakpoints = register_breakpoints;
    show_regs(simulator);
}
/*** TODO
 * Add pseudoinstructions:
 *      beqz, bnez, j, jr, la, li, mv, neg, nop, not, ret
 * Support labels
 * 
 * indicator for execution finished
 * 
 * pc value
 * cycle counter
 * 
 * locally save code
 */


let simulator = new RISCVSimulator();
let active_line = 0;
show_regs(simulator);

encodeInstructions()

