document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('href');
            document.querySelector(target).classList.add('active');
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const games = [
        { title: "Counter-Strike 2", image: "games/cs2.png" },
        { title: "Madden NFL 25", image: "games/maddennfl25.png" },
        { title: "Shadow of War", image: "games/shadowofwar.png" },
        { title: "Trepang2", image: "games/trepang2.png" },
        { title: "Ultrakill", image: "games/ultrakill.png" }
    ];

    const shows = [
        { title: "Breaking Bad", image: "shows/breakingbad.png", rank: 1 },
        { title: "Dexter", image: "shows/dexter.png", rank: 2 },
        { title: "The Rookie", image: "shows/rookie.png", rank: 3 },
        { title: "The Walking Dead", image: "shows/walkingdead.png", rank: 4 },
        { title: "The Big Bang Theory", image: "shows/bigbang.png", rank: 5 }
    ];

    const gamesGrid = document.querySelector('.games-grid');
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="game-info">
                <h3>${game.title}</h3>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
    });

    const showsGrid = document.querySelector('.shows-grid');
    shows.forEach(show => {
        const showCard = document.createElement('div');
        showCard.className = 'show-card';
        showCard.setAttribute('data-rank', show.rank);
        showCard.innerHTML = `
            <div class="rank-badge">#${show.rank}</div>
            <img src="${show.image}" alt="${show.title}">
            <div class="game-info">
                <h3>${show.title}</h3>
            </div>
        `;
        showsGrid.appendChild(showCard);
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animateParticles();

    function updateChicagoTime() {
        const options = {
            timeZone: 'America/Chicago',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', options);
        const isDayTime = now.getHours() >= 6 && now.getHours() < 18;
        document.getElementById('chicago-time').textContent = timeString;
        document.getElementById('time-emoji').textContent = isDayTime ? '☀️' : '🌙';
    }

    updateChicagoTime();
    setInterval(updateChicagoTime, 60000);
});

const songs = [
    "https://open.spotify.com/embed/track/52NGJPcLUzQq5w7uv4e5gf",
    "https://open.spotify.com/embed/track/1qMMYpVatbRITKCfq1gasi",
    "https://open.spotify.com/embed/track/50a8bKqlwDEqeiEknrzkTO",
    "https://open.spotify.com/embed/track/2eAZfqOm4EnOF9VvN50Tyc",
    "https://open.spotify.com/embed/track/3SAga35lAPYdjj3qyfEsCF",
    "https://open.spotify.com/embed/track/7sO5G9EABYOXQKNPNiE9NR",
    "https://open.spotify.com/embed/track/26XaOsDMbl0e1cVKYfkz6w",
    "https://open.spotify.com/embed/track/4jVBIpuOiMj1crqd8LoCrJ",
    "https://open.spotify.com/embed/track/3dl8bSF08LQfCf4T6CCksf",
    "https://open.spotify.com/embed/track/2WRn4AHv6hXK7914MExhze",
    "https://open.spotify.com/embed/track/15og0pCEcTFWEXOFKdcJlU",
    "https://open.spotify.com/embed/track/2WRn4AHv6hXK7914MExhze"
];

function loadRandomSong() {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    document.getElementById('random-song').src = `${randomSong}?utm_source=generator`;
}

document.addEventListener('DOMContentLoaded', loadRandomSong);