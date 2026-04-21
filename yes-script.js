document.addEventListener('DOMContentLoaded', initPage)

function initPage() {
    const music = document.getElementById('bg-music')
    const musicToggle = document.getElementById('music-toggle')

    if (!music || !musicToggle) {
        return
    }

    const state = {
        musicPlaying: true,
        pendingAutoplayResume: false,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    musicToggle.addEventListener('click', () => toggleMusic(state, music, musicToggle))

    initializeMusic(state, music, musicToggle)

    if (!state.prefersReducedMotion) {
        launchConfetti()
    }
}

function initializeMusic(state, music, musicToggle) {
    music.autoplay = true
    music.defaultMuted = false
    music.muted = false
    music.volume = 0.3

    tryStartMusic(state, music, musicToggle, { optimistic: true })

    const resumeOnFirstInteraction = () => {
        if (state.pendingAutoplayResume) {
            tryStartMusic(state, music, musicToggle, { optimistic: true })
        }
    }

    document.addEventListener('pointerdown', resumeOnFirstInteraction, { once: true })
    document.addEventListener('keydown', resumeOnFirstInteraction, { once: true })
}

function tryStartMusic(state, music, musicToggle, options = {}) {
    music.play().then(() => {
        state.musicPlaying = true
        state.pendingAutoplayResume = false
        updateMusicToggle(musicToggle, true)
    }).catch(() => {
        state.musicPlaying = options.optimistic ? true : false
        state.pendingAutoplayResume = Boolean(options.optimistic)
        updateMusicToggle(musicToggle, state.musicPlaying)
    })
}

function updateMusicToggle(musicToggle, isPlaying) {
    musicToggle.textContent = isPlaying ? '🔊' : '🔇'
    musicToggle.setAttribute('aria-label', isPlaying ? 'Silenciar música' : 'Activar música')
    musicToggle.setAttribute('aria-pressed', String(isPlaying))
    musicToggle.title = isPlaying ? 'Silenciar música' : 'Activar música'
}

function toggleMusic(state, music, musicToggle) {
    if (state.musicPlaying) {
        music.pause()
        state.musicPlaying = false
        state.pendingAutoplayResume = false
        updateMusicToggle(musicToggle, false)
        return
    }

    tryStartMusic(state, music, musicToggle)
}

function launchConfetti() {
    if (typeof confetti !== 'function') {
        return
    }

    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}
