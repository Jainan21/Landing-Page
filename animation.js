
document.addEventListener('DOMContentLoaded', () => {
    const popularRow = document.getElementById('popular');
    const trendingRow = document.getElementById('trending');
    const originalsRow = document.getElementById('originals');

    const shuffledMovies = [...movies].sort(() => 0.5 - Math.random());

    popularRow.innerHTML = movies.slice(0, 6).map(createMovieCard).join('');
    trendingRow.innerHTML = shuffledMovies.slice(0, 6).map(createMovieCard).join('');
    originalsRow.innerHTML = shuffledMovies.slice(6).map(createMovieCard).join('');

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
});

const content = document.getElementById('c1');
document.getElementById("click").addEventListener('click', () => {
    setTimeout(() => {
        content.style.display = 'block';
        requestAnimationFrame(() => {
            content.classList.add('show');
        });
    }, 500);
})