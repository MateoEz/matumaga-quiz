// Game State
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// DOM Elements
const app = document.getElementById('app');

// Confetti configuration
const confettiDefaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['heart'],
    colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585']
};

// Utilities
function playSound(type) {
    // Optional: Add sound effects here if desired
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shootConfetti() {
    confetti({
        ...confettiDefaults,
        particleCount: 50,
        scalar: 2,
    });

    confetti({
        ...confettiDefaults,
        particleCount: 25,
        scalar: 3,
        shapes: ['circle']
    });
}

// Views
function renderStartScreen() {
    app.innerHTML = `
        <div class="glass-card p-8 rounded-2xl max-w-md w-full text-center animate-fade-in relative overflow-hidden">
            <div class="absolute -top-10 -left-10 w-32 h-32 bg-brand-pink opacity-20 rounded-full blur-2xl"></div>
            <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-red opacity-20 rounded-full blur-2xl"></div>
            
            <h1 class="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-red-300">
                Matumaga Quiz
            </h1>
            <p class="text-gray-200 mb-6 text-lg">
               
            </p>
            
            <!-- User Image Placeholder -->
            <div class="mb-8 relative transform hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-tr from-pink-500 to-red-500 rounded-xl blur-lg opacity-50"></div>
                <img src="images/perfil.jpeg" alt="Couple Photo" class="relative w-full h-64 object-cover rounded-xl shadow-2xl border-2 border-white/20">
            </div>

            <p class="text-white/90 mb-8 italic text-sm bg-white/10 p-4 rounded-xl border border-white/10">
                "Para reclamar tu premio sorpresa, primero tendras que pasar por mi super QUIZ y demostrar si sabes lo necesario..."
            </p>

            <button onclick="startQuiz()" class="btn-primary w-full py-4 rounded-xl font-bold text-xl text-white shadow-lg transform transition active:scale-95">
                Comenzar
            </button>
        </div>
    `;
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    app.innerHTML = `
        <div class="w-full max-w-lg">
            <!-- Progress Bar -->
            <div class="w-full bg-white/10 h-2 rounded-full mb-6 overflow-hidden">
                <div class="bg-gradient-to-r from-pink-400 to-red-500 h-full transition-all duration-500 ease-out" style="width: ${progress}%"></div>
            </div>

            <!-- Question Card -->
            <div class="glass-card p-6 md:p-8 rounded-2xl animate-pop-in">
                <div class="flex justify-between items-center mb-6">
                    <span class="text-sm font-semibold text-pink-300 uppercase tracking-wider">Pregunta ${currentQuestionIndex + 1}/${questions.length}</span>
                    <span class="text-2xl">🤔</span>
                </div>
                
                <h2 class="text-2xl font-bold mb-4 leading-tight">
                    ${question.text}
                </h2>

                ${question.type === 'text_with_image' ? `
                    <div class="mb-6">
                        <img src="${question.image}" class="w-full h-48 object-cover rounded-xl shadow-lg border border-white/10" alt="Question Image">
                    </div>
                ` : ''}

                <div class="grid gap-4 ${question.type === 'image' ? 'grid-cols-2' : 'grid-cols-1'}">
                    ${question.options.map((option, index) => `
                        <div onclick="selectOption(${index})" 
                             class="option-card p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer flex items-center group relative overflow-hidden"
                             id="option-${index}">
                            ${(question.type === 'text' || question.type === 'text_with_image')
            ? `<span class="flex-grow font-medium">${option.text}</span>`
            : `<img src="${option.image}" class="w-full h-32 object-cover rounded-lg" alt="Option ${index + 1}">`
        }
                            <div class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-pink-300">
                                ➜
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderResults() {
    const percentage = (score / questions.length) * 100;
    const isVictory = percentage > 70;

    if (isVictory) {
        shootSideConfetti();
    }

    app.innerHTML = `
        <div class="glass-card p-8 rounded-2xl max-w-md w-full text-center animate-fade-in">
            <div class="text-6xl mb-4 animate-bounce">
                ${isVictory ? '🏆' : '😢'}
            </div>
            
            <h2 class="text-3xl font-bold mb-2">
                ${isVictory ? '¡Ganaste!' : 'Intenta de nuevo'}
            </h2>
            
            <p class="text-xl mb-6 text-gray-200">
                Tu puntaje: <span class="block mt-2 font-extrabold text-4xl text-white text-shadow-sm">${score}/${questions.length}</span>
            </p>

            ${isVictory ? `
                <div class="mb-8 p-4 bg-white/10 rounded-xl border border-white/20 animate-pulse-slow">
                    <p class="text-sm uppercase tracking-widest mb-2 text-pink-300">Tu Premio</p>
                    <div class="relative group cursor-pointer overflow-hidden rounded-lg w-64 mx-auto">
                        <img src="images/foto-final.jpeg" alt="Gift Card" class="w-full h-auto rounded-lg shadow-2xl transform transition duration-500 hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
                            <span class="text-white font-bold text-xl text-shadow">¡Premio Sorpresa!</span>
                        </div>
                    </div>
                     <button onclick="claimPrize()" class="mt-4 btn-secondary w-full py-2 rounded-lg text-sm font-semibold text-white border border-white/30 hover:bg-white/20 transition-colors">
                        Reclamar Premio
                    </button>
                </div>
            ` : `
                <p class="mb-8 text-gray-300">
                    Necesitas más del 70% para ganar el premio. ¡Vos podes!
                </p>
            `}

            <button onclick="restartQuiz()" class="btn-primary w-full py-3 rounded-xl font-bold shadow-lg">
                ${isVictory ? 'Jugar de nuevo' : 'Reintentar'}
            </button>
        </div>
    `;
}

function claimPrize() {
    shootConfetti();
    alert("¡Felicidades! Revisa el hipopotamo para saber tu premio 🎁");
}

function shootSideConfetti() {
    const end = Date.now() + 3000;

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFC0CB', '#FF1493']
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFC0CB', '#FF1493']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Logic
function startQuiz() {
    // Shuffle options for all questions
    questions.forEach(q => {
        shuffleArray(q.options);
    });

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    renderQuestion();
}

function restartQuiz() {
    startQuiz();
}

function selectOption(index) {
    const question = questions[currentQuestionIndex];
    const isCorrect = question.options[index].correct;

    // UI Feedback
    const selectedEl = document.getElementById(`option-${index}`);
    const allOptions = document.querySelectorAll('.option-card');

    // Disable clicks
    allOptions.forEach(el => el.style.pointerEvents = 'none');

    // Show correct/incorrect styles
    if (isCorrect) {
        selectedEl.classList.add('selected', 'correct');
        score++;
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.7 }
        });
    } else {
        selectedEl.classList.add('selected', 'incorrect');
        // Optional: Highlight correct answer
        const correctIndex = question.options.findIndex(opt => opt.correct);
        document.getElementById(`option-${correctIndex}`).classList.add('selected', 'correct');
    }

    // Next Question Delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            renderResults();
        }
    }, 1500); // 1.5s delay to see feedback
}

// Initialize
renderStartScreen();
