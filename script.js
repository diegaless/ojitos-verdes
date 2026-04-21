const gifStages = [
    'assets/gifs/stage-0-normal.gif',
    'assets/gifs/stage-1-confused.gif',
    'assets/gifs/stage-2-pleading.gif',
    'assets/gifs/stage-3-sad.gif',
    'assets/gifs/stage-4-sadder.gif',
    'assets/gifs/stage-5-devastated.gif',
    'assets/gifs/stage-6-very-devastated.gif',
    'assets/gifs/stage-7-crying-runaway.gif'
]

const noMessages = [
    'No',
    '¿Estás seguro/a? 🤔',
    'Por favor, cariño... 🥺',
    'Si dices que no, me pondré muy triste ojitos...',
    'Estaré muy triste... 😢',
    '¿Por favor??? 💔',
    'No me hagas esto ojitos...',
    '¡Última oportunidad! 😭',
    'De todas formas no puedes pillarme 😜'
]

const yesTeasePokes = [
    'prueba a decir que no primero... apuesto a que quieres saber qué pasa 😏',
    'venga, pulsa no... solo una vez 👀',
    'te lo estás perdiendo 😈',
    'haz clic en no, te reto 😏'
]

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {
    const elements = {
        catGif: document.getElementById('cat-gif'),
        yesBtn: document.getElementById('yes-btn'),
        noBtn: document.getElementById('no-btn'),
        music: document.getElementById('bg-music'),
        musicToggle: document.getElementById('music-toggle'),
        teaseToast: document.getElementById('tease-toast')
    }

    if (!elements.catGif || !elements.yesBtn || !elements.noBtn || !elements.music || !elements.musicToggle || !elements.teaseToast) {
        return
    }

    const state = {
        yesTeasedCount: 0,
        noClickCount: 0,
        runawayEnabled: false,
        musicPlaying: true,
        teaseToastTimerId: null
    }

    elements.yesBtn.addEventListener('click', () => handleYesClick(state, elements))
    elements.noBtn.addEventListener('click', () => handleNoClick(state, elements))
    elements.musicToggle.addEventListener('click', () => toggleMusic(state, elements))

    initializeMusic(state, elements)
}

function initializeMusic(state, elements) {
    const { music, musicToggle } = elements

    music.muted = true
    music.volume = 0.3

    music.play().then(() => {
        music.muted = false
        state.musicPlaying = true
        updateMusicToggle(musicToggle, true)
    }).catch(() => {
        state.musicPlaying = false
        updateMusicToggle(musicToggle, false)

        document.addEventListener('click', () => {
            music.muted = false
            music.play().then(() => {
                state.musicPlaying = true
                updateMusicToggle(musicToggle, true)
            }).catch(() => {})
        }, { once: true })
    })
}

function updateMusicToggle(musicToggle, isPlaying) {
    musicToggle.textContent = isPlaying ? '🔊' : '🔇'
    musicToggle.setAttribute('aria-label', isPlaying ? 'Silenciar música' : 'Activar música')
    musicToggle.setAttribute('aria-pressed', String(isPlaying))
    musicToggle.title = isPlaying ? 'Silenciar música' : 'Activar música'
}

function toggleMusic(state, elements) {
    const { music, musicToggle } = elements

    if (state.musicPlaying) {
        music.pause()
        state.musicPlaying = false
        updateMusicToggle(musicToggle, false)
        return
    }

    music.muted = false
    music.play().then(() => {
        state.musicPlaying = true
        updateMusicToggle(musicToggle, true)
    }).catch(() => {
        state.musicPlaying = false
        updateMusicToggle(musicToggle, false)
    })
}

function handleYesClick(state, elements) {
    if (!state.runawayEnabled) {
        const msg = yesTeasePokes[Math.min(state.yesTeasedCount, yesTeasePokes.length - 1)]
        state.yesTeasedCount += 1
        showTeaseMessage(state, elements.teaseToast, msg)
        return
    }

    window.location.href = 'yes.html'
}

function showTeaseMessage(state, teaseToast, msg) {
    teaseToast.textContent = msg
    teaseToast.classList.add('show')

    clearTimeout(state.teaseToastTimerId)
    state.teaseToastTimerId = setTimeout(() => {
        teaseToast.classList.remove('show')
    }, 2500)
}

function handleNoClick(state, elements) {
    const { catGif, noBtn, yesBtn } = elements

    state.noClickCount += 1

    const msgIndex = Math.min(state.noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    growYesButton(yesBtn, state.noClickCount)

    if (state.noClickCount >= 2) {
        shrinkNoButton(noBtn)
    }

    const gifIndex = Math.min(state.noClickCount, gifStages.length - 1)
    swapGif(catGif, gifStages[gifIndex])

    if (state.noClickCount >= 5 && !state.runawayEnabled) {
        enableRunaway(noBtn)
        state.runawayEnabled = true
    }
}

function growYesButton(yesBtn, noClickCount) {
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)

    yesBtn.style.setProperty('--yes-font-size', `${currentSize * 1.35}px`)
    yesBtn.style.setProperty('--yes-pad-y', `${padY}px`)
    yesBtn.style.setProperty('--yes-pad-x', `${padX}px`)
}

function shrinkNoButton(noBtn) {
    const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
    noBtn.style.setProperty('--no-font-size', `${Math.max(noSize * 0.85, 10)}px`)
}

function swapGif(catGif, src) {
    catGif.style.opacity = '0'

    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway(noBtn) {
    noBtn.addEventListener('mouseover', () => runAway(noBtn))
    noBtn.addEventListener('touchstart', () => runAway(noBtn), { passive: true })
}

function runAway(noBtn) {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = Math.max(window.innerWidth - btnW - margin, margin)
    const maxY = Math.max(window.innerHeight - btnH - margin, margin)

    const randomX = Math.random() * (maxX - margin) + margin / 2
    const randomY = Math.random() * (maxY - margin) + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
