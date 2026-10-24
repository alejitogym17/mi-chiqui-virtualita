/* Cambia aquí los textos y nombres de la sorpresa. No se guardan respuestas. */
const COPY = {
  introTitle: 'Mi chiqui, tengo algo que preguntarte… 💗',
  introSubhead: 'Preparé una pequeña historia para decirte algo que me nace del corazón. Léela a tu ritmo.',
  beginButton: 'Empezar la historia',
  envelopeTitle: 'Primero, abre tu cartita',
  envelopeSubhead: 'Toca el sobre para descubrir lo que guardé adentro.',
  letterText: 'Hola, mi chiqui. Hay algo que llevo queriendo decirte de una forma bonita… y preparé esta cartita para hacerlo a mi manera. 💗',
  specialTitle: 'Tienes una forma muy tuya de alegrarme',
  specialFirst: 'Me encanta tu ternura, tu alegría y esa personalidad tuya que siento que encaja tan bonito con la mía.',
  specialSecond: 'Y cada vez que veo los vídeos que me mandas, muero de amor y ternura. Me encanta verte así, siendo tú.',
  specialQuote: '«Eres muy tiernitaa, mi chiqui».',
  feelingsTitle: 'Esto es lo que me nace contigo',
  feelingFirst: 'Quiero que seas mi virtualita porque a mis ojos eres diferente y especial, y siempre me sacas una sonrisa.',
  feelingSecond: 'Cuando te veo y te escucho, se me despierta un lado que solo quiere morir de amor por ti, mi chiqui.',
  feelingThird: 'Aunque todavía nos falta mucho por conocernos, quiero hacerlo de una manera linda, más allá de ser amigos. Quiero escucharte por siempre.',
  promiseTitle: 'Seguir conociéndote, bonito',
  promise: 'Quiero seguir conociéndote, cuidarte y escucharte cada día.',
  promiseNote: 'Sin apuros ni presiones: solo con muchas ganas de construir algo lindo contigo, paso a paso.',
  question: 'Mi chiqui… ¿quieres ser mi virtualita oficialmente?',
  questionSubhead: 'Respóndeme con lo que sientas, con toda tranquilidad. 💗',
  yesButton: 'Sí, mi amoff 💗',
  thinkButton: 'Quiero pensarlo un poquito 🥹',
  noButton: 'No lo siento así',
  privacyNote: 'Tu respuesta solo se muestra en esta página: no se envía ni se guarda.'
};

const STAGE_NAMES = ['La invitación', 'El sobre', 'Lo especial de ti', 'Lo que siento', 'Mi promesa', 'La pregunta'];
const stages = Array.from(document.querySelectorAll('.screen[id^="stage-"]'));
const progressLabel = document.getElementById('progressLabel');
const progressNumber = document.getElementById('progressNumber');
const progressTrack = document.getElementById('progressTrack');
const progressFill = document.getElementById('progressFill');
const liveStatus = document.getElementById('liveStatus');
const outcome = document.getElementById('outcome');
let currentStage = 0;
let audioObjectUrl = null;
let finishTimer = null;

for (const element of document.querySelectorAll('[data-copy]')) {
  const key = element.dataset.copy;
  if (Object.hasOwn(COPY, key)) element.textContent = COPY[key];
}

function setStage(index, shouldFocus = true) {
  const safeIndex = Math.max(0, Math.min(stages.length - 1, index));
  currentStage = safeIndex;
  outcome.hidden = true;
  document.getElementById('celebrationLayer').replaceChildren();
  if (finishTimer) window.clearTimeout(finishTimer);
  document.querySelector('.story-progress').hidden = false;
  for (let i = 0; i < stages.length; i += 1) {
    const active = i === safeIndex;
    stages[i].hidden = !active;
    stages[i].classList.toggle('is-active', active);
  }
  progressLabel.textContent = STAGE_NAMES[safeIndex];
  progressNumber.innerHTML = String(safeIndex + 1).padStart(2, '0') + ' <span class="progress-divider">/</span> 06';
  progressTrack.setAttribute('aria-valuenow', String(safeIndex + 1));
  progressTrack.setAttribute('aria-valuetext', 'Etapa ' + (safeIndex + 1) + ' de 6: ' + STAGE_NAMES[safeIndex]);
  progressFill.style.width = (((safeIndex + 1) / stages.length) * 100) + '%';
  if (safeIndex === 0) liveStatus.textContent = 'La invitación. Mi chiqui, tengo algo que preguntarte.';
  else liveStatus.textContent = STAGE_NAMES[safeIndex] + ', etapa ' + (safeIndex + 1) + ' de 6.';
  window.scrollTo({ top: 0, behavior: document.body.classList.contains('motion-reduced') ? 'auto' : 'smooth' });
  if (shouldFocus) {
    const heading = stages[safeIndex].querySelector('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
}

document.addEventListener('click', (event) => {
  const go = event.target.closest('[data-go]');
  if (go) {
    const next = Number(go.dataset.go);
    if (Number.isInteger(next)) setStage(next);
  }
});

const envelopeButton = document.getElementById('envelopeButton');
const letterReveal = document.getElementById('letterReveal');
const letterContinue = document.getElementById('letterContinue');
document.querySelector('.wordmark').addEventListener('click', (event) => {
  event.preventDefault();
  envelopeButton.classList.remove('is-open');
  envelopeButton.setAttribute('aria-expanded', 'false');
  envelopeButton.setAttribute('aria-label', 'Abrir el sobre');
  document.getElementById('envelopeHint').innerHTML = 'Pulsa o toca para abrir <span aria-hidden="true">↗</span>';
  letterReveal.hidden = true;
  letterContinue.hidden = true;
  setStage(0);
});
envelopeButton.addEventListener('click', () => {
  if (envelopeButton.getAttribute('aria-expanded') === 'true') return;
  envelopeButton.classList.add('is-open');
  envelopeButton.setAttribute('aria-expanded', 'true');
  envelopeButton.setAttribute('aria-label', 'Sobre abierto');
  document.getElementById('envelopeHint').textContent = 'Una cartita para ti, mi chiqui. ♡';
  letterReveal.hidden = false;
  letterContinue.hidden = false;
  liveStatus.textContent = 'El sobre está abierto. Ya puedes leer la cartita y seguir.';
  letterContinue.focus();
});

document.getElementById('motionButton').addEventListener('click', (event) => {
  const reduced = document.body.classList.toggle('motion-reduced');
  event.currentTarget.setAttribute('aria-pressed', String(reduced));
  liveStatus.textContent = reduced ? 'Animaciones decorativas reducidas.' : 'Animaciones decorativas activadas.';
});

const musicButton = document.getElementById('musicButton');
const musicButtonText = document.getElementById('musicButtonText');
const audioPicker = document.getElementById('audioPicker');
const song = document.getElementById('song');
function musicLabel(label, status) {
  musicButtonText.textContent = label;
  musicButton.setAttribute('aria-label', label);
  if (status) liveStatus.textContent = status;
}
musicButton.addEventListener('click', async () => {
  if (!song.src) {
    audioPicker.click();
    return;
  }
  if (song.paused) {
    try {
      await song.play();
      musicLabel('Pausar música', 'La música está sonando.');
    } catch {
      musicLabel('Reproducir música', 'El navegador no pudo reproducir ese archivo. Prueba con otro archivo de audio.');
    }
  } else {
    song.pause();
    musicLabel('Reproducir música', 'Música en pausa.');
  }
});
audioPicker.addEventListener('change', () => {
  const file = audioPicker.files && audioPicker.files[0];
  if (!file) return;
  if (!file.type.startsWith('audio/')) {
    musicLabel('Elegir canción', 'Ese archivo no parece ser audio. Elige una canción guardada en tu dispositivo.');
    audioPicker.value = '';
    return;
  }
  if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl);
  audioObjectUrl = URL.createObjectURL(file);
  song.src = audioObjectUrl;
  musicLabel('Reproducir música', 'Archivo listo. Pulsa Reproducir música cuando quieras. El audio se queda en este dispositivo.');
  audioPicker.value = '';
});
song.addEventListener('ended', () => musicLabel('Reproducir música', 'La canción terminó.'));
song.addEventListener('pause', () => {
  if (song.src && !song.ended) musicButtonText.textContent = 'Reproducir música';
});
window.addEventListener('pagehide', () => {
  if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl);
  if (finishTimer) window.clearTimeout(finishTimer);
});

const responseCopy = {
  yes: {
    eyebrow: 'mi corazón está haciendo fiesta', icon: '♥', title: 'Ay, Pau… me hiciste el día.',
    message: 'Me hace muchísima ilusión dar este pasito contigo. Quiero seguir conociéndote, cuidarte y escucharte, mi chiqui. Te mando el abrazo más bonito. 💗',
    celebrate: true
  },
  think: {
    eyebrow: 'con calma, mi chiqui', icon: '♡', title: 'Está bien, mi chiqui.',
    message: 'Tómate tu tiempo, ¿sí? Lo bonito es que puedas decirme lo que sientes con tranquilidad. Te mando un abrazo virtual enorme. 💗',
    celebrate: false
  },
  no: {
    eyebrow: 'gracias por decírmelo', icon: '♡', title: 'Gracias por tu sinceridad, Pau.',
    message: 'Está bien; respeto lo que sientes y no tienes que explicarme nada. Te mando un abrazo con cariño. 💗',
    celebrate: false
  }
};
function makeConfetti() {
  const holder = document.getElementById('celebrationLayer');
  holder.replaceChildren();
  const reduced = document.body.classList.contains('motion-reduced') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = reduced ? 10 : 38;
  const colors = ['#c7587a', '#e8a2b5', '#f1c2a7', '#bd8bb9', '#d78394'];
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'celebration-particle';
    piece.textContent = i % 4 === 0 ? '✦' : (i % 3 === 0 ? '♡' : '♥');
    piece.style.left = (Math.random() * 100) + '%';
    piece.style.setProperty('--particle-color', colors[i % colors.length]);
    piece.style.setProperty('--particle-size', (11 + Math.random() * 15) + 'px');
    piece.style.setProperty('--particle-time', (reduced ? 0 : 2.1 + Math.random() * 1.7) + 's');
    piece.style.setProperty('--particle-delay', (reduced ? 0 : Math.random() * .7) + 's');
    holder.append(piece);
  }
  if (finishTimer) window.clearTimeout(finishTimer);
  finishTimer = window.setTimeout(() => holder.replaceChildren(), reduced ? 160 : 4800);
}
function showOutcome(kind) {
  const answer = responseCopy[kind];
  if (!answer) return;
  for (const stage of stages) stage.hidden = true;
  outcome.hidden = false;
  document.querySelector('.story-progress').hidden = true;
  const card = outcome.querySelector('.outcome-card');
  card.classList.toggle('is-yes', answer.celebrate);
  document.getElementById('outcomeEyebrow').textContent = answer.eyebrow;
  document.getElementById('outcomeIcon').textContent = answer.icon;
  const title = document.getElementById('outcomeTitle');
  title.textContent = answer.title;
  document.getElementById('outcomeMessage').textContent = answer.message;
  document.getElementById('endNote').hidden = true;
  document.getElementById('outcomeActions').hidden = false;
  liveStatus.textContent = answer.title + ' ' + answer.message;
  if (answer.celebrate) makeConfetti();
  else document.getElementById('celebrationLayer').replaceChildren();
  window.scrollTo({ top: 0, behavior: document.body.classList.contains('motion-reduced') ? 'auto' : 'smooth' });
  title.focus({ preventScroll: true });
}
for (const button of document.querySelectorAll('[data-response]')) {
  button.addEventListener('click', () => showOutcome(button.dataset.response));
}
document.querySelector('[data-finish]').addEventListener('click', () => {
  document.getElementById('outcomeMessage').textContent = 'Gracias por leerme hasta aquí, Pau. 💗';
  document.getElementById('outcomeActions').hidden = true;
  document.getElementById('endNote').hidden = false;
  document.getElementById('outcomeTitle').textContent = 'La cartita termina aquí';
  document.getElementById('outcomeTitle').focus();
  liveStatus.textContent = 'La cartita termina aquí.';
});

setStage(0, false);
