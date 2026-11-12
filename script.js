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

    // بستن تمام کشوهای دیگر (حالت آکاردئونی یکپارچه)
    document.querySelectorAll('.btn-trigger.active').forEach(activeBtn => {
        activeBtn.classList.remove('active');
    });
    document.querySelectorAll('.submenu-content').forEach(menu => {
        menu.style.maxHeight = null;
    });

    // اگر منوی فعلی بسته بود، آن را باز کن
    if (!isOpen) {
        btn.classList.add('active');
        targetMenu.style.maxHeight = targetMenu.scrollHeight + "px";
    }
}

function openChart() {
    const modal = document.getElementById('chartModal');
    const frame = document.getElementById('chartFrame');
    // مسیر نسبی فایل چارت — اگر نام فایل را انگلیسی کردید اینجا هم تغییر دهید
    if (!frame.src) frame.src = 'چارت عمران.html';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeChart() {
    document.getElementById('chartModal').classList.remove('open');
    document.body.style.overflow = '';
}
