function startTypewriter(elementId, phrases, typeSpeed = 80, eraseSpeed = 40, delayBetween = 1500) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
        const current = phrases[phraseIndex];

        if (!isDeleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, delayBetween);
                return;
            }
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(tick, isDeleting ? eraseSpeed : typeSpeed);
    }

    tick();
}

document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    const raw = el.getAttribute('data-phrases') || '';
    const phrases = raw.split('||').map(s => s.trim()).filter(Boolean);
    if (phrases.length === 0) return;
    startTypewriter('typewriter-text', phrases);
});