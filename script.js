// مقداردهی اولیه وب‌اپ تلگرام
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#121315');
    tg.setBackgroundColor('#121315');
}

// ویبره هپتیک فیدبک برای حس بهتر در تلگرام
function triggerHaptic() {
    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

function openTopic(url) {
    triggerHaptic();
    if (tg?.openTelegramLink) {
        tg.openTelegramLink(url);
    } else {
        window.open(url, '_blank');
    }
}

function openExternal(url) {
    triggerHaptic();
    if (tg?.openLink) {
        tg.openLink(url);
    } else {
        window.open(url, '_blank');
    }
}

function toggleAccordion(btn, menuId) {
    triggerHaptic();
    const targetMenu = document.getElementById(menuId);
    const isOpen = btn.classList.contains('active');

    document.querySelectorAll('.btn-trigger.active').forEach(activeBtn => {
        activeBtn.classList.remove('active');
    });
    document.querySelectorAll('.submenu-content').forEach(menu => {
        menu.style.maxHeight = null;
    });

    if (!isOpen) {
        btn.classList.add('active');
        targetMenu.style.maxHeight = targetMenu.scrollHeight + "px";
    }
}

/* ============================================================
   مودال چارت دروس
   ============================================================ */
const CHART_SRC = 'chart.html';   // اگر نام فایل را عوض کردید، فقط اینجا تغییر دهید

function openChart() {
    triggerHaptic();
    const modal = document.getElementById('chartModal');
    const frame = document.getElementById('chartFrame');
    if (!modal || !frame) return;

    // همیشه مسیر را ست کن — مطمئن‌ترین راه
    if (frame.getAttribute('src') !== CHART_SRC) {
        frame.src = CHART_SRC;
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // دکمه بازگشت تلگرام (اختیاری ولی توصیه‌شده)
    if (tg?.BackButton) {
        tg.BackButton.show();
        tg.BackButton.onClick(closeChart);
    }
}

function closeChart() {
    triggerHaptic();
    const modal = document.getElementById('chartModal');
    if (!modal) return;

    modal.classList.remove('open');
    document.body.style.overflow = '';

    if (tg?.BackButton) {
        tg.BackButton.hide();
        tg.BackButton.offClick(closeChart);
    }
}
