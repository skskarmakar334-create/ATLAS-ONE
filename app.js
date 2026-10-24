(() => {
  "use strict";

  const STORAGE_KEY = "atlas-one-progress-v1";
  const questions = [
    {id:"d1",topic:"Differentiation",concept:"Power rule",difficulty:"Foundation",prompt:"Differentiate y = x³.",options:["3x²","x²","3x","x⁴/4"],answer:0,explanation:"Using the power rule, d(xⁿ)/dx = nxⁿ⁻¹. Therefore d(x³)/dx = 3x²."},
    {id:"d2",topic:"Differentiation",concept:"Power rule",difficulty:"Foundation",prompt:"Differentiate y = 5x⁴.",options:["20x³","5x³","20x⁴","x⁵"],answer:0,explanation:"Bring the power down and reduce the exponent by one: 5 × 4x³ = 20x³."},
    {id:"d3",topic:"Differentiation",concept:"Constant rule",difficulty:"Foundation",prompt:"What is the derivative of y = 7?",options:["7","1","0","7x"],answer:2,explanation:"A constant does not change as x changes, so its derivative is 0."},
    {id:"d4",topic:"Differentiation",concept:"Sum rule",difficulty:"Core",prompt:"Differentiate y = 3x² + 4x.",options:["6x + 4","3x + 4","6x² + 4","6x + 4x"],answer:0,explanation:"Differentiate each term separately: d(3x²)/dx = 6x and d(4x)/dx = 4."},
    {id:"d5",topic:"Differentiation",concept:"Chain rule",difficulty:"Core",prompt:"Differentiate y = (2x + 1)³.",options:["3(2x + 1)²","6(2x + 1)²","3(2x + 1)³","6x²"],answer:1,explanation:"By the chain rule, differentiate the outside power and multiply by the derivative of the inside: 3(2x + 1)² × 2 = 6(2x + 1)²."},
    {id:"d6",topic:"Differentiation",concept:"Chain rule",difficulty:"Core",prompt:"If y = (x² + 3)², what is dy/dx?",options:["2(x² + 3)","4x(x² + 3)","2x(x² + 3)²","4x² + 6"],answer:1,explanation:"Apply the chain rule: 2(x² + 3) × 2x = 4x(x² + 3)."},
    {id:"d7",topic:"Differentiation",concept:"Negative powers",difficulty:"Core",prompt:"Differentiate y = 1/x².",options:["−2/x³","2/x³","−1/x","−2x"],answer:0,explanation:"Rewrite as x⁻². The derivative is −2x⁻³ = −2/x³."},
    {id:"d8",topic:"Differentiation",concept:"Tangents",difficulty:"Stretch",prompt:"For y = x² + 1, what is the gradient at x = 3?",options:["3","6","7","10"],answer:1,explanation:"dy/dx = 2x. At x = 3, the gradient is 2 × 3 = 6."},
    {id:"d9",topic:"Differentiation",concept:"Stationary points",difficulty:"Stretch",prompt:"For y = x² − 4x, at what x-value is the stationary point?",options:["x = 0","x = 2","x = 4","x = −2"],answer:1,explanation:"Differentiate to get dy/dx = 2x − 4. Set it equal to zero: 2x − 4 = 0, so x = 2."},
    {id:"d10",topic:"Differentiation",concept:"Trigonometric derivatives",difficulty:"Core",prompt:"Differentiate y = sin x (with x measured in radians).",options:["−sin x","cos x","tan x","−cos x"],answer:1,explanation:"For angles measured in radians, d(sin x)/dx = cos x."},
    {id:"a1",topic:"Algebra",concept:"Expanding brackets",difficulty:"Foundation",prompt:"Expand 3(x + 4).",options:["3x + 4","3x + 12","x + 12","7x"],answer:1,explanation:"Multiply each term inside the bracket by 3: 3 × x + 3 × 4 = 3x + 12."},
    {id:"a2",topic:"Algebra",concept:"Linear equations",difficulty:"Foundation",prompt:"Solve 2x + 5 = 13.",options:["x = 3","x = 4","x = 5","x = 9"],answer:1,explanation:"Subtract 5 from both sides to get 2x = 8, then divide by 2: x = 4."},
    {id:"a3",topic:"Algebra",concept:"Indices",difficulty:"Core",prompt:"Simplify x³ × x⁴.",options:["x¹²","x","x⁷","2x⁷"],answer:2,explanation:"When multiplying powers with the same base, add the exponents: x³ × x⁴ = x⁷."},
    {id:"a4",topic:"Algebra",concept:"Factorisation",difficulty:"Core",prompt:"Factorise x² + 5x.",options:["x(x + 5)","x²(1 + 5)","(x + 1)(x + 5)","5x(x + 1)"],answer:0,explanation:"Take out the common factor x: x² + 5x = x(x + 5)."},
    {id:"a5",topic:"Algebra",concept:"Quadratics",difficulty:"Core",prompt:"Solve x² = 25.",options:["x = 5 only","x = −5 only","x = ±5","x = 25"],answer:2,explanation:"Both 5² and (−5)² equal 25, so the solutions are x = ±5."},
    {id:"a6",topic:"Algebra",concept:"Rearranging",difficulty:"Stretch",prompt:"Make x the subject of y = 3x − 2.",options:["x = (y − 2)/3","x = (y + 2)/3","x = 3y + 2","x = y/3 − 2"],answer:1,explanation:"Add 2 to both sides: y + 2 = 3x. Divide by 3: x = (y + 2)/3."},
    {id:"f1",topic:"Functions",concept:"Function notation",difficulty:"Foundation",prompt:"If f(x) = 2x + 3, find f(4).",options:["8","10","11","14"],answer:2,explanation:"Substitute x = 4: f(4) = 2(4) + 3 = 11."},
    {id:"f2",topic:"Functions",concept:"Composite functions",difficulty:"Core",prompt:"If f(x) = x + 1 and g(x) = 2x, find f(g(3)).",options:["7","6","8","4"],answer:0,explanation:"First g(3) = 6. Then f(6) = 6 + 1 = 7."},
    {id:"f3",topic:"Functions",concept:"Inverse functions",difficulty:"Core",prompt:"If f(x) = x + 5, what is f⁻¹(x)?",options:["x + 5","5 − x","x − 5","1/(x + 5)"],answer:2,explanation:"Set y = x + 5, swap x and y to get x = y + 5, then rearrange: y = x − 5."},
    {id:"f4",topic:"Functions",concept:"Domain",difficulty:"Core",prompt:"For f(x) = 1/(x − 2), which value is excluded from the domain?",options:["x = 0","x = 1","x = 2","x = 3"],answer:2,explanation:"The denominator cannot equal zero. x − 2 = 0 when x = 2, so this value is excluded."},
    {id:"f5",topic:"Functions",concept:"Function notation",difficulty:"Foundation",prompt:"If f(x) = x², what is f(−3)?",options:["−9","6","−6","9"],answer:3,explanation:"Substitute −3: f(−3) = (−3)² = 9."}
  ];

  const $ = (selector) => document.querySelector(selector);
  const topicNames = ["Differentiation", "Algebra", "Functions"];
  let state = loadState();
  let quiz = null;
  let toastTimer;

  function blankState() {
    return {answers:{}, sessions:0, activeDays:[], lastSession:null};
  }
  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!parsed || typeof parsed !== "object" || !parsed.answers) return blankState();
      return {...blankState(), ...parsed, answers:parsed.answers || {}};
    } catch (_) { return blankState(); }
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (_) { showToast("Could not save progress in this browser."); }
  }
  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }
  function markPracticeDay() {
    const today = todayKey();
    if (!state.activeDays.includes(today)) state.activeDays.push(today);
    state.activeDays.sort();
    state.lastSession = today;
  }
  function getStats(topic) {
    const entries = Object.values(state.answers).filter(a => !topic || a.topic === topic);
    const correct = entries.filter(a => a.correct).length;
    return {answered:entries.length, correct, accuracy:entries.length ? Math.round(correct/entries.length*100) : 0};
  }
  function getMastery(topic) {
    const stats = getStats(topic);
    return stats.answered ? Math.round((stats.correct / stats.answered) * 100) : null;
  }
  function streakCount() {
    const days = new Set(state.activeDays || []);
    let date = new Date();
    if (!days.has(todayKey())) date.setDate(date.getDate()-1);
    let count = 0;
    while (days.has(`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`)) {
      count++;
      date.setDate(date.getDate()-1);
    }
    return count;
  }
  function renderStats() {
    const stats = getStats();
    $("#statAnswered").textContent = stats.answered;
    $("#statCorrect").textContent = `${stats.accuracy}%`;
    $("#statTopics").textContent = topicNames.filter(t => getStats(t).answered > 0).length;
    $("#statStreak").textContent = streakCount();
    $("#diffProgress").textContent = `${getStats("Differentiation").answered} questions answered`;
    $("#algebraProgress").textContent = `${getStats("Algebra").answered} questions answered`;
    $("#functionsProgress").textContent = `${getStats("Functions").answered} questions answered`;
  }
  function renderMastery() {
    const host = $("#masteryList");
    host.replaceChildren();
    topicNames.forEach(topic => {
      const stats = getStats(topic);
      const mastery = getMastery(topic);
      const row = document.createElement("div");
      row.className = "mastery-row";
      const label = document.createElement("div");
      const name = document.createElement("div"); name.className = "mastery-name"; name.textContent = topic;
      const detail = document.createElement("div"); detail.className = "mastery-detail"; detail.textContent = stats.answered ? `${stats.answered} answered · ${stats.correct} correct` : "Not assessed yet";
      label.append(name, detail);
      const bar = document.createElement("div"); bar.className = "mastery-bar";
      const fill = document.createElement("span"); fill.style.width = `${mastery === null ? 0 : mastery}%`; bar.append(fill);
      const score = document.createElement("div"); score.className = "mastery-score"; score.textContent = mastery === null ? "—" : `${mastery}%`;
      row.append(label, bar, score); host.append(row);
    });
    const assessed = topicNames.filter(t => getStats(t).answered);
    if (!assessed.length) {
      $("#recommendTitle").textContent = "Start with a short diagnostic";
      $("#recommendText").textContent = "Answer a few questions to build your first topic-level learning snapshot.";
    } else {
      const unassessed = topicNames.find(t => !getStats(t).answered);
      const weakest = assessed.sort((a,b) => getMastery(a)-getMastery(b))[0];
      if (unassessed) {
        $("#recommendTitle").textContent = `Explore ${unassessed}`;
        $("#recommendText").textContent = `You have not answered any ${unassessed} questions yet. Try a short set to build a more complete learning snapshot.`;
      } else {
        $("#recommendTitle").textContent = `Review ${weakest}`;
        $("#recommendText").textContent = `Your recorded accuracy is lowest in ${weakest}. Try another set, review explanations, and compare your next results.`;
      }
    }
  }
  function renderAll() { renderStats(); renderMastery(); }

  function showToast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  }
  function startQuiz() {
    const topic = $("#topicSelect").value;
    const amount = $("#questionCount").value;
    let pool = questions.filter(q => topic === "All" || q.topic === topic);
    if (topic === "All") {
      // Interleave topics so mixed diagnostics do not begin with one subject only.
      pool = pool.sort(() => Math.random() - 0.5);
    } else {
      pool = pool.sort((a,b) => {
        const am = getMastery(a.topic) ?? 50, bm = getMastery(b.topic) ?? 50;
        return (am - bm) + (Math.random() - .5) * 10;
      });
    }
    if (amount !== "all") pool = pool.slice(0, Number(amount));
    quiz = {items:pool, index:0, correct:0, answered:false, selected:null, topic};
    renderQuestion();
    $("#quizPanel").scrollIntoView({behavior:"smooth",block:"center"});
  }
  function renderQuestion() {
    const host = $("#quizPanel");
    if (!quiz) return;
    if (quiz.index >= quiz.items.length) { renderResult(); return; }
    const q = quiz.items[quiz.index];
    const progress = Math.round(quiz.index / quiz.items.length * 100);
    host.innerHTML = `
      <div class="quiz-topline"><span>QUESTION ${quiz.index+1} OF ${quiz.items.length}</span><span>${escapeHTML(q.difficulty.toUpperCase())}</span></div>
      <div class="quiz-progress"><span style="width:${progress}%"></span></div>
      <div class="question-topic">${escapeHTML(q.topic.toUpperCase())} · ${escapeHTML(q.concept.toUpperCase())}</div>
      <h3 class="question-text">${escapeHTML(q.prompt)}</h3>
      <div class="options">${q.options.map((option,i)=>`<button type="button" class="option-button" data-option="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${escapeHTML(option)}</span></button>`).join("")}</div>
      <div id="feedbackHost"></div>
      <div class="quiz-controls"><span class="muted" style="font-size:10px">Choose the best answer.</span><button type="button" class="button button-primary" id="nextQuestion" disabled>${quiz.index === quiz.items.length-1 ? "See results" : "Next question"} →</button></div>`;
    host.querySelectorAll("[data-option]").forEach(btn => btn.addEventListener("click", () => chooseAnswer(Number(btn.dataset.option))));
    $("#nextQuestion").addEventListener("click", nextQuestion);
  }
  function chooseAnswer(index) {
    if (!quiz || quiz.answered) return;
    const q = quiz.items[quiz.index];
    quiz.answered = true;
    quiz.selected = index;
    const isCorrect = index === q.answer;
    if (isCorrect) quiz.correct++;
    const previous = state.answers[q.id];
    // Save the latest answer per question so repeated attempts update mastery rather than inflate volume.
    state.answers[q.id] = {topic:q.topic, concept:q.concept, correct:isCorrect, lastAnswer:todayKey(), attempts:(previous?.attempts || 0)+1};
    markPracticeDay();
    saveState();
    const buttons = $("#quizPanel").querySelectorAll("[data-option]");
    buttons.forEach((btn,i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("correct");
      if (i === index && !isCorrect) btn.classList.add("incorrect");
    });
    const feedback = $("#feedbackHost");
    feedback.className = `answer-feedback ${isCorrect ? "good" : "bad"}`;
    feedback.innerHTML = `<b>${isCorrect ? "Correct — nice work." : "Not quite. Review the method."}</b>${escapeHTML(q.explanation)}`;
    $("#nextQuestion").disabled = false;
    renderAll();
  }
  function nextQuestion() {
    if (!quiz || !quiz.answered) return;
    quiz.index++;
    quiz.answered = false;
    quiz.selected = null;
    renderQuestion();
  }
  function renderResult() {
    const host = $("#quizPanel");
    const total = quiz.items.length;
    const percent = Math.round(quiz.correct/total*100);
    state.sessions++;
    saveState();
    renderAll();
    const recommendation = quiz.topic === "All"
      ? "Review the topic with the lowest recorded accuracy, then try another short set."
      : `Review the worked examples for ${quiz.topic}, then practise again to check your understanding.`;
    host.innerHTML = `<div class="quiz-result"><div class="result-ring"><strong>${percent}%</strong></div><div class="eyebrow" style="justify-content:center">SESSION COMPLETE</div><h3>${percent>=80?"Strong effort. Keep going.":percent>=50?"Good start. Build on it.":"A useful starting point."}</h3><p>You answered <strong>${quiz.correct} of ${total}</strong> questions correctly in this session. These results are a practice snapshot, not a formal grade.</p><div class="answer-feedback good" style="text-align:left"><b>Suggested next step</b>${escapeHTML(recommendation)}</div><div class="result-actions"><button type="button" class="button button-primary" id="retryQuiz">Practise again ↻</button><a class="button button-outline" href="#progress">View topic map ↗</a></div></div>`;
    $("#retryQuiz").addEventListener("click", startQuiz);
    showToast("Session results saved on this device.");
  }
  $("#startQuiz").addEventListener("click", startQuiz);
  document.querySelectorAll("[data-start-topic]").forEach(btn => btn.addEventListener("click", () => {
    $("#topicSelect").value = btn.dataset.startTopic;
    $("#questionCount").value = "5";
    startQuiz();
  }));
  $("#resetButton").addEventListener("click", () => {
    if (!window.confirm("Clear all ATLAS ONE progress saved in this browser? This cannot be undone.")) return;
    state = blankState(); saveState(); quiz = null; renderAll();
    $("#quizPanel").innerHTML = `<div class="quiz-empty"><div class="empty-symbol">?</div><h3>Your next insight starts here</h3><p>Start a practice set to see questions, explanations, and a personalised next-step suggestion.</p><div class="empty-decoration"><span></span><span></span><span></span><span></span><span></span></div></div>`;
    showToast("Local progress cleared.");
  });

  renderAll();
})();