(function () {
  'use strict';

  const STEPS = [
    {
      id: 1, icon: '⚡', title: 'Speak before you perfect', mm: 'သဒ္ဒါကို မစောင့်ဘဲ စပြောပါ',
      pillar: 'Spontaneity over Grammar', pages: '7–8',
      why: 'Communication starts when your idea comes out. You can improve the grammar after you speak.',
      whyMm: 'မှားမှာစိုးလို့ ရပ်မနေပါနဲ့။ အဓိပ္ပာယ်ကို အရင်ပြောပြီးမှ ပြန်ပြင်ပါ။',
      move: 'Talk about yesterday for one minute without stopping.',
      takeaway: 'Progress first, then polish.', takeawayMm: 'အရင်ပြောပါ၊ နောက်မှ ပိုကောင်းအောင် ပြင်ပါ။'
    },
    {
      id: 2, icon: '🧩', title: 'Build with speaking patterns', mm: 'အသင့်သုံး ဝါကျပုံစံများ',
      pillar: 'Speaking Patterns', pages: '9–10, 28–38',
      why: 'A ready-made frame helps you express a new idea without building every word from zero.',
      whyMm: 'ဝါကျပုံစံကို အသင့်ယူပြီး မိမိလိုချင်သည့် စကားလုံးကိုသာ ပြောင်းသုံးပါ။',
      move: 'Choose a frame and make one true sentence about your life.',
      takeaway: 'Keep the frame; change the idea.', takeawayMm: 'ပုံစံကို မှတ်ပြီး အကြောင်းအရာကို ပြောင်းပါ။'
    },
    {
      id: 3, icon: '🔗', title: 'Learn words that belong together', mm: 'တွဲဖက်သုံး စကားစုများ',
      pillar: 'Collocations & Phrases', pages: '11–12, 39–54',
      why: 'Natural speakers remember useful combinations such as “make a decision,” not isolated words.',
      whyMm: '“make a decision” ကဲ့သို့ တွဲသုံးစကားများကို တစ်စုတည်း မှတ်ပါ။',
      move: 'Choose the verb that completes each common phrase.',
      takeaway: 'Save a useful phrase as one unit.', takeawayMm: 'အသုံးဝင်သည့် စကားစုကို တစ်ခုတည်းလို မှတ်ပါ။'
    },
    {
      id: 4, icon: '🍽️', title: 'Use words in the right place', mm: 'အခြေအနေနှင့် ကိုက်ညီအောင် သုံးပါ',
      pillar: 'Topic Vocab & Usage', pages: '13',
      why: 'A phrase becomes useful when you know when to say it. This round uses the restaurant phrases in the book.',
      whyMm: 'စကားစု၏ အဓိပ္ပာယ်သာမက မည်သည့်အချိန်တွင် သုံးရမည်ကို သိပါ။',
      move: 'Match a restaurant situation to the best English phrase.',
      takeaway: 'Context makes vocabulary usable.', takeawayMm: 'အခြေအနေကို သိမှ စကားလုံးကို လက်တွေ့သုံးနိုင်ပါသည်။'
    },
    {
      id: 5, icon: '🎭', title: 'Rehearse real situations', mm: 'လက်တွေ့အခြေအနေကို သရုပ်ဆောင်ပါ',
      pillar: 'Situational Practice', pages: '15–16',
      why: 'Role-play helps you retrieve English in moments you may really face.',
      whyMm: 'လမ်းမေးခြင်း၊ ဈေးဝယ်ခြင်းကဲ့သို့ အခြေအနေများကို ကြိုတင် ပြောကြည့်ပါ။',
      move: 'Answer one short real-life prompt before seeing a model line.',
      takeaway: 'Practice the moment before it happens.', takeawayMm: 'တကယ်ကြုံမည့် အခြေအနေကို ကြိုတင်လေ့ကျင့်ပါ။'
    },
    {
      id: 6, icon: '🌱', title: 'Make English a daily habit', mm: 'နေ့စဉ် အင်္ဂလိပ်နှင့် ထိတွေ့ပါ',
      pillar: 'Daily Exposure & Consistency', pages: '15–16',
      why: 'Short, repeatable contact with English is easier to sustain than a rare long session.',
      whyMm: 'တစ်ခါတစ်ရံ အကြာကြီးလုပ်ခြင်းထက် နေ့တိုင်း လုပ်နိုင်သည့် အလေ့အကျင့် ဖန်တီးပါ။',
      move: 'Pick a time and complete one small daily exposure action.',
      takeaway: 'Make the habit easy to repeat.', takeawayMm: 'နေ့တိုင်း ထပ်လုပ်နိုင်အောင် လွယ်လွယ်စပါ။'
    },
    {
      id: 7, icon: '🎧', title: 'Listen actively in three passes', mm: 'သုံးကြိမ် နားထောင်ပြီး အသုံးအနှုန်း ရယူပါ',
      pillar: 'Comprehensible Input & Active Listening', pages: '17–18',
      why: 'First catch the meaning. Then notice a phrase. Finally say it with the speaker.',
      whyMm: 'ပထမ အဓိပ္ပာယ်ကို နားလည်ပါ၊ ဒုတိယ စကားစုကို မှတ်ပါ၊ တတိယ လိုက်ပြောပါ။',
      move: 'Listen to a short dialogue, answer its gist, collect a phrase, and shadow it.',
      takeaway: 'Listening gives your speaking new material.', takeawayMm: 'နားထောင်ခြင်းက စကားပြောရန် အသုံးအနှုန်းအသစ် ပေးပါသည်။'
    },
    {
      id: 8, icon: '🗣️', title: 'Shadow in four passes', mm: 'အဆင့်လေးဆင့်ဖြင့် လိုက်ပြောပါ',
      pillar: 'Shadowing Technique', pages: '19–22',
      why: 'Follow the audio closely, about a beat behind it. Repeat with and without the text.',
      whyMm: 'အသံနောက်ကို အနည်းငယ်ကပ်၍ စာကြည့်ပြီး၊ ထို့နောက် စာမကြည့်ဘဲ လိုက်ပြောပါ။',
      move: 'Listen → Read along → Shadow with text → Shadow without text.',
      takeaway: 'Repeat the same short clip several times.', takeawayMm: 'အသံတိုတစ်ခုကို အကြိမ်များစွာ ပြန်လေ့ကျင့်ပါ။'
    },
    {
      id: 9, icon: '🎯', title: 'Keep the final sounds', mm: 'နောက်ဆုံးဗျည်းသံကို မချန်ပါနှင့်',
      pillar: 'L1 Interference & Corrections', pages: '14, 23–24',
      why: 'Final sounds and consonant clusters can change meaning. Build them slowly and listen back.',
      whyMm: 'စကားလုံးအဆုံးသံနှင့် ဆက်တိုက်ဗျည်းများကို ဖြည်းဖြည်းချင်း တည်ဆောက်ပါ။',
      move: 'Drill “want / help / test” and build “s → st → str → strong.”',
      takeaway: 'Check the ending; avoid adding an extra vowel.', takeawayMm: 'အဆုံးသံကို စစ်ပါ။ ဗျည်းကြားတွင် သရသံ မထည့်ပါနှင့်။'
    },
    {
      id: 10, icon: '📅', title: 'Follow a 30-day speaking plan', mm: 'ရက် ၃၀ စကားပြောအစီအစဉ်',
      pillar: '30-Day Practice Plan', pages: '25',
      why: 'The ebook divides each day into listening, shadowing, and recording with review.',
      whyMm: 'နေ့စဉ် နားထောင်၊ လိုက်ပြော၊ အသံမှတ်တမ်းတင်၍ ပြန်စစ်ပါ။',
      move: 'Start your calendar and mark the 10 + 10 + 10 minute routine.',
      takeaway: 'Consistency turns lessons into a speaking habit.', takeawayMm: 'ပုံမှန်လေ့ကျင့်ခြင်းက သင်ခန်းစာကို အလေ့အကျင့်ဖြစ်စေပါသည်။'
    }
  ];
  const PATTERNS = [
    { label: "I'm thinking of + verb-ing", example: "I'm thinking of taking a short break.", prefix: "I'm thinking of ", suffix: '.', options: ['taking a short break', 'learning English', 'starting a project'] },
    { label: "It's up to you to + verb", example: "It's up to you to decide.", prefix: "It's up to you to ", suffix: '.', options: ['decide', 'choose the place', 'pick a time'] },
    { label: 'Have you ever considered + verb-ing?', example: 'Have you ever considered changing your job?', prefix: 'Have you ever considered ', suffix: '?', options: ['trying a new hobby', 'taking a short course', 'visiting Bagan'] }
  ];
  const COLLOCATION_QUIZ = [
    { question: 'You need to ___ a decision.', choices: ['make', 'do', 'take'], correct: 0, explanation: 'Say “make a decision.”' },
    { question: "Let's ___ a short break.", choices: ['do', 'make', 'take'], correct: 2, explanation: 'Say “take a break.”' },
    { question: 'Just ___ your best.', choices: ['do', 'take', 'make'], correct: 0, explanation: 'Say “do your best.”' }
  ];
  const RESTAURANT_QUIZ = [
    { question: 'You arrive with one friend and need a table.', choices: ['Table for two, please.', 'Can I have the bill, please?', "I'll have the same."], correct: 0, explanation: 'Ask for a table for two.' },
    { question: 'You finished eating and want to pay.', choices: ['Is this seat taken?', "I'll have the same.", 'Can I have the bill, please?'], correct: 2, explanation: 'Ask for the bill.' },
    { question: 'Your friend orders food and you want that dish too.', choices: ["I'll have the same.", 'Table for two, please.', 'Is this seat taken?'], correct: 0, explanation: 'Say “I’ll have the same.”' }
  ];
  const ROLEPLAYS = [
    { prompt: 'You need to find the nearest bus stop. Ask a stranger.', model: 'Excuse me, could you tell me where the nearest bus stop is?' },
    { prompt: 'You are buying something at a market. Ask politely for a lower price.', model: 'Could you give me a better price, please?' },
    { prompt: 'You are running late. Ask a friend to meet a little later.', model: 'Could we meet a little later? I’m running late.' }
  ];
  const DIALOGUE = "Could we meet a little later? I'm running late. Sure, that's fine. Just let me know when you arrive.";
  const SHADOW_SENTENCE = "I'm thinking of taking a short break.";
  const storeKey = 'mingalar-ten-steps-v1';
  const saved = load();
  const state = {
    screen: Number(saved.screen) || 0,
    completed: Array.isArray(saved.completed) ? saved.completed : [],
    notes: saved.notes || {},
    sprintText: saved.sprintText || '',
    sprintSpoke: Boolean(saved.sprintSpoke),
    patternIndex: Number(saved.patternIndex) || 0,
    patternSlot: saved.patternSlot || '',
    quiz3: saved.quiz3 || {},
    quiz4: saved.quiz4 || {},
    quizResult: null,
    roleplayIndex: Number(saved.roleplayIndex) || 0,
    roleplayText: saved.roleplayText || '',
    modelRevealed: false,
    habitTime: saved.habitTime || '',
    habitChecks: saved.habitChecks || {},
    listenGist: saved.listenGist == null ? null : Number(saved.listenGist),
    listenPhrase: saved.listenPhrase || '',
    listenTextVisible: false,
    listenShadowDone: Boolean(saved.listenShadowDone),
    shadowPhase: Number(saved.shadowPhase) || 0,
    drillChecks: saved.drillChecks || {},
    dailyStart: saved.dailyStart || '',
    daily: saved.daily || {},
    timerSeconds: 60,
    timerRunning: false,
    timerDone: false,
    timerId: null,
    recorder: null,
    mediaStream: null,
    audioChunks: [],
    recordingUrl: '',
    resetArmed: false,
    toastId: null
  };

  function load() { try { return JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (_) { return {}; } }
  function save() {
    try {
      const keys = ['screen','completed','notes','sprintText','sprintSpoke','patternIndex','patternSlot','quiz3','quiz4','roleplayIndex','roleplayText','habitTime','habitChecks','listenGist','listenPhrase','listenShadowDone','shadowPhase','drillChecks','dailyStart','daily'];
      const data = {};
      keys.forEach(key => { data[key] = state[key]; });
      localStorage.setItem(storeKey, JSON.stringify(data));
    } catch (_) {}
  }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function toast(message) {
    const el = document.getElementById('courseToast');
    el.textContent = message; el.classList.add('show');
    clearTimeout(state.toastId);
    state.toastId = setTimeout(() => el.classList.remove('show'), 3200);
  }
  function current() { return STEPS[state.screen - 1]; }
  function progressCount() { return state.completed.length; }
  function nextUnfinished() { return STEPS.find(step => !state.completed.includes(step.id))?.id || 10; }
  function localDate() {
    const date = new Date();
    return [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
  }
  function dayNumber() {
    if (!state.dailyStart) return 0;
    const start = new Date(state.dailyStart + 'T12:00:00');
    const today = new Date(localDate() + 'T12:00:00');
    return Math.floor((today - start) / 86400000) + 1;
  }
  function doneDays() {
    return Object.values(state.daily).filter(day => day.listen && day.shadow && day.review).length;
  }
  function speak(value) {
    if (!('speechSynthesis' in window)) { toast('Speech playback is unavailable in this browser.'); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = 'en-US'; utterance.rate = 0.88;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(voice => voice.lang.startsWith('en')) || null;
    window.speechSynthesis.speak(utterance);
  }
  function renderRail() {
    document.getElementById('stepRail').innerHTML = STEPS.map(step =>
      `<button type="button" class="rail-step ${state.screen === step.id ? 'active' : ''} ${state.completed.includes(step.id) ? 'done' : ''}" data-course-step="${step.id}"><span class="rail-dot">${state.completed.includes(step.id) ? '✓' : String(step.id).padStart(2,'0')}</span><span class="rail-step-text">${esc(step.pillar)}<small lang="my">${esc(step.mm)}</small></span></button>`
    ).join('');
    document.querySelector('.overview-link').classList.toggle('active', state.screen === 0);
    document.getElementById('topProgress').textContent = progressCount() + ' / 10 steps';
  }
  function renderCoach() {
    const step = current();
    const notes = Object.entries(state.notes).filter(([, value]) => value).slice(-4).reverse();
    document.getElementById('coachPanel').innerHTML =
      `<div class="right-card"><h3>Your journey</h3><div class="side-progress"><div class="progress-ring" style="--progress:${progressCount()*10}%"><span>${progressCount()}/10</span></div><p>One short task at a time.<br><span lang="my">နေ့စဉ် နည်းနည်းစီ လေ့ကျင့်ပါ။</span></p></div><div class="small-divider"></div><p>${doneDays()} of 30 daily practice days logged.</p><button class="tiny-button" type="button" data-course-action="reset-progress" style="margin-top:12px">${state.resetArmed ? 'Confirm: clear my course progress' : 'Start this course over'}</button></div>` +
      `<div class="right-card"><span class="mini-title">TODAY'S REMINDER</span><h3>Speaking is a skill you do.</h3><p>Read the idea briefly, try the activity, then use one phrase in real life.</p></div>` +
      `<div class="right-card"><h3>Your phrase notebook</h3>${notes.length ? notes.map(([key,value]) => '<div class="phrase-note"><strong>' + esc(key) + '</strong><br>' + esc(value) + '</div>').join('') : '<p>Your own useful phrases will appear here as you complete activities.</p>'}</div>` +
      (step ? `<div class="right-card"><span class="mini-title">FROM THE EBOOK</span><h3>${esc(step.pillar)}</h3><p>Saya Nay · PDF pages ${esc(step.pages)}. This activity is a short adaptation of the chapter.</p></div>` : '');
  }
  function renderOverview() {
    return `<div class="page-wrap"><section class="roadmap-hero"><img class="roadmap-bg" src="assets/tutor.png" alt="Mingalar English Tutor" width="1586" height="992" fetchpriority="high" decoding="async"><div><span class="eyebrow">SAYA NAY'S IDEAS · MADE INTERACTIVE</span><h1>10 steps to a stronger speaking voice.</h1><p lang="my">စာအုပ်ကို အကြာကြီးဖတ်မနေဘဲ အချက်တစ်ချက်ကို ချက်ချင်း လက်တွေ့လုပ်ကြည့်ပါ။</p><div class="hero-actions"><button class="primary" type="button" data-course-action="quick">▶ Start a 2-minute mission</button><a class="ghost" href="index.html">Try 150 sentences</a></div></div></section><div class="intro-strip"><div class="intro-mini"><strong>01 · Understand</strong><span>One idea in 20 seconds</span></div><div class="intro-mini"><strong>02 · Do it</strong><span>A tiny speaking task</span></div><div class="intro-mini"><strong>03 · Use it</strong><span>Save a real phrase</span></div></div><div class="section-head"><h2>The 10-step path</h2><small>${progressCount()} complete · ${10-progressCount()} to go</small></div><div class="step-grid">${STEPS.map(step => `<button class="step-card ${state.completed.includes(step.id) ? 'done' : ''}" type="button" data-course-step="${step.id}"><span class="step-number">${state.completed.includes(step.id) ? '✓' : step.icon}</span><span><strong>${step.id}. ${esc(step.title)}</strong><small lang="my">${esc(step.mm)}</small><em>${esc(step.pillar)} · PDF pp. ${esc(step.pages)}</em></span></button>`).join('')}</div><p class="source-line">Adapted and condensed from the supplied Saya Nay ebook. The exercises and short dialogue are interactive teaching additions; the source PDF remains the authority for the full explanation.</p></div>`;
  }
  function renderStep() {
    const step = current();
    return `<div class="page-wrap"><div class="lesson-breadcrumb"><button type="button" data-course-action="overview">10-step path</button> / Step ${step.id} of 10 · PDF pages ${esc(step.pages)}</div><div class="lesson-heading"><span class="step-number">${step.icon}</span><div><span class="eyebrow">${esc(step.pillar)} ${state.completed.includes(step.id) ? '· COMPLETED' : ''}</span><h1>${esc(step.title)}</h1><p lang="my">${esc(step.mm)}</p></div></div><section class="lesson-banner"><strong>THE BIG IDEA · အဓိကအချက်</strong><p>${esc(step.why)}</p><small lang="my">${esc(step.whyMm)}</small></section><section class="task-card"><span class="eyebrow">TRY IT NOW · လက်တွေ့လုပ်ကြည့်ပါ</span><h2>${esc(step.move)}</h2>${activity(step.id)}</section><section class="takeaway-card"><strong>Keep this with you</strong><p>${esc(step.takeaway)}</p><small lang="my">${esc(step.takeawayMm)}</small></section><div class="lesson-nav"><button class="outline" type="button" data-course-action="previous">← ${step.id === 1 ? 'Overview' : 'Previous step'}</button><button class="primary" type="button" data-course-action="next">${step.id === 10 ? 'Course overview' : 'Next step →'}</button></div><p class="source-line">Adapted from Saya Nay, <em>How to Master Spoken English</em>, PDF pages ${esc(step.pages)}. Practice feedback here is self-check or text-based; it does not grade pronunciation.</p></div>`;
  }
  function render() {
    renderRail(); renderCoach();
    document.getElementById('courseMain').innerHTML = state.screen === 0 ? renderOverview() : renderStep();
  }
  function activity(id) {
    if (id === 1) return sprintActivity();
    if (id === 2) return patternActivity();
    if (id === 3) return quizActivity(3);
    if (id === 4) return quizActivity(4);
    if (id === 5) return roleplayActivity();
    if (id === 6) return habitActivity();
    if (id === 7) return listeningActivity();
    if (id === 8) return shadowActivity();
    if (id === 9) return drillActivity();
    return planActivity();
  }

  function voiceControls() {
    return `<div class="voice-controls"><button class="outline" type="button" data-course-action="${state.recorder ? 'record-stop' : 'record-start'}">${state.recorder ? '■ Stop recording' : '🎙 Record my voice'}</button>${state.recordingUrl ? '<button class="outline" type="button" data-course-action="record-play">▶ Play my recording</button>' : ''}</div><div class="record-status ${state.recorder ? 'recording' : ''}">${state.recorder ? 'Recording… speak naturally.' : state.recordingUrl ? 'Recording ready to replay. It stays in this tab.' : 'Microphone optional. You can use the text box or self-check instead.'}</div>`;
  }
  function sprintActivity() {
    return `<p>Prompt: <strong>What did you do yesterday?</strong> Start the timer and speak without stopping to check your grammar.</p><div class="input-row"><div id="timerReadout" class="timer ${state.timerRunning ? 'running' : ''}">${String(Math.floor(state.timerSeconds/60)).padStart(2,'0')}:${String(state.timerSeconds%60).padStart(2,'0')}</div><div><div class="activity-actions"><button class="primary" type="button" data-course-action="timer-start">${state.timerRunning ? 'Pause timer' : state.timerSeconds === 60 ? 'Start 60 seconds' : 'Resume timer'}</button><button class="outline" type="button" data-course-action="timer-reset">Reset</button></div><div class="timer-note">You can speak with the timer, record your voice, or write a short reflection.</div></div></div>${voiceControls()}<label class="task-label" for="sprintText">One idea you said (optional if you recorded)</label><textarea id="sprintText" class="text-field" data-course-field="sprintText" placeholder="Yesterday I...">${esc(state.sprintText)}</textarea><label class="check-row"><input type="checkbox" data-course-toggle="sprintSpoke" ${state.sprintSpoke ? 'checked' : ''}> I spoke aloud and kept going when I made a mistake.</label><div class="activity-actions"><button class="primary complete-button" type="button" data-course-action="finish-sprint">✓ Save this speaking sprint</button></div>`;
  }
  function builtSentence() {
    const pattern = PATTERNS[state.patternIndex];
    return pattern.prefix + (state.patternSlot.trim() || '…') + pattern.suffix;
  }
  function patternActivity() {
    const pattern = PATTERNS[state.patternIndex];
    return `<p>Three useful frames from the ebook. Choose one, put in your own idea, then say it aloud.</p><div class="choice-list">${PATTERNS.map((item,index) => `<button class="choice ${state.patternIndex === index ? 'selected' : ''}" type="button" data-pattern-index="${index}">${esc(item.label)}</button>`).join('')}</div><div class="speech-line">${esc(pattern.example)}<small>Model sentence from the ebook</small></div><label class="task-label" for="patternSlot">Fill the changing part</label><input id="patternSlot" class="text-field" type="text" data-course-field="patternSlot" value="${esc(state.patternSlot)}" placeholder="Try: ${esc(pattern.options[0])}"><div class="activity-actions">${pattern.options.map(option => `<button class="tiny-button" type="button" data-pattern-suggestion="${esc(option)}">${esc(option)}</button>`).join('')}</div><div id="patternPreview" class="speech-line">${esc(builtSentence())}</div><div class="activity-actions"><button class="outline" type="button" data-course-action="speak-pattern">▶ Hear my sentence</button><button class="primary complete-button" type="button" data-course-action="save-pattern">✓ Save to my phrase notebook</button></div>`;
  }
  function quizActivity(id) {
    const questions = id === 3 ? COLLOCATION_QUIZ : RESTAURANT_QUIZ;
    const answers = id === 3 ? state.quiz3 : state.quiz4;
    const result = state.quizResult?.step === id ? state.quizResult : null;
    return `<p>Choose one answer for each situation. You can try again if you miss one.</p>${questions.map((question,qIndex) => `<div class="question"><strong>${qIndex+1}. ${esc(question.question)}</strong><div class="choice-list">${question.choices.map((choice,cIndex) => `<button type="button" class="choice ${Number(answers[qIndex]) === cIndex ? 'selected' : ''} ${result && cIndex === question.correct ? 'correct' : ''} ${result && Number(answers[qIndex]) === cIndex && cIndex !== question.correct ? 'wrong' : ''}" data-course-question="${qIndex}" data-course-value="${cIndex}">${esc(choice)}</button>`).join('')}</div>${result ? '<small>' + esc(question.explanation) + '</small>' : ''}</div>`).join('')}<div class="activity-actions"><button class="primary" type="button" data-course-action="check-quiz">Check my answers</button></div>${result ? `<div class="result ${result.score < 2 ? 'warn' : ''}"><strong>${result.score} / 3 correct</strong>${result.score >= 2 ? 'Well done. Say the correct phrases out loud once.' : 'Review the highlighted answers and try again.'}</div>` : ''}`;
  }
  function roleplayActivity() {
    const selected = ROLEPLAYS[state.roleplayIndex];
    return `<p>Choose a situation. Say or write your response first, then compare with a model line.</p><label class="task-label" for="roleplaySelect">Choose your situation</label><select id="roleplaySelect" class="select-field">${ROLEPLAYS.map((item,index) => `<option value="${index}" ${state.roleplayIndex === index ? 'selected' : ''}>${esc(item.prompt)}</option>`).join('')}</select><label class="task-label" for="roleplayText">Your English reply</label><textarea id="roleplayText" class="text-field" data-course-field="roleplayText" placeholder="What would you say?">${esc(state.roleplayText)}</textarea>${voiceControls()}<div class="activity-actions"><button class="outline" type="button" data-course-action="show-model">Show a model answer</button><button class="primary complete-button" type="button" data-course-action="finish-roleplay">✓ Save my role-play</button></div>${state.modelRevealed ? `<div class="result"><strong>One possible response</strong>${esc(selected.model)}<br><button class="tiny-button" type="button" data-course-action="speak-roleplay">▶ Hear model</button></div>` : ''}`;
  }
  function habitActivity() {
    const habits = [
      {key:'listen',en:'Listen to a short English clip',mm:'အင်္ဂလိပ်အသံတိုတစ်ခု နားထောင်ပါ'},
      {key:'shadow',en:'Shadow one useful line',mm:'အသုံးဝင်သော စာကြောင်းတစ်ကြောင်း လိုက်ပြောပါ'},
      {key:'think',en:'Think through one daily task in English',mm:'နေ့စဉ်လုပ်စရာတစ်ခုကို အင်္ဂလိပ်လို တွေးပါ'}
    ];
    return `<p>A tiny habit is easier to repeat. Pick a time and do at least one action today.</p><label class="task-label" for="habitTime">When will you practice?</label><input id="habitTime" class="select-field" type="time" data-course-field="habitTime" value="${esc(state.habitTime)}"><div style="margin-top:13px">${habits.map(item => `<label class="check-row"><input type="checkbox" data-course-toggle="habit:${item.key}" ${state.habitChecks[item.key] ? 'checked' : ''}><span>${item.en}<small lang="my" style="display:block;color:#7189a4">${item.mm}</small></span></label>`).join('')}</div><div class="activity-actions"><button class="primary complete-button" type="button" data-course-action="save-habit">✓ Save my daily habit</button></div>`;
  }
  function listeningActivity() {
    return `<p>First listen for the overall meaning. Then reveal the text and collect one useful phrase. Finish by saying it with the speaker.</p><div class="activity-actions"><button class="primary" type="button" data-course-action="play-dialogue">▶ Play short dialogue</button><button class="outline" type="button" data-course-action="reveal-dialogue">${state.listenTextVisible ? 'Hide transcript' : 'Show transcript'}</button></div>${state.listenTextVisible ? `<div class="speech-line">A: Could we meet a little later? I’m running late.<br>B: Sure, that’s fine. Just let me know when you arrive.</div>` : '<div class="speech-line">Transcript hidden — listen for the idea first.</div>'}<div class="question"><strong>1. Why does speaker A want to meet later?</strong><div class="choice-list"><button class="choice ${state.listenGist === 0 ? 'selected correct' : ''}" type="button" data-gist="0">They are running late.</button><button class="choice ${state.listenGist === 1 ? 'selected wrong' : ''}" type="button" data-gist="1">They forgot the address.</button><button class="choice ${state.listenGist === 2 ? 'selected wrong' : ''}" type="button" data-gist="2">They changed their mind.</button></div></div><label class="task-label" for="listenPhrase">2. Save one phrase you could use</label><input id="listenPhrase" class="text-field" type="text" data-course-field="listenPhrase" value="${esc(state.listenPhrase)}" placeholder="Example: I'm running late."><label class="check-row"><input type="checkbox" data-course-toggle="listenShadowDone" ${state.listenShadowDone ? 'checked' : ''}> 3. I replayed the dialogue and shadowed one line aloud.</label><div class="activity-actions"><button class="primary complete-button" type="button" data-course-action="finish-listening">✓ Save my listening phrase</button></div>`;
  }
  function shadowActivity() {
    const phases = ['Listen without text','Read along','Shadow with text','Shadow without text'];
    const showText = state.shadowPhase === 1 || state.shadowPhase === 2 || state.shadowPhase === 4;
    return `<p>Use one short sentence from the ebook. Stay about one beat behind the audio, and repeat the clip.</p><div class="phase-list">${phases.map((phase,index) => `<div class="phase ${index < state.shadowPhase ? 'done' : index === state.shadowPhase ? 'active' : ''}"><span>${index < state.shadowPhase ? '✓' : index+1}</span><strong>${esc(phase)}</strong></div>`).join('')}</div><div class="speech-line">${showText ? esc(SHADOW_SENTENCE) : 'Transcript hidden — use your ears.'}<small>${state.shadowPhase === 4 ? 'Four passes complete.' : 'Current pass: ' + phases[state.shadowPhase]}</small></div><div class="activity-actions"><button class="outline" type="button" data-course-action="play-shadow">▶ Play sentence</button>${state.shadowPhase < 4 ? `<button class="primary" type="button" data-course-action="finish-shadow-pass">I finished pass ${state.shadowPhase+1} →</button>` : '<button class="primary complete-button" type="button" data-course-action="restart-shadow">↺ Repeat four passes</button>'}</div><p class="source-line">The ebook recommends moving from listening to reading, shadowing with text, then shadowing without text. This small exercise uses the same sequence.</p>`;
  }
  function drillActivity() {
    return `<p>Listen to the ending of each word. Then build the consonant cluster slowly without inserting an extra vowel.</p><div class="speech-line">want &nbsp;·&nbsp; help &nbsp;·&nbsp; test &nbsp;·&nbsp; books &nbsp;·&nbsp; worked</div><div class="activity-actions"><button class="outline" type="button" data-course-action="play-endings">▶ Hear ending words</button><button class="outline" type="button" data-course-action="play-strong">▶ Hear “strong”</button></div><div class="cluster-track"><span>s</span><span>st</span><span>str</span><span>stro</span><span>strong</span></div>${voiceControls()}<label class="check-row"><input type="checkbox" data-course-toggle="drill:ending" ${state.drillChecks.ending ? 'checked' : ''}> I listened back for the final consonant sound.</label><label class="check-row"><input type="checkbox" data-course-toggle="drill:cluster" ${state.drillChecks.cluster ? 'checked' : ''}> I said “strong” without adding an extra vowel between consonants.</label><div class="activity-actions"><button class="primary complete-button" type="button" data-course-action="finish-drill">✓ Save this drill</button></div><p class="source-line">This is a self-check. Browser transcripts cannot reliably grade final sounds or accent.</p>`;
  }
  function planActivity() {
    const today = localDate();
    const currentDay = dayNumber();
    const todayLog = state.daily[today] || {};
    return `<p>The ebook's plan is <strong>10 minutes listening + 10 minutes shadowing + 10 minutes recording and review</strong> each day. Start with today and track your 30-day run.</p>${!state.dailyStart ? '<button class="primary" type="button" data-course-action="start-plan">Start my 30-day plan today</button>' : `<div class="result"><strong>Day ${Math.min(currentDay,30)} of 30 · ${doneDays()} full days logged</strong>Started ${esc(state.dailyStart)}. Check a task only after you actually do its ten minutes.</div><div class="day-grid">${Array.from({length:30},(_,index) => { const date = new Date(state.dailyStart + 'T12:00:00'); date.setDate(date.getDate()+index); const key = [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-'); const entry = state.daily[key] || {}; return `<div class="day-dot ${entry.listen && entry.shadow && entry.review ? 'done' : index+1 === currentDay ? 'today' : index+1 > currentDay ? 'future' : ''}" title="${key}">${index+1}</div>`; }).join('')}</div>${currentDay > 30 ? '<div class="result"><strong>Your first 30 days are complete.</strong>Keep the habit going with the 150-sentence practice course.</div>' : `<div class="question"><strong>Today · Day ${currentDay}</strong><label class="check-row"><input type="checkbox" data-course-toggle="daily:listen" ${todayLog.listen ? 'checked' : ''}> Listening · 10 minutes</label><label class="check-row"><input type="checkbox" data-course-toggle="daily:shadow" ${todayLog.shadow ? 'checked' : ''}> Shadowing · 10 minutes</label><label class="check-row"><input type="checkbox" data-course-toggle="daily:review" ${todayLog.review ? 'checked' : ''}> Record and review · 10 minutes</label></div>${voiceControls()}<div class="activity-actions"><button class="primary complete-button" type="button" data-course-action="finish-day">✓ Log today's 30 minutes</button><a class="outline" href="index.html">Practice a sentence now →</a></div>`}</div>`}`;
  }

  function navigate(screen) {
    if (state.timerId) { clearInterval(state.timerId); state.timerId = null; state.timerRunning = false; }
    state.screen = Math.min(10, Math.max(0, Number(screen) || 0));
    state.quizResult = null;
    save(); render();
    document.getElementById('courseMain').scrollTop = 0;
  }
  function markComplete(id, message) {
    if (!state.completed.includes(id)) state.completed.push(id);
    save(); render(); toast(message || 'Step complete. Nice work!');
  }
  function tickTimer() {
    state.timerSeconds--;
    const readout = document.getElementById('timerReadout');
    if (readout) readout.textContent = String(Math.floor(state.timerSeconds/60)).padStart(2,'0') + ':' + String(state.timerSeconds%60).padStart(2,'0');
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerId); state.timerId = null; state.timerRunning = false; state.timerDone = true;
      render(); toast('One minute done. Your idea matters more than perfection.');
    }
  }
  function toggleTimer() {
    if (state.timerRunning) { clearInterval(state.timerId); state.timerId = null; state.timerRunning = false; render(); return; }
    if (state.timerSeconds <= 0) state.timerSeconds = 60;
    state.timerRunning = true; state.timerId = setInterval(tickTimer,1000); render();
  }
  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast('Recording is unavailable here. Use the text or self-check option.'); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      const recorder = new MediaRecorder(stream);
      state.mediaStream = stream; state.recorder = recorder; state.audioChunks = [];
      recorder.ondataavailable = event => { if (event.data.size) state.audioChunks.push(event.data); };
      recorder.onstop = () => {
        if (state.recordingUrl) URL.revokeObjectURL(state.recordingUrl);
        state.recordingUrl = URL.createObjectURL(new Blob(state.audioChunks,{type:recorder.mimeType || 'audio/webm'}));
        stream.getTracks().forEach(track => track.stop());
        state.recorder = null; state.mediaStream = null;
        render(); toast('Recording ready. Play it back and listen.');
      };
      recorder.start(); render();
    } catch (_) { toast('Microphone access was blocked. You can type or self-check instead.'); }
  }
  function stopRecording() { if (state.recorder && state.recorder.state !== 'inactive') state.recorder.stop(); }
  function playRecording() {
    if (!state.recordingUrl) return;
    new Audio(state.recordingUrl).play().catch(() => toast('Could not play the recording.'));
  }
  function checkQuiz() {
    const id = state.screen;
    const answers = id === 3 ? state.quiz3 : state.quiz4;
    const questions = id === 3 ? COLLOCATION_QUIZ : RESTAURANT_QUIZ;
    if (Object.keys(answers).length < 3) { toast('Choose an answer for all three questions.'); return; }
    const score = questions.reduce((total,question,index) => total + (Number(answers[index]) === question.correct ? 1 : 0),0);
    state.quizResult = {step:id,score};
    if (score >= 2) markComplete(id, score + '/3 correct. Step complete!');
    else { render(); toast('Review the highlighted answers and try again.'); }
  }
  function savePattern() {
    const slot = state.patternSlot.trim();
    if (!slot) { toast('Add your own idea to the pattern first.'); return; }
    if (state.patternIndex !== 1 && !/ing\b/i.test(slot)) { toast('This pattern needs a verb ending in -ing. Try “taking a break.”'); return; }
    state.notes['Step 2 · My pattern'] = builtSentence();
    markComplete(2,'Your sentence was saved to your phrase notebook.');
  }
  function finishSprint() {
    if (!state.sprintSpoke || !(state.timerDone || state.sprintText.trim().length >= 12 || state.recordingUrl)) {
      toast('Speak aloud, then add one idea, record it, or finish the timer before saving.'); return;
    }
    if (state.sprintText.trim()) state.notes['Step 1 · My idea'] = state.sprintText.trim();
    markComplete(1,'You started speaking before perfecting. Well done.');
  }
  function finishRoleplay() {
    if (state.roleplayText.trim().length < 10) { toast('Write a short English reply first.'); return; }
    if (!state.modelRevealed) { toast('Compare your reply with the model answer first.'); return; }
    state.notes['Step 5 · My role-play'] = state.roleplayText.trim();
    markComplete(5,'Your role-play is saved.');
  }
  function saveHabit() {
    if (!state.habitTime) { toast('Choose a practice time.'); return; }
    const chosen = Object.keys(state.habitChecks).filter(key => state.habitChecks[key]);
    if (!chosen.length) { toast('Do at least one small English activity today.'); return; }
    state.notes['Step 6 · Daily habit'] = state.habitTime + ' · ' + chosen.join(', ');
    markComplete(6,'Your repeatable daily habit is saved.');
  }
  function finishListening() {
    if (state.listenGist !== 0) { toast('Listen again: why did speaker A ask to meet later?'); return; }
    if (state.listenPhrase.trim().length < 4) { toast('Save one phrase from the dialogue.'); return; }
    if (!state.listenShadowDone) { toast('Replay and shadow one line before saving.'); return; }
    state.notes['Step 7 · Listening phrase'] = state.listenPhrase.trim();
    markComplete(7,'You listened, collected a phrase, and shadowed it.');
  }
  function finishDrill() {
    if (!state.drillChecks.ending || !state.drillChecks.cluster) { toast('Try both the ending and cluster checks first.'); return; }
    markComplete(9,'Pronunciation drill saved. Keep listening to your own voice.');
  }
  function finishDay() {
    const log = state.daily[localDate()] || {};
    if (!log.listen || !log.shadow || !log.review) { toast('Check each ten-minute task after doing it.'); return; }
    markComplete(10,'Today’s 30 minutes are logged. Come back tomorrow.');
  }

  document.addEventListener('click', event => {
    const stepButton = event.target.closest('[data-course-step]');
    if (stepButton) { navigate(stepButton.dataset.courseStep); return; }
    const patternButton = event.target.closest('[data-pattern-index]');
    if (patternButton) { state.patternIndex = Number(patternButton.dataset.patternIndex); state.patternSlot = ''; save(); render(); return; }
    const suggestion = event.target.closest('[data-pattern-suggestion]');
    if (suggestion) { state.patternSlot = suggestion.dataset.patternSuggestion; save(); render(); return; }
    const questionButton = event.target.closest('[data-course-question]');
    if (questionButton) {
      const answers = state.screen === 3 ? state.quiz3 : state.quiz4;
      answers[questionButton.dataset.courseQuestion] = Number(questionButton.dataset.courseValue);
      state.quizResult = null; save(); render(); return;
    }
    const gistButton = event.target.closest('[data-gist]');
    if (gistButton) { state.listenGist = Number(gistButton.dataset.gist); save(); render(); return; }
    const actionButton = event.target.closest('[data-course-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.courseAction;
    if (action === 'overview') navigate(0);
    else if (action === 'reset-progress') {
      if (state.resetArmed) { localStorage.removeItem(storeKey); window.location.replace('mastery.html'); }
      else { state.resetArmed = true; renderCoach(); toast('Click again to clear only this 10-step course progress.'); }
    }
    else if (action === 'quick') navigate(nextUnfinished());
    else if (action === 'previous') navigate(state.screen - 1);
    else if (action === 'next') navigate(state.screen === 10 ? 0 : state.screen + 1);
    else if (action === 'timer-start') toggleTimer();
    else if (action === 'timer-reset') { clearInterval(state.timerId); state.timerId = null; state.timerSeconds = 60; state.timerRunning = false; state.timerDone = false; render(); }
    else if (action === 'record-start') startRecording();
    else if (action === 'record-stop') stopRecording();
    else if (action === 'record-play') playRecording();
    else if (action === 'finish-sprint') finishSprint();
    else if (action === 'speak-pattern') speak(builtSentence());
    else if (action === 'save-pattern') savePattern();
    else if (action === 'check-quiz') checkQuiz();
    else if (action === 'show-model') {
      if (state.roleplayText.trim().length < 5) { toast('Try your own reply before revealing the model.'); return; }
      state.modelRevealed = true; render();
    }
    else if (action === 'speak-roleplay') speak(ROLEPLAYS[state.roleplayIndex].model);
    else if (action === 'finish-roleplay') finishRoleplay();
    else if (action === 'save-habit') saveHabit();
    else if (action === 'play-dialogue') speak(DIALOGUE);
    else if (action === 'reveal-dialogue') { state.listenTextVisible = !state.listenTextVisible; render(); }
    else if (action === 'finish-listening') finishListening();
    else if (action === 'play-shadow') speak(SHADOW_SENTENCE);
    else if (action === 'finish-shadow-pass') {
      state.shadowPhase = Math.min(4,state.shadowPhase+1);
      if (state.shadowPhase === 4) markComplete(8,'Four shadowing passes complete.');
      else { save(); render(); }
    }
    else if (action === 'restart-shadow') { state.shadowPhase = 0; save(); render(); }
    else if (action === 'play-endings') speak('want. help. test. books. worked.');
    else if (action === 'play-strong') speak('strong. strong. strong.');
    else if (action === 'finish-drill') finishDrill();
    else if (action === 'start-plan') { state.dailyStart = localDate(); save(); render(); toast('Your 30-day plan starts today.'); }
    else if (action === 'finish-day') finishDay();
  });
  document.addEventListener('input', event => {
    const field = event.target.dataset.courseField;
    if (!field) return;
    state[field] = event.target.value;
    save();
    if (field === 'patternSlot') {
      const preview = document.getElementById('patternPreview');
      if (preview) preview.textContent = builtSentence();
    }
  });
  document.addEventListener('change', event => {
    if (event.target.id === 'roleplaySelect') {
      state.roleplayIndex = Number(event.target.value);
      state.roleplayText = '';
      state.modelRevealed = false;
      save(); render(); return;
    }
    const toggle = event.target.dataset.courseToggle;
    if (!toggle) return;
    if (toggle.startsWith('habit:')) state.habitChecks[toggle.split(':')[1]] = event.target.checked;
    else if (toggle.startsWith('drill:')) state.drillChecks[toggle.split(':')[1]] = event.target.checked;
    else if (toggle.startsWith('daily:')) {
      const today = localDate();
      state.daily[today] ||= {};
      state.daily[today][toggle.split(':')[1]] = event.target.checked;
    } else state[toggle] = event.target.checked;
    save();
  });
  render();
})();
