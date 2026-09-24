(function () {
  'use strict';

  const LESSONS = window.MINGALAR_LESSONS || [];
  const STEPS = [
    { en: 'Hear', mm: 'နားထောင်', icon: 'headphones', color: 'hear' },
    { en: 'Shadow', mm: 'လိုက်ပြော', icon: 'mic', color: 'shadow' },
    { en: 'Answer', mm: 'ဖြေဆို', icon: 'chat', color: 'answer' },
    { en: 'Think', mm: 'တွေးကြည့်', icon: 'lightbulb', color: 'think' },
    { en: 'Retry', mm: 'ပြန်ကြိုးစား', icon: 'refresh', color: 'retry' },
    { en: 'Improve', mm: 'ပိုတိုးတက်အောင်လုပ်', icon: 'trend', color: 'improve' },
    { en: 'Use', mm: 'လက်တွေ့အသုံးချ', icon: 'target', color: 'use' }
  ];
  const NAV = [
    { id: 'home', en: 'Home', mm: 'ပင်မစာမျက်နှာ', icon: 'home' },
    { id: 'mastery', en: '10 Essential Steps', mm: 'အရေးကြီးသော အဆင့် ၁၀ ဆင့်', icon: 'spark' },
    { id: 'speaking', en: 'Speaking Practice', mm: 'စကားပြောလေ့ကျင့်', icon: 'mic' },
    { id: 'listening', en: 'Listening Practice', mm: 'နားထောင်လေ့ကျင့်', icon: 'headphones' },
    { id: 'reading', en: 'Reading Practice', mm: 'ဖတ်ရှုလေ့ကျင့်', icon: 'book' },
    { id: 'writing', en: 'Writing Practice', mm: 'ရေးသားလေ့ကျင့်', icon: 'edit' },
    { id: 'vocabulary', en: 'Vocabulary', mm: 'ဝေါဟာရ', icon: 'letters' },
    { id: 'progress', en: 'My Progress', mm: 'တိုးတက်မှု', icon: 'bars' },
    { id: 'settings', en: 'Settings', mm: 'ဆက်တင်များ', icon: 'settings' }
  ];
  const ICONS = {
    home: '<path d="m3 10 9-7 9 7v10h-6v-6H9v6H3z"/>',
    mic: '<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4m-4 0h8"/>',
    headphones: '<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 14h4v7H5a2 2 0 0 1-2-2zm18 0h-4v7h2a2 2 0 0 0 2-2z"/>',
    book: '<path d="M12 6C9 4 5 4 2 5v14c3-1 7-1 10 1 3-2 7-2 10-1V5c-3-1-7-1-10 1zm0 0v14"/>',
    edit: '<path d="M4 20l4-.8L20 7.2 16.8 4 4.8 16zM14.8 6l3.2 3.2M3 21h18"/>',
    letters: '<path d="m3 20 5-16 5 16M5 14h6M16 5h5M18.5 5v15m-3 0h6"/>',
    bars: '<path d="M4 20v-6h3v6zm7 0V9h3v11zm7 0V4h3v16z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
    play: '<path d="m8 5 11 7-11 7z"/>',
    volume: '<path d="M4 9h4l5-4v14l-5-4H4zM17 9a5 5 0 0 1 0 6m2-9a9 9 0 0 1 0 12"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    chat: '<path d="M3 4h18v13H9l-6 4z"/><path d="M7 9h10M7 13h7"/>',
    lightbulb: '<path d="M9 18h6m-5 3h4M9 15c-1.5-1-3-3-3-5a6 6 0 1 1 12 0c0 2-1.5 4-3 5l-.5 2h-5z"/>',
    refresh: '<path d="M20 8V3l-3 3a8 8 0 1 0 3 7M4 16v5l3-3"/>',
    trend: '<path d="M3 19h18M5 16l5-5 3 3 6-8m-4 0h4v4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    spark: '<path d="m12 2 2 7 7 3-7 2-2 8-2-8-7-2 7-3z"/>'
  };
  const saved = readStore();
  const state = {
    view: 'speaking',
    language: saved.language || 'both',
    lessonId: Math.min(50, Math.max(1, Number(saved.lessonId) || 1)),
    variantIndex: Math.min(2, Math.max(0, Number(saved.variantIndex) || 0)),
    step: 1,
    completed: Array.isArray(saved.completed) ? saved.completed : [],
    scores: saved.scores || {},
    activityDates: Array.isArray(saved.activityDates) ? saved.activityDates : [],
    speechRate: Number(saved.speechRate) || 0.9,
    inputs: { shadow: '', answer: '', retry: '', use: '' },
    textRevealed: true,
    shadowScore: null,
    retryScore: null,
    thinkChoice: null,
    answerFeedback: '',
    aiAvailable: false,
    aiBusy: false,
    recording: false,
    recognition: null,
    toastTimer: null,
    search: '',
    category: 'all',
    geminiApiKey: localStorage.getItem('mingalar_gemini_api_key') || '',
    geminiModel: localStorage.getItem('mingalar_gemini_model') || 'gemini-2.5-flash'
  };

  function readStore() {
    try { return JSON.parse(localStorage.getItem('mingalar-tutor-v2') || '{}'); }
    catch (_) { return {}; }
  }
  function persist() {
    try {
      localStorage.setItem('mingalar-tutor-v2', JSON.stringify({
        language: state.language, lessonId: state.lessonId, variantIndex: state.variantIndex,
        completed: state.completed, scores: state.scores, activityDates: state.activityDates,
        speechRate: state.speechRate
      }));
    } catch (_) {}
  }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }
  function icon(name, size) {
    return `<svg width="${size || 20}" height="${size || 20}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.spark}</svg>`;
  }
  function label(en, mm) {
    if (state.language === 'en') return esc(en);
    if (state.language === 'mm') return '<span lang="my">' + esc(mm) + '</span>';
    return esc(en) + '<small lang="my">' + esc(mm) + '</small>';
  }
  function lesson() { return LESSONS[state.lessonId - 1] || LESSONS[0]; }
  function variant() { return lesson().variants[state.variantIndex]; }
  function todayKey() {
    const date = new Date();
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }
  function streak() {
    const days = new Set(state.activityDates);
    const current = new Date();
    if (!days.has(todayKey())) current.setDate(current.getDate() - 1);
    let result = 0;
    while (days.has([current.getFullYear(), String(current.getMonth() + 1).padStart(2, '0'), String(current.getDate()).padStart(2, '0')].join('-'))) {
      result++; current.setDate(current.getDate() - 1);
    }
    return result;
  }
  function resetPractice() {
    state.inputs = { shadow: '', answer: '', retry: '', use: '' };
    state.shadowScore = null; state.retryScore = null; state.thinkChoice = null;
    state.answerFeedback = ''; state.textRevealed = true;
  }
  function toast(message) {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(function () { el.classList.remove('show'); }, 3500);
  }
  function speak(textValue) {
    if (!('speechSynthesis' in window)) { toast('Audio playback is unavailable in this browser.'); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textValue);
    utterance.lang = 'en-US';
    utterance.rate = state.speechRate;
    utterance.pitch = 1.03;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(function (item) { return item.lang.startsWith('en') && /female|samantha|zira|aria/i.test(item.name); })
      || voices.find(function (item) { return item.lang.startsWith('en'); });
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }
  function record(field) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { toast('Speech recognition is unavailable here. Type your answer instead.'); return; }
    if (state.recognition) { state.recognition.stop(); state.recognition = null; state.recording = false; render(); return; }
    try {
      const recognition = new Recognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = function (event) {
        state.inputs[field] = event.results[0][0].transcript;
        render();
      };
      recognition.onerror = function (event) {
        state.recording = false; state.recognition = null; render();
        toast(event.error === 'not-allowed' ? 'Microphone access was blocked. You can type instead.' : 'Could not capture speech. Please try again or type.');
      };
      recognition.onend = function () { state.recording = false; state.recognition = null; render(); };
      state.recognition = recognition; state.recording = true;
      recognition.start(); render();
    } catch (_) { state.recording = false; state.recognition = null; toast('Microphone could not start. You can type instead.'); }
  }
  function tokens(value) {
    return String(value).toLowerCase().replace(/[’]/g, "'").match(/[a-z]+(?:'[a-z]+)*/g) || [];
  }
  function compareWords(actual, expected) {
    const a = tokens(actual), e = tokens(expected);
    const matrix = Array.from({ length: e.length + 1 }, function () { return Array(a.length + 1).fill(0); });
    for (let i = 1; i <= e.length; i++) for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = e[i - 1] === a[j - 1] ? matrix[i - 1][j - 1] + 1 : Math.max(matrix[i - 1][j], matrix[i][j - 1]);
    }
    const matched = new Set();
    let i = e.length, j = a.length;
    while (i > 0 && j > 0) {
      if (e[i - 1] === a[j - 1]) { matched.add(i - 1); i--; j--; }
      else if (matrix[i - 1][j] >= matrix[i][j - 1]) i--;
      else j--;
    }
    return { score: e.length ? Math.round(matrix[e.length][a.length] / e.length * 100) : 0,
      words: e.map(function (word, index) { return { word: word, matched: matched.has(index) }; }) };
  }
  function wordFeedback(actual) {
    const result = compareWords(actual, variant().en);
    const missing = result.words.filter(function (item) { return !item.matched; }).map(function (item) { return item.word; });
    return { result: result, missing: missing };
  }
  function goView(view) {
    if (view === 'mastery') { window.location.href = 'mastery.html'; return; }
    state.view = view;
    if (view === 'listening') state.step = 1;
    if (view === 'writing') state.step = 3;
    if (view === 'speaking' && state.step < 1) state.step = 1;
    render();
    document.getElementById('mainView').scrollTop = 0;
  }
  function setLesson(id) {
    state.lessonId = Math.min(50, Math.max(1, Number(id) || 1));
    state.variantIndex = 0; state.step = 1; state.view = 'speaking';
    resetPractice(); persist(); closeDialog(); render();
    document.getElementById('mainView').scrollTop = 0;
  }
  function renderNav() {
    document.getElementById('primaryNav').innerHTML = NAV.map(function (item) {
      return `<button class="nav-item ${state.view === item.id ? 'active' : ''}" type="button" data-view="${item.id}" ${state.view === item.id ? 'aria-current="page"' : ''}><span class="nav-icon">${icon(item.icon, 21)}</span><span class="nav-label">${label(item.en, item.mm)}</span></button>`;
    }).join('');
  }
  function renderHeader() {
    document.querySelectorAll('[data-language]').forEach(function (button) {
      button.classList.toggle('active', button.dataset.language === state.language);
      button.setAttribute('aria-pressed', String(button.dataset.language === state.language));
    });
  }
  function renderStatus() {
    const xp = state.completed.length * 20;
    const level = state.completed.length < 15 ? 'A1' : state.completed.length < 35 ? 'A2' : 'B1';
    document.getElementById('statusbar').innerHTML =
      `<div class="stat"><span class="stat-emoji">⭐</span><div><strong>Level: ${level}</strong><small lang="my">အဆင့်: ${level}</small></div></div>` +
      `<div class="stat"><span class="stat-emoji">🔥</span><div><strong>Streak: ${streak()} ${streak() === 1 ? 'day' : 'days'}</strong><small lang="my">ဆက်တိုက်: ${streak()} ရက်</small></div></div>` +
      `<div class="stat"><span class="stat-emoji">⭐</span><div><strong>XP: ${xp}</strong><small lang="my">အမှတ်: ${xp}</small></div></div>` +
      '<div class="footer-motto"><div class="motto-icon">✦</div><span>Better English<br>A Brighter Future</span></div>';
  }
  function renderRight() {
    const current = lesson();
    document.getElementById('rightPanel').innerHTML =
      `<div class="right-card"><div class="right-head"><span class="right-head-icon">🎯</span><div><strong>Today’s Lesson</strong><small lang="my">ယနေ့လေ့ကျင့်ခန်း</small></div></div>` +
      `<div class="topic-box"><strong>${esc(current.title)}</strong><small lang="my">${esc(current.titleMm)}</small></div>` +
      `<div class="step-progress-title">Step ${state.step} / 7</div><div class="step-progress"><span style="width:${state.step / 7 * 100}%"></span></div>` +
      '<div class="step-list">' + STEPS.map(function (step, index) {
        const number = index + 1;
        return `<button type="button" class="step-item ${state.step === number ? 'active' : ''} ${state.step > number ? 'done' : ''}" data-step="${number}" aria-label="Go to step ${number}: ${step.en}"><span class="step-item-icon">${icon(state.step > number ? 'check' : step.icon, 16)}</span><span class="step-item-text"><strong>${number}. ${step.en}</strong><small lang="my">${step.mm}</small></span></button>`;
      }).join('') + '</div></div>' +
      `<div class="right-card expression-card"><div class="right-head"><span class="right-head-icon">💡</span><div><strong>Expression Spotlight</strong><small lang="my">အသုံးအနှုန်း သုံးမျိုး</small></div></div>` +
      current.variants.map(function (item) {
        return `<div class="expression-row"><strong>${item.label}</strong><p>${esc(item.en)}</p><small lang="my">${esc(item.mm)}</small></div>`;
      }).join('') +
      '</div><div class="keep-going"><span>⭐</span><div><strong>Keep Going!</strong><small lang="my">ဆက်လက်ကြိုးစားပါ။</small></div></div>';
  }
  function hero() {
    return '<div class="hero"><img class="hero-img" src="assets/tutor.png" alt="Mingalar AI English Tutor friendly guide illustrating spoken English practice" width="1586" height="992" fetchpriority="high" decoding="async"><div class="hero-bubble"><strong>Mingalar Par!</strong><p>I’m your English tutor.<br>Let’s speak English together!</p><small lang="my">မင်္ဂလာပါ။ အင်္ဂလိပ်စကား အတူတူ လေ့ကျင့်ကြမယ်။</small></div><div class="hero-badge">✦ 50 situations · 150 sentences</div></div>';
  }
  function sentenceBox(concealed) {
    const item = variant();
    return `<div class="sentence-box ${concealed ? 'concealed' : ''}"><button class="play-round" type="button" data-action="play" aria-label="Play sentence">${icon('volume', 25)}</button><div class="sentence-text">${esc(item.en)}${state.language !== 'en' && !concealed ? '<small lang="my">' + esc(item.mm) + '</small>' : ''}</div></div>`;
  }
  function stageHead() {
    const item = STEPS[state.step - 1];
    return `<div class="step-title"><span class="step-icon ${item.color}">${icon(item.icon, 22)}</span><div><h2><span>Step ${state.step} · </span>${item.en}</h2><small lang="my">${item.mm}</small></div></div>`;
  }
  function textarea(name, placeholder, rows) {
    return `<textarea class="practice-textarea" name="${name}" rows="${rows || 3}" placeholder="${esc(placeholder)}">${esc(state.inputs[name])}</textarea>`;
  }
  function micButton(field) {
    return `<button type="button" class="mic-button ${state.recording ? 'recording' : ''}" data-action="record" data-field="${field}"><span class="mic-circle">${icon('mic', 21)}</span><span>${state.recording ? 'Listening… tap to stop' : 'Tap to speak'}<small lang="my">မိုက်ဖြင့် ပြောပါ</small></span></button>`;
  }
  function wordMarks(value) {
    const comparison = wordFeedback(value).result;
    return '<div class="word-matches">' + comparison.words.map(function (item) {
      return `<span class="${item.matched ? '' : 'miss'}">${esc(item.word)}</span>`;
    }).join('') + '</div>';
  }
  function scenarioText() {
    const examples = {
      1: 'A friend invites you out tonight, but you cannot go. What would you say?',
      2: 'A friend invites you to join them. You can go. What would you say?',
      6: 'Someone shares an opinion you do not agree with. What would you say?',
      16: 'You need help from someone. What would you say?',
      22: 'You received the wrong order. What would you say?',
      31: 'You meet an old friend. How would you ask how they are?'
    };
    return examples[state.lessonId] || 'Situation: ' + lesson().title + '. What would you say in English?';
  }
  function thinkPrompt() {
    return [
      {
        en: 'You are speaking to someone you do not know well and want to sound especially respectful. Which style fits best?',
        mm: 'မရင်းနှီးသေးသူနှင့် ယဉ်ကျေးစွာ ပြောလိုပါက ဘယ်ပုံစံကို ရွေးမလဲ။',
        correct: 2,
        reason: 'The polite version softens your message in a formal or sensitive situation.'
      },
      {
        en: 'You are chatting with a friend and want to sound like natural everyday conversation. Which style fits best?',
        mm: 'သူငယ်ချင်းနှင့် နေ့စဉ်စကားပြောသလို သဘာဝကျစွာ ပြောလိုပါက ဘယ်ပုံစံကို ရွေးမလဲ။',
        correct: 1,
        reason: 'The natural version is designed for relaxed everyday conversation.'
      },
      {
        en: 'You need a short, direct reply. Which version expresses the idea most simply?',
        mm: 'တိုတိုနှင့် တိုက်ရိုက် ပြန်ပြောလိုပါက ဘယ်ပုံစံက အရိုးရှင်းဆုံးလဲ။',
        correct: 0,
        reason: 'The simple version gives the shortest direct expression.'
      }
    ][(state.lessonId - 1) % 3];
  }
  function stageContent() {
    const item = variant();
    if (state.step === 1) return (
      '<p class="step-description">Listen carefully to the sentence. Notice its rhythm and tone.<span lang="my">စာကြောင်းကို ဂရုတစိုက် နားထောင်ပြီး အသံနေအသံထားကို သတိပြုပါ။</span></p>' +
      sentenceBox(!state.textRevealed) +
      `<div class="center-actions"><button class="primary-button wide" type="button" data-action="play">${icon('play', 16)} Play sentence</button><button class="outline-button" type="button" data-action="reveal">${icon('eye', 16)} ${state.textRevealed ? 'Hide text' : 'Show text'}</button></div>`
    );
    if (state.step === 2) {
      let feedback = '';
      if (state.shadowScore !== null) {
        const data = wordFeedback(state.inputs.shadow);
        feedback = `<div class="feedback-box"><div class="score-row"><span class="score-pill">${state.shadowScore}%</span><strong>Words matched in order</strong></div><p>${data.missing.length ? 'Try these words again: ' + esc(data.missing.join(', ')) : 'Great match. Now listen for rhythm and stress.'}</p>${wordMarks(state.inputs.shadow)}<small>This checks recognized words, not pronunciation accuracy.</small></div>`;
      }
      return '<p class="step-description">Play the sentence, then speak along with its rhythm.<span lang="my">အသံနှင့်အတူ လိုက်ပြောပါ။ စကားလုံးအလေးပေးပုံကိုလည်း နားထောင်ပါ။</span></p>' +
        sentenceBox(false) + '<label class="form-label" for="shadowInput">What did you say?</label>' +
        textarea('shadow', 'Your spoken words will appear here, or you can type them…') +
        `<div class="helper-row">${micButton('shadow')}<button class="primary-button" type="button" data-action="check-shadow">Check my shadow</button></div>` + feedback;
    }
    if (state.step === 3) return (
      '<p class="step-description">Respond naturally before looking at the model answer.<span lang="my">နမူနာအဖြေကို မကြည့်မီ မိမိဘာသာ အရင်ဖြေကြည့်ပါ။</span></p>' +
      `<div class="scenario"><strong>Real-life prompt</strong>${esc(scenarioText())}</div>` +
      '<label class="form-label">Your answer</label>' + textarea('answer', 'Type or say your own English answer…') +
      `<div class="helper-row">${micButton('answer')}<button class="primary-button" type="button" data-action="feedback">${state.aiAvailable ? 'Get Gemini AI feedback' : 'Check my answer'}</button></div>` +
      (state.aiAvailable ? '<p class="source-note">AI feedback evaluates your answer with Google Gemini AI.</p>' : '<p class="source-note">Local practice feedback active. <button type="button" class="mini-action" data-action="open-api-key">Configure Google Gemini API</button> for AI coaching.</p>') +
      (state.aiBusy ? '<div class="feedback-box blue">Your Gemini AI coach is thinking…</div>' : '') +
      (state.answerFeedback ? `<div class="feedback-box blue"><strong>${state.aiAvailable ? 'Gemini AI feedback' : 'Practice feedback'}</strong>${esc(state.answerFeedback).replace(/\n/g, '<br>')}</div>` : '')
    );
    if (state.step === 4) {
      const prompt = thinkPrompt();
      return (
        `<p class="step-description">${esc(prompt.en)}<span lang="my">${esc(prompt.mm)}</span></p>` +
        '<div class="style-choices">' + lesson().variants.map(function (option, index) {
          return `<button type="button" class="style-choice ${state.thinkChoice === index ? 'selected' : ''}" data-choice="${index}"><strong>${option.label}</strong><small>${esc(option.en)}</small></button>`;
        }).join('') + '</div>' +
        (state.thinkChoice !== null ? `<div class="feedback-box ${state.thinkChoice === prompt.correct ? '' : 'gold'}"><strong>${state.thinkChoice === prompt.correct ? 'Good choice!' : 'Try another style for this goal.'}</strong>${esc(prompt.reason)} All three versions express the idea; tone depends on the listener and situation.</div>` : '')
      );
    }
    if (state.step === 5) {
      const first = state.shadowScore;
      const difference = state.retryScore !== null && first !== null ? state.retryScore - first : null;
      return '<p class="step-description">Listen once more and try the sentence again. Focus on the words you missed.<span lang="my">ထပ်မံ နားထောင်ပြီး လွတ်သွားသော စကားလုံးများကို အာရုံစိုက်၍ ပြန်ပြောပါ။</span></p>' +
        sentenceBox(false) + textarea('retry', 'Try the same sentence again…') +
        `<div class="helper-row">${micButton('retry')}<button class="primary-button" type="button" data-action="check-retry">Check retry</button></div>` +
        (state.retryScore !== null ? `<div class="feedback-box"><strong>Retry match: ${state.retryScore}%${difference !== null ? ' · ' + (difference >= 0 ? '+' : '') + difference + ' points' : ''}</strong>${difference !== null && difference > 0 ? 'Your recognized words improved.' : 'Keep practicing the rhythm and key words.'}${wordMarks(state.inputs.retry)}</div>` : '');
    }
    if (state.step === 6) {
      const best = Math.max(state.shadowScore || 0, state.retryScore || 0);
      const missing = wordFeedback(state.inputs.retry || state.inputs.shadow).missing;
      return '<p class="step-description">Notice what improved, then compare all three ways to express the same idea.<span lang="my">တိုးတက်လာသည့်အချက်များကို ကြည့်ပြီး ပြောဆိုပုံ သုံးမျိုးကို နှိုင်းယှဉ်ပါ။</span></p>' +
        `<div class="feedback-box"><strong>Your practice snapshot · best word match ${best}%</strong>${missing.length ? 'Give extra attention to: ' + esc(missing.slice(0, 5).join(', ')) + '.' : 'You matched every target word. Try making the sentence sound more natural.'}<br>Listen for word stress and pauses. A transcript cannot measure pronunciation.</div>` +
        '<div class="variants-list">' + lesson().variants.map(function (option, index) {
          return `<div class="variant-card ${state.variantIndex === index ? 'active' : ''}"><strong>${option.label}</strong><p>${esc(option.en)}</p><small lang="my">${esc(option.mm)}</small><br><button type="button" class="mini-action" data-action="play-variant" data-index="${index}">▶ Listen</button></div>`;
        }).join('') + '</div>' +
        (state.answerFeedback ? `<div class="feedback-box blue"><strong>Answer feedback</strong>${esc(state.answerFeedback).replace(/\n/g, '<br>')}</div>` : '');
    }
    return (
      '<p class="step-description">Use this idea in your own situation. Make a new sentence you might actually say today.<span lang="my">ယနေ့ လက်တွေ့ပြောနိုင်မည့် ကိုယ်ပိုင် စာကြောင်းတစ်ကြောင်း ရေးပါ သို့မဟုတ် ပြောပါ။</span></p>' +
      `<div class="scenario"><strong>Make it yours</strong>${esc(scenarioText())}</div>` +
      textarea('use', 'Example: I’d love to, but I have class tonight…') +
      `<div class="helper-row">${micButton('use')}<button class="primary-button" type="button" data-action="complete">${icon('check', 16)} Complete lesson</button></div>` +
      (state.completed.includes(state.lessonId) ? `<div class="completion"><span class="big-check">✓</span><div><strong>Lesson complete! +20 XP</strong><small lang="my">သင်ခန်းစာ ပြီးပါပြီ။ ဆက်လက်ကြိုးစားပါ။</small></div></div>` : '')
    );
  }
  function renderPractice() {
    const current = lesson();
    return hero() +
      `<div class="practice-wrap"><div class="lesson-topline"><div><span class="eyebrow">SITUATION ${current.id} OF 50 ${current.bonus ? '· BONUS' : ''}</span><h1>${esc(current.title)}</h1><p lang="my">${esc(current.titleMm)}</p></div><button class="small-outline" type="button" data-action="choose-lesson">${icon('book', 15)} Choose lesson</button></div>` +
      `<div class="inline-controls" style="margin-bottom:12px">${current.variants.map(function (item, index) { return '<button class="pill-tab ' + (state.variantIndex === index ? 'active' : '') + '" type="button" data-variant="' + index + '">' + esc(item.label) + '</button>'; }).join('')}</div>` +
      '<section class="lesson-card"><div class="lesson-card-inner">' + stageHead() + stageContent() + '</div>' +
      `<div class="lesson-card-bottom"><button class="light-button" type="button" data-action="back" ${state.step === 1 ? 'disabled' : ''}>← Back</button><span class="bottom-note">${state.step} / 7 · ${STEPS[state.step - 1].en}</span><button class="primary-button" type="button" data-action="${state.step === 7 ? 'next-lesson' : 'next'}">${state.step === 7 ? 'Next lesson' : 'Continue'} ${icon('arrow', 16)}</button></div>` +
      '</section><p class="source-note">Word match uses the browser’s speech transcript or your typed text. It does not measure pronunciation. Lessons 48–50 are bonus material added to complete the advertised 150 sentences.</p></div>';
  }
  function renderHome() {
    const next = LESSONS.find(function (item) { return !state.completed.includes(item.id); }) || LESSONS[0];
    return `<div class="page-padding"><div class="page-heading"><div><span class="eyebrow">WELCOME TO MINGALAR</span><h1>Speak with confidence</h1><p lang="my">နေ့စဉ်သုံး အင်္ဂလိပ်စကားကို ယုံကြည်မှုရှိရှိ ပြောကြည့်ပါ။</p></div></div><div class="dashboard-hero"><img class="dashboard-hero-bg" src="assets/tutor.png" alt="Mingalar AI English Tutor practice banner with learner guide illustration" width="1586" height="992" fetchpriority="high" decoding="async"><div class="dashboard-hero-inner"><span class="eyebrow">YOUR DAILY PRACTICE</span><h2>One sentence.<br>Seven ways to grow.</h2><p>Hear → Shadow → Answer → Think → Retry → Improve → Use</p><button class="primary-button" type="button" data-action="resume">Start practicing ${icon('arrow', 16)}</button></div></div>` +
      `<div class="summary-grid"><div class="summary-card"><span>🎯</span><strong>${state.completed.length}/50</strong><small>situations completed</small></div><div class="summary-card"><span>🔥</span><strong>${streak()}</strong><small>day streak</small></div><div class="summary-card"><span>⭐</span><strong>${state.completed.length * 20}</strong><small>experience points</small></div></div>` +
      '<div class="view-card"><span class="eyebrow">NEW INTERACTIVE COURSE</span><h2>10 Essential Steps to Master Spoken English</h2><p class="step-description">Turn Saya Nay’s ebook ideas into short speaking tasks, listening checks, phrase practice, and a 30-day plan.</p><a class="primary-button" href="mastery.html">Explore the 10 steps →</a></div>' +
      `<div class="section-heading"><h2>Continue learning</h2><button class="mini-action" type="button" data-action="choose-lesson">View all 50 →</button></div><div class="lesson-tiles">${[next, LESSONS[(next.id) % 50], LESSONS[(next.id + 1) % 50], LESSONS[(next.id + 2) % 50]].map(function (item) { return '<button class="lesson-tile" type="button" data-lesson="' + item.id + '"><span class="tile-number">' + String(item.id).padStart(2, '0') + '</span><span><strong>' + esc(item.title) + '</strong><small lang="my">' + esc(item.titleMm) + '</small></span></button>'; }).join('')}</div></div>`;
  }
  function pageHead(eyebrow, title, mm) {
    return `<div class="page-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p lang="my">${mm}</p></div><button class="small-outline" type="button" data-action="choose-lesson">${icon('book', 15)} Choose lesson</button></div>`;
  }
  function renderReading() {
    return '<div class="page-padding">' + pageHead('READ AND NOTICE', 'Three ways to say it', 'အဓိပ္ပာယ်တူ စာကြောင်းသုံးမျိုးကို ဖတ်ကြည့်ပါ။') +
      `<div class="view-card"><span class="eyebrow">SITUATION ${state.lessonId}</span><h2>${esc(lesson().title)}</h2><p lang="my">${esc(lesson().titleMm)}</p>${lesson().variants.map(function (item) { return '<div class="reading-phrase"><div><h3>' + esc(item.label) + '</h3><p>' + esc(item.en) + '</p>' + (state.language !== 'en' ? '<small lang="my">' + esc(item.mm) + '</small>' : '') + '</div><button class="mini-action" type="button" data-action="play-text" data-text="' + esc(item.en) + '">▶ Listen</button></div>'; }).join('')}</div>` +
      '<div class="view-card"><h2>What changes?</h2><p class="step-description">The simple version is direct. The natural version sounds like daily conversation. The polite version softens the message for formal or sensitive moments.</p><button class="primary-button" type="button" data-action="resume">Practice this lesson ' + icon('arrow', 16) + '</button></div></div>';
  }
  function renderVocabulary() {
    return '<div class="page-padding">' + pageHead('USEFUL EXPRESSIONS', 'Learn the phrase, not just the word', 'စကားလုံးတစ်လုံးချင်းထက် အသုံးအနှုန်းကို လေ့လာပါ။') +
      `<div class="view-card"><span class="eyebrow">SITUATION ${state.lessonId}</span><h2>${esc(lesson().title)}</h2><p class="step-description">Tap a phrase to hear it. Notice how the tone becomes more natural and polite.</p><div class="variants-list">${lesson().variants.map(function (item) { return '<div class="variant-card"><strong>' + esc(item.label) + '</strong><p>' + esc(item.en) + '</p><small lang="my">' + esc(item.mm) + '</small><br><button class="mini-action" type="button" data-action="play-text" data-text="' + esc(item.en) + '">▶ Hear phrase</button></div>'; }).join('')}</div></div>` +
      '<div class="view-card"><h2>Practice tip</h2><p class="step-description">Try saying each phrase twice: once slowly, then at a comfortable conversation speed. Notice the tone, not only the vocabulary.</p></div></div>';
  }
  function renderProgress() {
    const completed = state.completed.slice().sort(function (a, b) { return a - b; });
    return '<div class="page-padding">' + pageHead('YOUR JOURNEY', 'My Progress', 'နေ့စဉ်လေ့ကျင့်မှု တိုးတက်လာပုံ') +
      `<div class="summary-grid"><div class="summary-card"><span>✅</span><strong>${completed.length}</strong><small>lessons complete</small></div><div class="summary-card"><span>🔥</span><strong>${streak()}</strong><small>day streak</small></div><div class="summary-card"><span>⭐</span><strong>${completed.length * 20}</strong><small>XP earned</small></div></div>` +
      `<div class="view-card"><h2>Course progress</h2><div class="progress-bar"><span style="width:${completed.length / 50 * 100}%"></span></div><p class="source-note">${completed.length} of 50 situations completed · 150 sentences available</p></div>` +
      `<div class="view-card"><h2>Completed situations</h2><div class="progress-list">${completed.length ? completed.map(function (id) { return '<div class="progress-row"><div><strong>' + id + '. ' + esc(LESSONS[id - 1].title) + '</strong><br><small lang="my">' + esc(LESSONS[id - 1].titleMm) + '</small></div><span>✓ Done</span></div>'; }).join('') : '<p class="step-description">Finish your first seven-step lesson and it will appear here.</p>'}</div></div></div>`;
  }
  function renderSettings() {
    return '<div class="page-padding">' + pageHead('PERSONALIZE', 'Settings', 'လေ့ကျင့်မှု ဆက်တင်များ') +
      `<div class="view-card"><h2>Learning preferences</h2><div class="setting-row"><div><strong>Display language</strong><small>English, Myanmar, or both for lesson guidance</small></div><select id="settingLanguage"><option value="both" ${state.language === 'both' ? 'selected' : ''}>Both</option><option value="en" ${state.language === 'en' ? 'selected' : ''}>English</option><option value="mm" ${state.language === 'mm' ? 'selected' : ''}>Myanmar</option></select></div><div class="setting-row"><div><strong>Voice speed</strong><small>Slow playback can help with shadowing</small></div><select id="settingRate"><option value="0.7" ${state.speechRate === .7 ? 'selected' : ''}>Slow</option><option value="0.9" ${state.speechRate === .9 ? 'selected' : ''}>Normal</option><option value="1.1" ${state.speechRate === 1.1 ? 'selected' : ''}>Fast</option></select></div></div>` +
      `<div class="view-card"><h2>Google Gemini AI feedback</h2><p class="step-description">${state.aiAvailable ? 'Connected to Google Gemini AI. Your spoken and written responses receive intelligent feedback.' : 'Local rule-based feedback is currently active. Connect your Google Gemini API key to receive AI coaching.'}</p><button class="outline-button" type="button" data-action="open-api-key" style="margin-top:6px">⚙️ Configure Gemini API Key</button><p class="source-note" style="margin-top:10px">Seamlessly supports Cloudflare Pages deployment or static browser storage.</p></div>` +
      '<div class="view-card"><h2>Your data</h2><p class="step-description">Lesson progress is saved in this browser.</p><button class="danger-button" type="button" data-action="reset-progress">Reset progress</button></div></div>';
  }
  function render() {
    renderHeader(); renderNav(); renderStatus(); renderRight();
    document.getElementById('mainView').innerHTML =
      state.view === 'home' ? renderHome() :
      state.view === 'reading' ? renderReading() :
      state.view === 'vocabulary' ? renderVocabulary() :
      state.view === 'progress' ? renderProgress() :
      state.view === 'settings' ? renderSettings() : renderPractice();
  }
  function openDialog() {
    const categories = Array.from(new Set(LESSONS.map(function (item) { return item.part; })));
    document.getElementById('categoryFilter').innerHTML = '<option value="all">All topics</option>' + categories.map(function (item) {
      return `<option value="${esc(item)}">${esc(item)}</option>`;
    }).join('');
    document.getElementById('categoryFilter').value = state.category;
    document.getElementById('lessonSearch').value = state.search;
    document.getElementById('lessonDialog').hidden = false;
    renderLibrary();
    document.getElementById('lessonSearch').focus();
  }
  function closeDialog() { document.getElementById('lessonDialog').hidden = true; }
  function renderLibrary() {
    const query = state.search.toLowerCase().trim();
    const filtered = LESSONS.filter(function (item) {
      return (state.category === 'all' || item.part === state.category) &&
        (!query || [item.title, item.titleMm, item.part, item.partMm].concat(item.variants.flatMap(function (variantItem) { return [variantItem.en, variantItem.mm]; }))
          .some(function (textValue) { return textValue.toLowerCase().includes(query); }));
    });
    document.getElementById('lessonList').innerHTML = filtered.length ? filtered.map(function (item) {
      return `<button type="button" class="lesson-list-item ${state.lessonId === item.id ? 'current' : ''}" data-lesson="${item.id}"><span class="tile-number">${String(item.id).padStart(2, '0')}</span><span><strong>${esc(item.title)}${item.bonus ? '<em>Bonus</em>' : ''}</strong><small lang="my">${esc(item.titleMm)}</small></span></button>`;
    }).join('') : '<p class="step-description">No situations match your search.</p>';
  }
  function localFeedback() {
    const response = state.inputs.answer.trim();
    const words = tokens(response);
    const example = variant().en;
    const overlap = new Set(words.filter(function (word) { return tokens(example).includes(word); })).size;
    if (!words.length) return '';
    if (words.length < 3) return 'Good start. Try a complete sentence. One possible model: ' + example;
    if (overlap >= 2) return 'You used relevant words for this situation. Compare your tone with the model: ' + example;
    return 'You made your own answer. Check whether it fits the situation, then compare with this model: ' + example;
  }
  async function directGeminiFeedback(apiKey, model, target, situation, learnerAnswer, language) {
    const targetModel = model || 'gemini-2.5-flash';
    const prompt = `You are a supportive, practical English speaking coach for Myanmar learners.
The learner was practicing the situation: "${situation}".
The target natural model expression was: "${target}".
The learner said or wrote: "${learnerAnswer}".

Evaluate their answer in 2-3 concise sentences:
1. Praise their effort and confirm whether their meaning was clear.
2. Note any grammar or vocabulary adjustment gently if needed.
3. Suggest one natural alternate way to say it in English.
Keep tone encouraging, concise, and easy to read. ${language === 'mm' ? 'Provide a brief 1-line encouraging note in Myanmar language at the end.' : ''}`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(targetModel)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 250, temperature: 0.7 }
      })
    });
    if (!res.ok) {
      const errData = await res.json().catch(function () { return {}; });
      throw new Error(errData?.error?.message || ('Gemini API responded with ' + res.status));
    }
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  }

  function updateAiStatusDot() {
    const dot = document.getElementById('aiStatusDot');
    if (dot) {
      if (state.aiAvailable || Boolean(state.geminiApiKey)) {
        dot.classList.add('active');
        dot.title = 'Gemini AI Connected';
      } else {
        dot.classList.remove('active');
        dot.title = 'Gemini AI Not Connected';
      }
    }
  }

  function openApiKeyDialog() {
    const dialog = document.getElementById('apiKeyDialog');
    if (!dialog) return;
    const input = document.getElementById('geminiApiKeyInput');
    const select = document.getElementById('geminiModelSelect');
    const banner = document.getElementById('apiKeyBanner');
    if (input) input.value = state.geminiApiKey || '';
    if (select) select.value = state.geminiModel || 'gemini-2.5-flash';
    if (banner) {
      if (state.geminiApiKey) {
        banner.className = 'api-key-status-banner success';
        banner.innerHTML = '<span>Personal Gemini API key is configured in this browser.</span>';
      } else if (state.aiAvailable) {
        banner.className = 'api-key-status-banner success';
        banner.innerHTML = '<span>Gemini AI is connected via Cloudflare Pages / server environment.</span>';
      } else {
        banner.className = 'api-key-status-banner info';
        banner.innerHTML = '<span>No Gemini API key detected yet. Enter your API key below to enable real-time coaching.</span>';
      }
    }
    dialog.hidden = false;
    if (input) input.focus();
  }

  function closeApiKeyDialog() {
    const dialog = document.getElementById('apiKeyDialog');
    if (dialog) dialog.hidden = true;
  }

  async function testApiKey() {
    const input = document.getElementById('geminiApiKeyInput');
    const select = document.getElementById('geminiModelSelect');
    const banner = document.getElementById('apiKeyBanner');
    const key = (input ? input.value : state.geminiApiKey).trim();
    const model = select ? select.value : state.geminiModel;

    if (!key && !state.aiAvailable) {
      if (banner) {
        banner.className = 'api-key-status-banner error';
        banner.innerHTML = '<span>Please enter a Gemini API key first.</span>';
      }
      return;
    }

    if (banner) {
      banner.className = 'api-key-status-banner info';
      banner.innerHTML = '<span>Testing connection to Google Gemini API…</span>';
    }

    try {
      if (key) {
        await directGeminiFeedback(key, model, 'Good morning', 'Greeting a colleague', 'Hello, good morning!', 'en');
      } else {
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId: 1, target: 'Good morning', situation: 'Greeting', learnerAnswer: 'Hello!', language: 'en' })
        });
        if (!res.ok) throw new Error('Backend returned status ' + res.status);
      }
      if (banner) {
        banner.className = 'api-key-status-banner success';
        banner.innerHTML = '<span>Success! Google Gemini API is working properly.</span>';
      }
      toast('Gemini API test passed!');
    } catch (err) {
      if (banner) {
        banner.className = 'api-key-status-banner error';
        banner.innerHTML = `<span>Connection failed: ${esc(err.message)}</span>`;
      }
    }
  }

  function saveApiKey() {
    const input = document.getElementById('geminiApiKeyInput');
    const select = document.getElementById('geminiModelSelect');
    const key = input ? input.value.trim() : '';
    const model = select ? select.value : 'gemini-2.5-flash';

    state.geminiApiKey = key;
    state.geminiModel = model;
    if (key) {
      localStorage.setItem('mingalar_gemini_api_key', key);
      state.aiAvailable = true;
    } else {
      localStorage.removeItem('mingalar_gemini_api_key');
    }
    localStorage.setItem('mingalar_gemini_model', model);

    updateAiStatusDot();
    toast(key ? 'Gemini API key saved!' : 'Saved preferences.');
    closeApiKeyDialog();
    render();
  }

  function clearApiKey() {
    state.geminiApiKey = '';
    localStorage.removeItem('mingalar_gemini_api_key');
    const input = document.getElementById('geminiApiKeyInput');
    if (input) input.value = '';
    const banner = document.getElementById('apiKeyBanner');
    if (banner) {
      banner.className = 'api-key-status-banner info';
      banner.innerHTML = '<span>Key cleared. Enter a new key if you wish.</span>';
    }
    checkStatus();
    toast('API key cleared.');
  }

  function checkStatus() {
    fetch('/api/status').then(function (response) { return response.ok ? response.json() : {}; })
      .then(function (data) {
        state.aiAvailable = Boolean(data.aiAvailable) || Boolean(state.geminiApiKey);
        updateAiStatusDot();
        if (state.view === 'settings' || state.view === 'speaking') render();
      })
      .catch(function () {
        state.aiAvailable = Boolean(state.geminiApiKey);
        updateAiStatusDot();
      });
  }

  async function getFeedback() {
    if (!state.inputs.answer.trim()) { toast('Say or type an answer first.'); return; }
    state.answerFeedback = localFeedback();
    const hasAi = state.aiAvailable || Boolean(state.geminiApiKey);
    if (!hasAi) { render(); return; }
    state.aiBusy = true; render();
    try {
      let feedbackResult = null;
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (state.geminiApiKey) headers['x-gemini-api-key'] = state.geminiApiKey;
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            lessonId: state.lessonId,
            target: variant().en,
            situation: lesson().title,
            learnerAnswer: state.inputs.answer.trim(),
            language: state.language
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.feedback) feedbackResult = data.feedback;
        }
      } catch (_) {}

      if (!feedbackResult && state.geminiApiKey) {
        feedbackResult = await directGeminiFeedback(
          state.geminiApiKey,
          state.geminiModel,
          variant().en,
          lesson().title,
          state.inputs.answer.trim(),
          state.language
        );
      }

      if (feedbackResult) {
        state.answerFeedback = feedbackResult;
      } else {
        toast('Gemini AI feedback unavailable. Showing local practice guidance.');
      }
    } catch (_) {
      toast('Gemini AI feedback is unavailable. Showing local practice guidance.');
    } finally {
      state.aiBusy = false;
      render();
    }
  }
  function completeLesson() {
    if (!state.inputs.use.trim()) { toast('Add your own sentence to complete this lesson.'); return; }
    if (!state.completed.includes(state.lessonId)) {
      state.completed.push(state.lessonId);
      state.activityDates.push(todayKey());
      state.activityDates = Array.from(new Set(state.activityDates));
      state.scores[state.lessonId] = Math.max(state.shadowScore || 0, state.retryScore || 0);
      persist(); toast('Lesson complete! You earned 20 XP.');
    }
    render();
  }

  document.addEventListener('click', function (event) {
    const languageButton = event.target.closest('[data-language]');
    if (languageButton) { state.language = languageButton.dataset.language; persist(); render(); return; }
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) { goView(viewButton.dataset.view); return; }
    const lessonButton = event.target.closest('[data-lesson]');
    if (lessonButton) { setLesson(lessonButton.dataset.lesson); return; }
    const variantButton = event.target.closest('[data-variant]');
    if (variantButton) { state.variantIndex = Number(variantButton.dataset.variant); state.step = 1; resetPractice(); persist(); render(); return; }
    const stepButton = event.target.closest('[data-step]');
    if (stepButton) { state.step = Number(stepButton.dataset.step); state.view = 'speaking'; render(); return; }
    const choiceButton = event.target.closest('[data-choice]');
    if (choiceButton) { state.thinkChoice = Number(choiceButton.dataset.choice); render(); return; }
    const button = event.target.closest('[data-action]');
    if (!button) {
      if (event.target.id === 'lessonDialog') closeDialog();
      if (event.target.id === 'apiKeyDialog') closeApiKeyDialog();
      return;
    }
    const action = button.dataset.action;
    if (action === 'choose-lesson') openDialog();
    else if (action === 'close-dialog') closeDialog();
    else if (action === 'open-api-key') openApiKeyDialog();
    else if (action === 'close-api-dialog') closeApiKeyDialog();
    else if (action === 'resume') goView('speaking');
    else if (action === 'play') speak(variant().en);
    else if (action === 'play-text') speak(button.dataset.text);
    else if (action === 'play-variant') speak(lesson().variants[Number(button.dataset.index)].en);
    else if (action === 'reveal') { state.textRevealed = !state.textRevealed; render(); }
    else if (action === 'record') record(button.dataset.field);
    else if (action === 'check-shadow') {
      if (!state.inputs.shadow.trim()) { toast('Say or type the sentence first.'); return; }
      state.shadowScore = compareWords(state.inputs.shadow, variant().en).score; render();
    }
    else if (action === 'check-retry') {
      if (!state.inputs.retry.trim()) { toast('Say or type your retry first.'); return; }
      state.retryScore = compareWords(state.inputs.retry, variant().en).score; render();
    }
    else if (action === 'feedback') getFeedback();
    else if (action === 'complete') completeLesson();
    else if (action === 'next') { state.step = Math.min(7, state.step + 1); render(); }
    else if (action === 'back') { state.step = Math.max(1, state.step - 1); render(); }
    else if (action === 'next-lesson') setLesson(state.lessonId === 50 ? 1 : state.lessonId + 1);
    else if (action === 'reset-progress') {
      if (confirm('Reset all saved lesson progress on this browser?')) {
        state.completed = []; state.scores = {}; state.activityDates = []; persist(); render(); toast('Progress reset.');
      }
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target.id === 'toggleApiKeyVis') {
      const input = document.getElementById('geminiApiKeyInput');
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        event.target.textContent = input.type === 'password' ? '👁' : '🔒';
      }
    } else if (event.target.id === 'testApiKeyBtn') {
      testApiKey();
    } else if (event.target.id === 'saveApiKeyBtn') {
      saveApiKey();
    } else if (event.target.id === 'clearApiKeyBtn') {
      clearApiKey();
    }
  });

  document.addEventListener('input', function (event) {
    if (event.target.matches('textarea[name]')) state.inputs[event.target.name] = event.target.value;
    if (event.target.id === 'lessonSearch') { state.search = event.target.value; renderLibrary(); }
  });
  document.addEventListener('change', function (event) {
    if (event.target.id === 'categoryFilter') { state.category = event.target.value; renderLibrary(); }
    if (event.target.id === 'settingLanguage') { state.language = event.target.value; persist(); render(); }
    if (event.target.id === 'settingRate') { state.speechRate = Number(event.target.value); persist(); toast('Voice speed updated.'); }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (!document.getElementById('lessonDialog').hidden) closeDialog();
      if (!document.getElementById('apiKeyDialog').hidden) closeApiKeyDialog();
    }
  });

  checkStatus();
  render();
})();
