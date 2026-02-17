(() => {
  const $ = (id) => document.getElementById(id);
  const randFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);

  function stripTonos(s){
    return s
      .toLowerCase()
      .replaceAll("ά","α").replaceAll("έ","ε").replaceAll("ή","η").replaceAll("ί","ι")
      .replaceAll("ό","ο").replaceAll("ύ","υ").replaceAll("ώ","ω");
  }

  function speak(text){
    const fb = $("feedback");
    try{
      if(!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined"){
        fb.innerHTML = `<span class="bad">Δεν υποστηρίζεται ήχος εδώ.</span> Άνοιξέ το σε Chrome.`;
        if(navigator.vibrate) navigator.vibrate([80,60,80]);
        return;
      }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "el-GR";
      u.rate = 0.95;
      u.onerror = () => {
        fb.innerHTML = `<span class="bad">Ο ήχος μπλοκαρίστηκε.</span> Άνοιξέ το σε Chrome.`;
        if(navigator.vibrate) navigator.vibrate([80,60,80]);
      };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch(e){
      fb.innerHTML = `<span class="bad">Δεν παίζει ήχος εδώ.</span> Άνοιξέ το σε Chrome.`;
      if(navigator.vibrate) navigator.vibrate([80,60,80]);
    }
  }

  function svgCardDataURI(emoji, bg="#ffffff"){
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${bg}"/>
            <stop offset="1" stop-color="#ffffff"/>
          </linearGradient>
        </defs>
        <rect width="240" height="240" rx="34" fill="url(#g)"/>
        <circle cx="120" cy="120" r="86" fill="#ffffffcc"/>
        <text x="120" y="148" font-size="96" text-anchor="middle">${emoji}</text>
      </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg.trim());
  }

  // =========
  // DATA
  // =========
  // Level 1 (24 γράμματα)
  const L1 = [
    {letter:"α", word:"αλάτι",   pic: svgCardDataURI("🧂", "#ffd6a5")},
    {letter:"β", word:"βίδα",    pic: svgCardDataURI("🔩", "#caffbf")},
    {letter:"γ", word:"γάτα",    pic: svgCardDataURI("🐱", "#bdb2ff")},
    {letter:"δ", word:"δόντι",   pic: svgCardDataURI("🦷", "#a0c4ff")},
    {letter:"ε", word:"ελάφι",   pic: svgCardDataURI("🦌", "#d0f4de")},
    {letter:"ζ", word:"ζάρι",    pic: svgCardDataURI("🎲", "#ffadad")},
    {letter:"η", word:"ήλιος",   pic: svgCardDataURI("☀️", "#fdffb6")},
    {letter:"θ", word:"θέμα",    pic: svgCardDataURI("📘", "#a0c4ff")},
    {letter:"ι", word:"ιστός",   pic: svgCardDataURI("🕸️", "#bdb2ff")},
    {letter:"κ", word:"κάρο",    pic: svgCardDataURI("🛒", "#caffbf")},
    {letter:"λ", word:"λέξη",    pic: svgCardDataURI("🔤", "#ffd6a5")},
    {letter:"μ", word:"μήλο",    pic: svgCardDataURI("🍎", "#ffadad")},
    {letter:"ν", word:"νερό",    pic: svgCardDataURI("💧", "#a0c4ff")},
    {letter:"ξ", word:"ξίδι",    pic: svgCardDataURI("🧴", "#d0f4de")},
    {letter:"ο", word:"ομπρέλα", pic: svgCardDataURI("☂️", "#bdb2ff")},
    {letter:"π", word:"πόδι",    pic: svgCardDataURI("🦶", "#ffd6a5")},
    {letter:"ρ", word:"ρόδα",    pic: svgCardDataURI("🌹", "#ffadad")},
    {letter:"σ", word:"σάκος",   pic: svgCardDataURI("🎒", "#caffbf")},
    {letter:"τ", word:"τόνος",   pic: svgCardDataURI("🐟", "#a0c4ff")},
    {letter:"υ", word:"ύφος",    pic: svgCardDataURI("😎", "#fdffb6")},
    {letter:"φ", word:"φως",     pic: svgCardDataURI("💡", "#ffd6a5")},
    {letter:"χ", word:"χέρι",    pic: svgCardDataURI("✋", "#caffbf")},
    {letter:"ψ", word:"ψάρι",    pic: svgCardDataURI("🐠", "#a0c4ff")},
    {letter:"ω", word:"ώρα",     pic: svgCardDataURI("⏰", "#ffadad")},
  ];
  const LETTERS_24 = L1.map(x => x.letter);

  // Level 2 (ΜΟΝΟ απλές υπαρκτές λέξεις με τους κανόνες σου)
  const L2 = [
    {word:"μαμά",   pic: svgCardDataURI("👩", "#ffd6a5")},
    {word:"παπά",   pic: svgCardDataURI("🧔", "#caffbf")},
    {word:"γάτα",   pic: svgCardDataURI("🐱", "#bdb2ff")},
    {word:"κότα",   pic: svgCardDataURI("🐔", "#fdffb6")},
    {word:"μήλο",   pic: svgCardDataURI("🍎", "#ffadad")},
    {word:"νερό",   pic: svgCardDataURI("💧", "#a0c4ff")},
    {word:"γάλα",   pic: svgCardDataURI("🥛", "#a0c4ff")},
    {word:"μέλι",   pic: svgCardDataURI("🍯", "#ffd6a5")},
    {word:"αλάτι",  pic: svgCardDataURI("🧂", "#ffd6a5")},
    {word:"λάδι",   pic: svgCardDataURI("🫙", "#d0f4de")},
    {word:"τομάτα", pic: svgCardDataURI("🍅", "#fdffb6")},
    {word:"πατάτα", pic: svgCardDataURI("🥔", "#caffbf")},
    {word:"καρότο", pic: svgCardDataURI("🥕", "#ffadad")},
    {word:"λεμόνι", pic: svgCardDataURI("🍋", "#fdffb6")},
    {word:"κεράσι", pic: svgCardDataURI("🍒", "#ffadad")},
    {word:"ρόδα",   pic: svgCardDataURI("🌹", "#ffadad")},
    {word:"ζάρι",   pic: svgCardDataURI("🎲", "#ffadad")},
    {word:"χέρι",   pic: svgCardDataURI("✋", "#caffbf")},
    {word:"μάτι",   pic: svgCardDataURI("👁️", "#ffd6a5")},
    {word:"πόδι",   pic: svgCardDataURI("🦶", "#ffd6a5")},
    {word:"φως",    pic: svgCardDataURI("💡", "#ffd6a5")},
    {word:"ώρα",    pic: svgCardDataURI("⏰", "#ffadad")},
    {word:"ήλιος",  pic: svgCardDataURI("☀️", "#fdffb6")},
    {word:"θέμα",   pic: svgCardDataURI("📘", "#a0c4ff")},
    {word:"βίδα",   pic: svgCardDataURI("🔩", "#a0c4ff")},
    {word:"δέμα",   pic: svgCardDataURI("📦", "#caffbf")},
    {word:"μέρα",   pic: svgCardDataURI("📅", "#bdb2ff")},
  ];

  // Level 3/5 (δύσκολα: δίψηφα/συμπλέγματα/μπ-ντ-γκ/ου-αι-ει-οι-αυ-ευ)
  const L3 = [
    {word:"αρκούδα", pic: svgCardDataURI("🐻", "#ffd6a5")},
    {word:"τραπέζι", pic: svgCardDataURI("🪑", "#a0c4ff")},
    {word:"πόρτα",   pic: svgCardDataURI("🚪", "#caffbf")},
    {word:"δείγμα",  pic: svgCardDataURI("🔍", "#bdb2ff")},
    {word:"σκύλος",  pic: svgCardDataURI("🐶", "#d0f4de")},
    {word:"σπίτι",   pic: svgCardDataURI("🏠", "#ffd6a5")},
    {word:"μπανάνα", pic: svgCardDataURI("🍌", "#fdffb6")},
    {word:"μπάλα",   pic: svgCardDataURI("⚽", "#ffadad")},
    {word:"ντομάτα", pic: svgCardDataURI("🍅", "#fdffb6")},
    {word:"γκολ",    pic: svgCardDataURI("🥅", "#a0c4ff")},
    {word:"ευχή",    pic: svgCardDataURI("✨", "#caffbf")},
    {word:"αυγό",    pic: svgCardDataURI("🥚", "#ffd6a5")},
    {word:"κουτί",   pic: svgCardDataURI("📦", "#bdb2ff")},
    {word:"παίδι",   pic: svgCardDataURI("🧒", "#d0f4de")},
    {word:"σταφύλι", pic: svgCardDataURI("🍇", "#caffbf")},
    {word:"σχολείο", pic: svgCardDataURI("🏫", "#a0c4ff")},
  ];

  // =========
  // SYLLABLE HELPERS
  // =========
  const VOWELS = new Set(["α","ε","η","ι","ο","υ","ω"]);
  const DIGRAPH_VOWELS = ["αι","ει","οι","ου","αυ","ευ"];
  const START_CLUSTERS = ["στ","σκ","σπ","τρ","πρ","κρ","βρ","γρ","χρ","φρ","θρ","δρ"];
  const START_DIGRAPH_CONS = ["μπ","ντ","γκ","γγ"];

  function firstSyllable_L2(word){
    const w = stripTonos(word);
    if(VOWELS.has(w[0])) return w[0];
    return w.slice(0,2); // CV
  }

  function firstSyllable_L3(word){
    const w = stripTonos(word);

    for(const dc of START_DIGRAPH_CONS){
      if(w.startsWith(dc)){
        const rest = w.slice(2);
        for(const dv of DIGRAPH_VOWELS){
          if(rest.startsWith(dv)) return dc + dv;
        }
        return w.slice(0,3);
      }
    }

    for(const cl of START_CLUSTERS){
      if(w.startsWith(cl)){
        const rest = w.slice(2);
        for(const dv of DIGRAPH_VOWELS){
          if(rest.startsWith(dv)) return cl + dv;
        }
        return w.slice(0,3);
      }
    }

    if(VOWELS.has(w[0])){
      for(const dv of DIGRAPH_VOWELS){
        if(w.startsWith(dv)) return dv;
      }
      return w[0];
    }

    const rest = w.slice(1);
    for(const dv of DIGRAPH_VOWELS){
      if(rest.startsWith(dv)) return w[0] + dv;
    }
    return w.slice(0,2);
  }

  function makeChoices(correct, pool, n=4){
    const s = new Set([correct]);
    while(s.size < n) s.add(randFrom(pool));
    return shuffle([...s]);
  }

  // Pools για επιλογές συλλαβών
  const SYLL_POOL_L2 = [];
  const CONS = ["μ","ν","π","τ","κ","λ","ρ","σ","φ","θ","β","δ","γ","χ","ζ","ξ","ψ"];
  const VOW = ["α","ε","η","ι","ο","υ","ω"];
  for(const c of CONS) for(const v of VOW) SYLL_POOL_L2.push(c+v);

  const SYLL_POOL_L3 = Array.from(new Set([
    ...START_DIGRAPH_CONS.map(x => x+"α"),
    ...START_DIGRAPH_CONS.map(x => x+"ο"),
    ...START_CLUSTERS.map(x => x+"α"),
    ...START_CLUSTERS.map(x => x+"ο"),
    "αυ","ευ","ου","αι","ει","οι","τρα","προ","σπι","σκο","σκυ","στα","ντο","μπα","γκο","κου","πορ","δει"
  ]));

  // =========
  // STATE (με πραγματική πρόοδο)
  // =========
  const state = {
    level: 1,
    coins: 0,
    streak: 0,
    correct: 0,
    correctSinceReward: 0,
    masteredLetters: new Set(),
    current: null,

    // mastery counters (πόσες φορές το πέτυχε σωστά)
    mastery: {
      1: new Map(), // γράμμα -> count
      2: new Map(), // λέξη -> count
      3: new Map(),
      4: new Map(),
      5: new Map(),
    },

    // πόσες σωστές για να “κλειδώσει” ως μαθεμένο
    need: {1: 1, 2: 2, 3: 2, 4: 2, 5: 2},
  };

  // =========
  // UI refs
  // =========
  const levelNameEl = $("levelName");
  const coinsEl = $("coins");
  const streakEl = $("streak");
  const correctEl = $("correct");
  const picEl = $("pic");
  const promptEl = $("prompt");
  const hintEl = $("hint");
  const teacherLineEl = $("teacherLine");
  const teacherWordEl = $("teacherWord");
  const choicesEl = $("choices");
  const progressTxtEl = $("progressTxt");
  const barFillEl = $("barFill");
  const gateInfoEl = $("gateInfo");
  const feedbackEl = $("feedback");
  const soundBtn = $("soundBtn");
  const repeatBtn = $("repeatBtn");
  const nextBtn = $("nextBtn");
  const resetBtn = $("resetBtn");
  const showTeacher = $("showTeacher");
  const rewardEl = $("reward");
  const rewardTextEl = $("rewardText");
  const rewardOkBtn = $("rewardOk");

  // =========
  // Progress helpers
  // =========
  function masteredCount(level){
    const m = state.mastery[level];
    const need = state.need[level] || 2;
    let cnt = 0;
    for(const [,v] of m.entries()){
      if(v >= need) cnt++;
    }
    return cnt;
  }

  function totalItems(level){
    if(level === 1) return 24;
    if(level === 2 || level === 4) return L2.length;
    return L3.length; // levels 3 & 5
  }

  function canAdvance(level){
    // Level 1: πρέπει 24/24 γράμματα
    if(level === 1) return state.masteredLetters.size >= 24;

    // για τα άλλα: θέλουμε “μαθεμένα” ένα κομμάτι, όχι απλά τυχαία σωστά
    // (για μικρές λίστες, βάζουμε στόχο 70% ή τουλάχιστον 10)
    const total = totalItems(level);
    const goal = Math.max(10, Math.ceil(total * 0.70));
    return masteredCount(level) >= Math.min(goal, total);
  }

  function showReward(){
    rewardTextEl.textContent = "🎁 +50 coins (κάθε 10 σωστά)";
    rewardEl.style.display = "flex";
  }
  function hideReward(){ rewardEl.style.display = "none"; }

  function maybeReward(){
    if(state.correctSinceReward >= 10){
      state.correctSinceReward = 0;
      state.coins += 50;
      showReward();
      return true;
    }
    return false;
  }

  function uiSync(){
    levelNameEl.textContent = String(state.level);
    coinsEl.textContent = String(state.coins);
    streakEl.textContent = String(state.streak);
    correctEl.textContent = String(state.correct);

    teacherLineEl.style.display = showTeacher.checked ? "block" : "none";

    if(state.level === 1){
      const m = state.masteredLetters.size;
      progressTxtEl.textContent = `${m}/24`;
      barFillEl.style.width = `${Math.round((m/24)*100)}%`;
      gateInfoEl.textContent = `Level 1: πρέπει να “κλειδώσει” και τα 24 γράμματα.`;
      nextBtn.disabled = !canAdvance(1);
    } else {
      const total = totalItems(state.level);
      const m = masteredCount(state.level);
      const goal = Math.max(10, Math.ceil(total * 0.70));
      progressTxtEl.textContent = `${m}/${total}`;
      barFillEl.style.width = `${Math.round((m/total)*100)}%`;
      gateInfoEl.textContent = `Μαθεμένα: ${m}/${total}. Για επόμενο επίπεδο: ${Math.min(goal,total)} μαθεμένα (2 σωστά/λέξη).`;
      nextBtn.disabled = !canAdvance(state.level);
    }
  }

  // =========
  // Adaptive pick (λιγότερη επανάληψη)
  // =========
  function isMastered(level, key){
    const m = state.mastery[level];
    return (m.get(key) || 0) >= (state.need[level] || 2);
  }

  function pickAdaptive(level, items, keyFn){
    const unmastered = [];
    const mastered = [];
    for(const it of items){
      const k = keyFn(it);
      (isMastered(level, k) ? mastered : unmastered).push(it);
    }
    // 85% πάμε σε κάτι που ΔΕΝ έχει κλειδώσει
    if(unmastered.length && Math.random() < 0.85) return randFrom(unmastered);
    if(mastered.length) return randFrom(mastered);
    return randFrom(items);
  }

  function incMastery(level, key){
    const m = state.mastery[level];
    const v = (m.get(key) || 0) + 1;
    m.set(key, v);
    return v;
  }

  // =========
  // Questions
  // =========
  function setQuestion(q){
    state.current = q;
    feedbackEl.textContent = "";
    picEl.src = q.pic;
    teacherWordEl.textContent = q.teacher;
    promptEl.textContent = q.prompt;
    hintEl.textContent = q.hint;

    choicesEl.innerHTML = "";
    q.choices.forEach(ch => {
      const b = document.createElement("button");
      b.className = "choiceBtn";
      b.textContent = ch;
      b.onclick = () => {
        if(q.lockUntilSound && !q.soundPlayed){
          feedbackEl.innerHTML = `<span class="bad">Πρώτα πάτα 🔊</span>`;
          return;
        }
        onAnswer(ch);
      };
      choicesEl.appendChild(b);
    });

    uiSync();
  }

  function qL1(){
    const it = pickAdaptive(1, L1, x => x.letter);
    const correct = it.letter;

    return {
      teacher: it.word,
      word: it.word,
      pic: it.pic,
      speakText: it.word,
      prompt: "Άκου τη λέξη και πάτα το 1ο γράμμα",
      hint: "Για να πάει παρακάτω: 24/24 γράμματα κλειδωμένα.",
      answer: correct,
      choices: makeChoices(correct, LETTERS_24, 4),
      lockUntilSound: true,
      soundPlayed: false,
      masteryKey: correct,
      masteryLevel: 1
    };
  }

  function qL2(){
    const it = pickAdaptive(2, L2, x => x.word);
    const syll = firstSyllable_L2(it.word);
    const ans = stripTonos(syll);

    return {
      teacher: it.word + " (αρχική συλλαβή: " + ans + ")",
      word: it.word,
      pic: it.pic,
      speakText: it.word,
      prompt: "Άκου τη λέξη και πάτα την αρχική συλλαβή",
      hint: "Level 2: μόνο απλές υπαρκτές λέξεις.",
      answer: ans,
      choices: makeChoices(ans, SYLL_POOL_L2, 4),
      lockUntilSound: true,
      soundPlayed: false,
      masteryKey: it.word,
      masteryLevel: 2
    };
  }

  function qL3(){
    const it = pickAdaptive(3, L3, x => x.word);
    const syll = firstSyllable_L3(it.word);
    const ans = stripTonos(syll);

    return {
      teacher: it.word + " (αρχική συλλαβή: " + ans + ")",
      word: it.word,
      pic: it.pic,
      speakText: it.word,
      prompt: "Άκου και πάτα την αρχική συλλαβή (δύσκολο)",
      hint: "Level 3: δίψηφα/συμπλέγματα/μπ-ντ-γκ.",
      answer: ans,
      choices: makeChoices(ans, SYLL_POOL_L3, 4),
      lockUntilSound: true,
      soundPlayed: false,
      masteryKey: it.word,
      masteryLevel: 3
    };
  }

  function qL4(){
    const it = pickAdaptive(4, L2, x => x.word);
    const correct = it.word;
    const pool = shuffle(L2.map(x => x.word)).slice(0, 8);

    return {
      teacher: correct,
      word: correct,
      pic: it.pic,
      speakText: correct,
      prompt: "Άκου και διάλεξε τη σωστή λέξη (απλή)",
      hint: "Level 4: αναγνώριση λέξης.",
      answer: correct,
      choices: makeChoices(correct, pool, 4),
      lockUntilSound: true,
      soundPlayed: false,
      masteryKey: correct,
      masteryLevel: 4
    };
  }

  function qL5(){
    const it = pickAdaptive(5, L3, x => x.word);
    const correct = it.word;
    const pool = shuffle(L3.map(x => x.word)).slice(0, 10);

    return {
      teacher: correct,
      word: correct,
      pic: it.pic,
      speakText: correct,
      prompt: "Άκου και διάλεξε τη σωστή λέξη (δύσκολη)",
      hint: "Level 5: δύσκολες λέξεις.",
      answer: correct,
      choices: makeChoices(correct, pool, 4),
      lockUntilSound: true,
      soundPlayed: false,
      masteryKey: correct,
      masteryLevel: 5
    };
  }

  function nextQuestion(){
    const q =
      state.level === 1 ? qL1() :
      state.level === 2 ? qL2() :
      state.level === 3 ? qL3() :
      state.level === 4 ? qL4() :
      qL5();

    setQuestion(q);
  }

  // =========
  // Answer handling
  // =========
  function onAnswer(choice){
    const q = state.current;
    if(!q) return;

    if(choice === q.answer){
      state.coins += 10;
      state.streak += 1;
      state.correct += 1;
      state.correctSinceReward += 1;

      // mastery
      const v = incMastery(q.masteryLevel, q.masteryKey);

      // Level 1: γράμματα “κλειδώνουν” όταν φτάσουν need (1)
      if(state.level === 1 && v >= state.need[1]){
        state.masteredLetters.add(q.masteryKey);
      }

      // bonus όταν κλειδώνει κάτι (2 σωστά)
      const need = state.need[q.masteryLevel] || 2;
      if(v === need){
        state.coins += 25;
        feedbackEl.innerHTML = `<span class="ok">ΜΑΘΗΚΕ!</span> +25 bonus (+10)`;
      } else {
        feedbackEl.innerHTML = `<span class="ok">ΣΩΣΤΟ!</span> +10 coins`;
      }

      uiSync();

      if(maybeReward()) return; // περιμένουμε να κλείσει το popup
      setTimeout(nextQuestion, 420);
    } else {
      state.streak = 0;
      feedbackEl.innerHTML = `<span class="bad">Όχι ακόμα.</span> Ξαναδοκίμασε!`;
      uiSync();
    }
  }

  function tryNextLevel(){
    if(!canAdvance(state.level)) return;
    state.level = Math.min(5, state.level + 1);
    state.correct = 0;
    state.streak = 0;
    nextQuestion();
  }

  function resetAll(){
    state.level = 1;
    state.coins = 0;
    state.streak = 0;
    state.correct = 0;
    state.correctSinceReward = 0;
    state.masteredLetters = new Set();
    state.mastery = {1:new Map(),2:new Map(),3:new Map(),4:new Map(),5:new Map()};
    hideReward();
    nextQuestion();
  }

  // =========
  // Events
  // =========
  soundBtn.onclick = () => {
    const q = state.current;
    if(!q) return;
    q.soundPlayed = true;
    speak(q.speakText);
  };

  repeatBtn.onclick = () => nextQuestion();
  nextBtn.onclick = () => tryNextLevel();
  resetBtn.onclick = () => resetAll();
  showTeacher.onchange = () => uiSync();

  rewardOkBtn.onclick = () => {
    hideReward();
    nextQuestion();
  };

  // Start
  nextQuestion();
})();

      
