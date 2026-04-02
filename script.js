// ─── SGPA ───────────────────────────────────────────────
function addSubject() {
  const row = document.createElement('div');
  row.className = 'subject-row';
  row.innerHTML = `
    <input type="text"   placeholder="Subject Name" class="sub-name" />
    <input type="number" placeholder="Credits"      class="sub-credits" min="1" />
    <input type="number" placeholder="Grade (0-10)" class="sub-grade" min="0" max="10" step="0.1"/>
    <button class="remove-btn" onclick="removeRow(this)">✕</button>
  `;
  document.getElementById('subjects-container').appendChild(row);
}

function removeRow(btn) {
  btn.parentElement.remove();
}

function calculateSGPA() {
  const credits = [...document.querySelectorAll('.sub-credits')].map(i => parseFloat(i.value));
  const grades  = [...document.querySelectorAll('.sub-grade')].map(i => parseFloat(i.value));

  if (credits.some(isNaN) || grades.some(isNaN)) {
    alert('Please fill in all Credits and Grade fields correctly.'); return;
  }
  if (grades.some(g => g < 0 || g > 10)) {
    alert('Grade must be between 0 and 10.'); return;
  }

  const totalPoints  = credits.reduce((sum, c, i) => sum + c * grades[i], 0);
  const totalCredits = credits.reduce((a, b) => a + b, 0);
  const sgpa = (totalPoints / totalCredits).toFixed(2);

  const resultEl = document.getElementById('sgpa-result');
  resultEl.textContent = `✅ SGPA = ${sgpa}  (Total Credits: ${totalCredits})`;
  resultEl.classList.remove('hidden');
  resultEl.dataset.sgpa    = sgpa;
  resultEl.dataset.credits = totalCredits;

  document.getElementById('add-to-cgpa-btn').classList.remove('hidden');
}

function clearSGPA() {
  document.getElementById('subjects-container').innerHTML = `
    <div class="subject-row">
      <input type="text"   placeholder="Subject Name" class="sub-name" />
      <input type="number" placeholder="Credits"      class="sub-credits" min="1" />
      <input type="number" placeholder="Grade (0-10)" class="sub-grade" min="0" max="10" step="0.1"/>
      <button class="remove-btn" onclick="removeRow(this)">✕</button>
    </div>`;
  document.getElementById('sgpa-result').classList.add('hidden');
  document.getElementById('add-to-cgpa-btn').classList.add('hidden');
}

// ─── CGPA ───────────────────────────────────────────────
let semesterCount = 0;

function addSemesterRow(sgpa = '', credits = '') {
  semesterCount++;
  const div = document.createElement('div');
  div.className = 'semester-row';
  div.innerHTML = `
    <label>Semester ${semesterCount}</label>
    <input type="number" placeholder="SGPA (0-10)"  class="sem-sgpa"    value="${sgpa}"    min="0" max="10" step="0.01"/>
    <input type="number" placeholder="Total Credits" class="sem-credits" value="${credits}" min="1"/>
    <button class="remove-btn" onclick="removeSemester(this)">✕</button>
  `;
  document.getElementById('semesters-container').appendChild(div);
}

function addManualSemester()       { addSemesterRow(); }
function removeSemester(btn)       { btn.parentElement.remove(); }

function addSemesterToCGPA() {
  const r = document.getElementById('sgpa-result');
  addSemesterRow(r.dataset.sgpa, r.dataset.credits);
}

function calculateCGPA() {
  const sgpas   = [...document.querySelectorAll('.sem-sgpa')].map(i => parseFloat(i.value));
  const credits = [...document.querySelectorAll('.sem-credits')].map(i => parseFloat(i.value));

  if (sgpas.length === 0) { alert('Add at least one semester.'); return; }
  if (sgpas.some(isNaN) || credits.some(isNaN)) {
    alert('Please fill in all SGPA and Credits fields.'); return;
  }

  const totalPoints  = sgpas.reduce((sum, s, i) => sum + s * credits[i], 0);
  const totalCredits = credits.reduce((a, b) => a + b, 0);
  const cgpa = (totalPoints / totalCredits).toFixed(2);

  const resultEl = document.getElementById('cgpa-result');
  resultEl.textContent = `🎓 CGPA = ${cgpa}  (Total Credits: ${totalCredits})`;
  resultEl.classList.remove('hidden');
  resultEl.classList.add('cgpa');
}

function clearCGPA() {
  document.getElementById('semesters-container').innerHTML = '';
  semesterCount = 0;
  document.getElementById('cgpa-result').classList.add('hidden');
}