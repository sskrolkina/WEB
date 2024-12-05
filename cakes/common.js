(function () {
    window.addEventListener("load", () => {
        const footer = document.querySelector('.footer');
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const stats = document.createElement('p');
        stats.textContent = `Страница загружена за ${loadTime} мс.`;
        footer.appendChild(stats);
    });
})();
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('mouseenter', () => link.classList.add('hovered'));
    link.addEventListener('mouseleave', () => link.classList.remove('hovered'));
});
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const currentPage = document.location.pathname.split("/").pop();
        document.querySelectorAll(".nav__link").forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    });
})();
