let active_test = 0;
let machinecode;
if (localStorage["activetest_" + url]) {
  active_test = localStorage["activetest_" + url];
}
let customTest = customTestExpected = "";
if (localStorage["custom-test_" + url]) {
  customTest = JSON.parse(localStorage["custom-test_" + url]);
}
if (localStorage["custom-test-out_" + url]) {
  customTestExpected = localStorage["custom-test-out_" + url];
//  customTestExpected = JSON.parse(localStorage["custom-test-out_" + url]);
}


function run_tests() {
  const outputTable = document.getElementById('testcaseTable').querySelector('tbody');
  outputTable.innerHTML = ''; // Clear existing rows
  let newRow, idx_;
  tests.forEach((test, idx) => {
    idx_ = idx;
    sim = new RISCVSimulator(test[0]);
    sim.loadProgram(machinecode);
    sim.run();
    input_is_str = typeof(test[0][0]) == "string";
    const outval = sim.halted ? (sim.output + 0x1_0000_0000) % 0x1_0000_0000 : (sim.cycles == sim.cycle_limit ? "Timed Out" : "Execution Failed");
    newRow = outputTable.insertRow();
    newRow.innerHTML = `
        <td class='left-align'>${idx == active_test ? 'X' : ' '}</td>
          <td>${idx}</td>
          <td${input_is_str ? " style=font-style:italic" : ""}>${test[0].toString()}</td>
          <td>${test[1]}</td>
          <td>${outval}`;
    newRow.style.backgroundColor = outval == test[1] ? '#cfc' : '#fcc';
    newRow.number = idx;
  });
  if (customTest === '') {
    sim = new RISCVSimulator([]);
  } else {
    sim = new RISCVSimulator(customTest);
  }
  sim.loadProgram(machinecode);
  sim.run();
  const outval = sim.halted ? (sim.output + 0x1_0000_0000) % 0x1_0000_0000 : (sim.cycles == sim.cycle_limit ? "Timed Out" : "Execution Failed");
  newRow = outputTable.insertRow();
  newRow.id = 'tc-row';
  newRow.innerHTML = `
      <td class='left-align'>${idx_ + 1 == active_test ? 'X' : ' '}</td>
        <td>${"Custom"}</td>
        <td oninput='ctin(this)' id='custom-test' contentEditable>${customTest}</td>
        <td oninput='ctrin()' id='custom-test-out' contentEditable>${customTestExpected}</td>
        <td id='custom-test-out-actual'>${outval}`;
  newRow.style.backgroundColor = outval == customTestExpected ? '#cfc' : '#fcc';
  newRow.number = idx_ + 1;
}


function ctin(e) {
  const item = document.getElementById('custom-test');
  const v = item.innerText;
  customTest = []
  if (input_type == 'str') {
    customTest.push(v);
  } else if (input_type == 'int') {
    for (i of v.split(',')) {
      if (!/\d+/.test(i)) {
        localStorage["custom-test_" + url] = v;
        return
      }
      customTest.push(parseInt(i));
    }
  }
  localStorage["custom-test_" + url] = JSON.stringify(customTest);
  /*
    sim = new RISCVSimulator(customTest);
    sim.loadProgram(machinecode);
    sim.run();
    const outval = sim.halted ? (sim.output + 0x1_0000_0000) % 0x1_0000_0000 : (sim.cycles == sim.cycle_limit ? "Timed Out" : "Execution Failed");
    console.log(outval);*/
    rerunCustomTest();


}
function ctrin(e) {
  const item = document.getElementById('custom-test-out');
  const v = item.innerText;
  localStorage["custom-test-out_" + url] = v;
  if (!/\d+/.test(v)) {
    return;
  }
  localStorage["custom-test-out_" + url] = v;
  customTestExpected = parseInt(v);
  /*
    sim = new RISCVSimulator(customTest);
    sim.loadProgram(machinecode);
    sim.run();
    const outval = sim.halted ? (sim.output + 0x1_0000_0000) % 0x1_0000_0000 : (sim.cycles == sim.cycle_limit ? "Timed Out" : "Execution Failed");
    console.log(outval);*/
  rerunCustomTest();
  document.getElementById('custom-test-out').focus();

}

function rerunCustomTest(){
  const selection = document.getSelection().getRangeAt(0).cloneRange();
  sim = new RISCVSimulator(customTest);
  sim.loadProgram(machinecode);
  sim.run();
  const outval = sim.halted ? (sim.output + 0x1_0000_0000) % 0x1_0000_0000 : (sim.cycles == sim.cycle_limit ? "Timed Out" : "Execution Failed");
  const row = document.getElementById('tc-row');
  document.getElementById('custom-test').innerText = customTest;
  document.getElementById('custom-test-out').innerText = customTestExpected;
  document.getElementById('custom-test-out-actual').innerText = outval;
  row.style.backgroundColor = outval == customTestExpected ? '#cfc' : '#fcc';
  document.getSelection().addRange(selection);
}
