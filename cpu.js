let CYCLE_LIMIT = 1 << 16;
if (localStorage["cycle_limit"]) {
    CYCLE_LIMIT = localStorage["cycle_limit"];
}

class RISCVSimulator {
    constructor(inputs = [], breakpoints = [], register_breakpoints = 0, memorySize = 0x100000, cycle_limit = CYCLE_LIMIT) { // 1 MiB
        this.memory = new Uint8Array(memorySize);
        this.memory_accesses = new Uint8Array(memorySize); /* 000000WR - tells if cell was written and/or read */
        this.registers = new Int32Array(32); // 32 registers, RV32I
        this.pc = 0; // Program counter
        this.imem = new Uint32Array(1024);
        this.cycle_limit = cycle_limit;
        this.inst_count = 0;
        this.cycles = 0;
        this.breakpoints = breakpoints;
        this.register_breakpoints = register_breakpoints;
        this.inputs = [];
        let input, i;
        for (input of inputs) {
            if (typeof (input) === 'string') {
                for (i in input) {
                    this.inputs.push(input.charCodeAt(i));
                }
                this.inputs.push(0)
            } else if (typeof (input) === 'number') {
                this.inputs.push(input);
            } else {
                console.error(`Unsupported input type ${typeof (input)} for input ${input}`);
            }
        }
        this.input_index = 0;
        this.output = -1;
        this.halted = false;
    }

    readWord(address) {
        this.memory_accesses[address + 0] |= 0b01;
        this.memory_accesses[address + 1] |= 0b01;
        this.memory_accesses[address + 2] |= 0b01;
        this.memory_accesses[address + 3] |= 0b01;
        return this.memory[address + 0] |
            (this.memory[address + 1] << 8) |
            (this.memory[address + 2] << 16) |
            (this.memory[address + 3] << 24);
    }

    writeWord(address, value) {
        this.memory_accesses[address + 0] |= 0b10;
        this.memory_accesses[address + 1] |= 0b10;
        this.memory_accesses[address + 2] |= 0b10;
        this.memory_accesses[address + 3] |= 0b10;
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
                console.error(`Unsupported opcode: 0x${opcode.toString(16)} in instruction 0b${instruction}`);
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
                this.memory_accesses[address + 0] |= 0b01;
                this.registers[rd] = this.sign_extend(this.memory[address], 8);
                break;
            case 0x1: // LH
                this.memory_accesses[address + 0] |= 0b01;
                this.memory_accesses[address + 1] |= 0b01;
                this.registers[rd] = this.sign_extend(this.memory[address] | (this.memory[address + 1] << 8), 16);
                break;
            case 0x2: // LW
                this.registers[rd] = this.readWord(address);
                break;
            case 0x4: // LBU
                this.memory_accesses[address + 0] |= 0b01;
                this.registers[rd] = this.memory[address];
                break;
            case 0x5: // LHU
                this.memory_accesses[address + 0] |= 0b01;
                this.memory_accesses[address + 1] |= 0b01;
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
                this.memory_accesses[address + 0] |= 0b10;
                this.memory[address] = this.registers[rs2] & 0xFF;
                break;
            case 0x1: // SH
                this.memory_accesses[address + 0] |= 0b10;
                this.memory_accesses[address + 1] |= 0b10;
                this.memory[address + 0] = this.registers[rs2] & 0xFF;
                this.memory[address + 1] = (this.registers[rs2] >> 8) & 0xFF;
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
        this.registers[rd] = this.pc - imm + 4;
    }

    handleITypeJALR(rd, rs1, imm) {
        const temp = this.pc - imm + 4;
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
        while (!this.halted && this.pc % 4 === 0 && this.pc < this.inst_count * 4 && this.cycles < this.cycle_limit) {
            const instruction = this.fetch();
            this.execute(instruction);
            this.cycles++;
        }
    }
    run_until_breakpoint() {
        this.step();
        while (!this.breakpoints[this.pc >> 2] && !this.halted && this.pc % 4 === 0 && this.pc < this.inst_count * 4 && this.cycles < this.cycle_limit) {
            const instruction = this.fetch();
            this.execute(instruction);
            this.cycles++;
            console.log(instruction, this.register_breakpoints);
            if ([0x33, 0x03, 0x37, 0x17, 0x6F, 0x67, 0x73].includes(instruction & 0x7F) && ((this.register_breakpoints >> ((instruction >> 7) & 0x1F)) & 1)) {
                break;
            }
        }

    }
    step() {
        if (!this.halted && this.pc % 4 === 0 && this.pc < this.inst_count * 4 && this.cycles < this.cycle_limit) {
            const instruction = this.fetch();
            this.execute(instruction);
            this.cycles++;
        }
    }
}
