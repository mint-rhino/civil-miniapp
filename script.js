const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    if (typeof tg.setHeaderColor === 'function') {
        tg.setHeaderColor('#121315');
    }
    if (typeof tg.setBackgroundColor === 'function') {
        tg.setBackgroundColor('#121315');
    }
}

function triggerHaptic(style = 'light') {
    if (tg?.HapticFeedback?.impactOccurred) {
        tg.HapticFeedback.impactOccurred(style);
    }
}

function openTopic(url) {
    triggerHaptic('light');
    if (tg?.openTelegramLink) {
        tg.openTelegramLink(url);
    } else {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

function openExternal(url) {
    triggerHaptic('light');
    if (tg?.openLink) {
        tg.openLink(url);
    } else {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

function navigateTo(page) {
    triggerHaptic('light');
    window.location.href = page;
}

function toggleAccordion(btn, menuId) {
    triggerHaptic('light');
    const targetMenu = document.getElementById(menuId);
    if (!targetMenu) return;

    const isOpen = btn.classList.contains('active');

    document.querySelectorAll('.btn-trigger.active').forEach((activeBtn) => {
        if (activeBtn !== btn) {
            activeBtn.classList.remove('active');
            activeBtn.setAttribute('aria-expanded', 'false');
        }
    });

    document.querySelectorAll('.submenu-content.open').forEach((menu) => {
        if (menu !== targetMenu) {
            menu.classList.remove('open');
        }
    });

    btn.classList.toggle('active', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    targetMenu.classList.toggle('open', !isOpen);
}

/* ============================================================
   مودال چارت دروس
   ============================================================ */
const CHART_SRC = 'chart.html';
let isChartBackHandlerBound = false;

function handleChartBackButton() {
    closeChart();
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeChart();
    }
}

function openChart() {
    triggerHaptic('light');
    const modal = document.getElementById('chartModal');
    const frame = document.getElementById('chartFrame');
    if (!modal || !frame) return;

    if (frame.getAttribute('src') !== CHART_SRC) {
        frame.src = CHART_SRC;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscapeKey);

    if (tg?.BackButton) {
        tg.BackButton.show();
        if (!isChartBackHandlerBound) {
            tg.BackButton.onClick(handleChartBackButton);
            isChartBackHandlerBound = true;
        }
    }
}

function closeChart() {
    triggerHaptic('light');
    const modal = document.getElementById('chartModal');
    if (!modal || !modal.classList.contains('open')) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscapeKey);

    if (tg?.BackButton) {
        tg.BackButton.hide();
        if (isChartBackHandlerBound) {
            tg.BackButton.offClick(handleChartBackButton);
            isChartBackHandlerBound = false;
        }
    }
}
