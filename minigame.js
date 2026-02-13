// Minigame Logic
const KITTY_EMOJIS = {
    NORMAL: '🐱',
    HAPPY: '😻'
};

const SPAWN_INTERVAL_MIN = 3000;
const SPAWN_INTERVAL_MAX = 7000;
const STAY_DURATION = 3000;

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function spawnKitty() {
    const kitty = document.createElement('div');
    kitty.classList.add('kitty-container');
    kitty.innerText = KITTY_EMOJIS.NORMAL;

    // Random Position
    const isLeft = Math.random() > 0.5;
    const xPos = isLeft ? randomRange(5, 20) : randomRange(80, 95);
    kitty.style.left = `${xPos}%`;

    // Slight random rotation
    const rotation = randomRange(-20, 20);
    kitty.style.transform = `rotate(${rotation}deg)`;

    document.body.appendChild(kitty);

    // Animate In with small delay to allow DOM render
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            kitty.classList.add('show');
            kitty.style.transform = `translateY(-120px) rotate(${rotation}deg)`;
        });
    });

    // Interaction
    let isHappy = false;
    kitty.onclick = (e) => {
        if (isHappy) return;
        isHappy = true;

        kitty.innerText = KITTY_EMOJIS.HAPPY;
        kitty.style.transform = `translateY(-140px) scale(1.2) rotate(${rotation}deg)`; // Jump up a bit

        // Effects
        spawnHearts(e.clientX, e.clientY);
        shootConfettiOnKitty(e.clientX, e.clientY);

        // Remove faster
        setTimeout(() => {
            removeKitty(kitty);
        }, 1000);
    };

    // Auto Remove if not clicked
    setTimeout(() => {
        if (!isHappy && kitty.parentNode) {
            kitty.style.transform = `translateY(0) rotate(${rotation}deg)`; // Go back down
            setTimeout(() => {
                if (kitty.parentNode) removeKitty(kitty);
            }, 600); // Wait for transition
        }
    }, STAY_DURATION);
}

function removeKitty(element) {
    if (element.parentNode) {
        element.remove();
    }
    // Only schedule next if this was a natural removal, to avoid double scheduling if logic overlaps?
    // Actually, we should just schedule next whenever a kitty is removed, or just loop independently.
    // Better: schedule next immediately when this one is removed.
    scheduleNextKitty();
}

function scheduleNextKitty() {
    const delay = randomRange(SPAWN_INTERVAL_MIN, SPAWN_INTERVAL_MAX);
    setTimeout(spawnKitty, delay);
}

function spawnHearts(x, y) {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerText = '❤️';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        // Random scatter for particles
        heart.style.transform = `translate(${randomRange(-20, 20)}px, ${randomRange(-20, 20)}px)`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }
}

function shootConfettiOnKitty(x, y) {
    const xNorm = x / window.innerWidth;
    const yNorm = y / window.innerHeight;

    confetti({
        particleCount: 20,
        spread: 40,
        origin: { x: xNorm, y: yNorm },
        colors: ['#FFC0CB', '#FF1493'],
        shapes: ['star']
    });
}

// Start
scheduleNextKitty();
