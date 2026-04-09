function createConfetti(count = 25) {
    const container = document.getElementById('confetti');
    const colors = ['#ff4d6d', '#45b7d1', '#f9ca24', '#6c5ce7', '#a55eea', '#4ecdc4'];
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-30px';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = Math.random() * 12 + 7 + 'px';
        piece.style.height = piece.style.width;
        piece.style.opacity = Math.random() * 0.8 + 0.4;
        piece.style.animationDuration = (Math.random() * 6 + 4.5) + 's';
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 10000);
    }
}

setInterval(() => {
    if (Math.random() > 0.4) createConfetti(15);
}, 500);

function addToCalendar() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//OCAD University//Research Talks//EN
BEGIN:VEVENT
UID:ocad-research-talks-20260324@ocadu.ca
DTSTAMP:20260324T000000Z
DTSTART:20260324T153000
DTEND:20260324T163000
SUMMARY:OCAD University Research Talks
LOCATION:100 McCaul Street, Room 543, Toronto, ON
DESCRIPTION:Join us for fascinating research talks with Faculty of Arts & Science!\\nSpeakers:\\n• Vanessa Dion Fletcher - BIG Doll || Xwat Naaniitus\\n• Kelsey Pugh - Reconstructing Ancient Faces\\n• Anna Stielau - Arts of Darkness: Rethinking Photography from South Africa\\nFree event at OCAD University.
STATUS:CONFIRMED
CATEGORIES:Research,Arts,OCAD University
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'OCAD_Research_Talks_2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    createConfetti(50);
}

function submitRSVP() {
    const emailInput = document.getElementById('emailInput');
    const overlay = document.getElementById('success-overlay');

    if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        alert("Please enter a valid email address!");
        return;
    }

    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('show'), 10);
    createConfetti(80);

    setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.style.display = 'none';
            emailInput.value = '';
        }, 600);
    }, 3500);
}

const speakers = [
    {
        name: "Vanessa Dion Fletcher",
        topic: "BIG Doll || Xwat Naaniitus",
        desc: "BIG Doll || Xwat Naaniitus is an exhibition that shows the process of making and creating from the heart, not the head. This exhibition is both profoundly personal and collaborative, open to audiences of all ages to participate in the design of an artwork. Vanessa will share the research, process, and audience programming that supports this solo exhibition at Art Windsor Essex (November 20, 2025 – May 24, 2026).",
        bio: "Vanessa Dion Fletcher is a Lenape and Potawatomi neurodiverse Artist. Her family is from Eelūnaapèewii Lahkèewiitt (displaced from Lenapehoking) and European settlers. She employs porcupine quills, Wampum belts, and menstrual blood to reveal the complexities of what defines a body physically and culturally. Reflecting on an Indigenous and gendered body with a neurodiverse mind, Dion Fletcher creates art using composite media, primarily working in performance, textiles and video. She graduated from The School of the Art Institute of Chicago in 2016 with an MFA and from York University in 2009 with a BFA. She has exhibited across Canada and the USA at Art Mur Montreal, Eastern Edge Gallery Newfoundland, The Queer Arts Festival Vancouver and the Satellite Art show in Miami. Her work is in the Indigenous Art Centre, Joan Flasch Artist Book Collection, Vtape, Seneca College, and the Archives of American Art."
    },
    {
        name: "Kelsey Pugh",
        topic: "Reconstructing Ancient Faces",
        desc: "Relatively complete fossils of hominoids (apes and humans) are rare discoveries, and those that are known have often been subject to taphonomic processes that distort and damage features. Damage complicates interpretations by paleoanthropologists but can sometimes be corrected through reconstruction. The virtual reconstruction of the 12-million-year-old ape Pierolapithecus will be used as an example of the utility of these methods, as well as some new research on old faces.",
        bio: "Kelsey Pugh is a paleoanthropologist studying ape and human evolution from the fossil record. She uses a range of methods including comparative anatomy, phylogenetics, and 3D geometric morphometrics in her research to address questions such as “what is the nature of the last common ancestor of apes and humans?”. She graduated from the City University of New York in 2020 with a PhD in Biological Anthropology."
    },
    {
        name: "Anna Stielau",
        topic: "Arts of Darkness: Rethinking Photography from South Africa",
        desc: "Photography is an infrastructural art. It needs light, power, and water. But in South Africa, where rolling blackouts and water shortages are routine, those resources can’t be taken for granted. Anna will share new work exploring how artists are working within - and thinking through - these constraints, redirecting attention from images to the underlying systems that make them possible.",
        bio: "Anna Stielau is an assistant professor of art history and visual culture at OCAD University. She received her PhD from NYU’s Department of Media, Culture, and Communication, and previously served as the Weisman Postdoctoral Teaching Fellow in Visual Culture at Caltech. Her research explores how contemporary African artists use media and technology to imagine the world, otherwise."
    }
];

function renderSpeakers() {
    const namesContainer = document.getElementById('speakerNames');
    const detailsContainer = document.getElementById('detailsContainer');
    namesContainer.innerHTML = '';
    detailsContainer.innerHTML = '';

    speakers.forEach((speaker, index) => {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'speaker-name';
        nameDiv.textContent = speaker.name;
        nameDiv.dataset.index = index;
        namesContainer.appendChild(nameDiv);

        const detailDiv = document.createElement('div');
        detailDiv.className = 'speaker-detail';
        detailDiv.id = `detail-${index}`;
        detailDiv.innerHTML = `
            <h3>${speaker.name}</h3>
            <p class="topic">${speaker.topic}</p>
            <hr class="divider">
            <p><strong>Talk Description:</strong> ${speaker.desc}</p>
            <div class="section-title">Biography</div>
            <hr class="divider">
            <p>${speaker.bio}</p>
        `;
        detailsContainer.appendChild(detailDiv);
    });

    document.querySelectorAll('.speaker-name').forEach(name => {
        function showDetail() {
            const idx = this.dataset.index;
            document.querySelectorAll('.speaker-detail').forEach(d => d.classList.remove('active'));
            document.getElementById(`detail-${idx}`).classList.add('active');
        }
        name.addEventListener('mouseenter', showDetail);
        name.addEventListener('click', showDetail);
    });
}

function splitIntoLetters(element) {
    const originalText = element.textContent;
    element.innerHTML = '';
    originalText.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = char === ' ' ? '\u00A0' : char;
        element.appendChild(span);
    });
}

function addDuckweedEffect(element) {
    const letters = Array.from(element.querySelectorAll('.letter'));
    let timeout;
    element.addEventListener('mousemove', (e) => {
        clearTimeout(timeout);
        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        letters.forEach(letter => {
            const letterRect = letter.getBoundingClientRect();
            const letterX = letterRect.left + letterRect.width / 2 - rect.left;
            const letterY = letterRect.top + letterRect.height / 2 - rect.top;
            const dx = letterX - mouseX;
            const dy = letterY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxRadius = 140;
            const maxPush = 22;
            if (distance < maxRadius && distance > 0) {
                const force = (maxRadius - distance) / maxRadius;
                const tx = (dx / distance) * force * maxPush;
                const ty = (dy / distance) * force * maxPush;
                const rot = force * (Math.random() * 8 - 4);
                letter.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
            } else {
                letter.style.transform = 'translate(0, 0) rotate(0deg)';
            }
        });
    });
    element.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            letters.forEach(letter => {
                letter.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                letter.style.transform = 'translate(0, 0) rotate(0deg)';
            });
        }, 50);
    });
}

function goBack() {
    document.getElementById('info-page').style.display = 'none';
    document.getElementById('welcome').style.display = 'flex';
    document.getElementById('welcome').style.opacity = '1';
    document.getElementById('nameInput').focus();
}

const welcomeScreen = document.getElementById('welcome');
const nameInput = document.getElementById('nameInput');
let shakeTimeout;

nameInput.addEventListener('input', () => {
    welcomeScreen.classList.add('shake');
    clearTimeout(shakeTimeout);
    shakeTimeout = setTimeout(() => welcomeScreen.classList.remove('shake'), 600);
    if (Math.random() > 0.5) createConfetti(8);
});

const infoPage = document.getElementById('info-page');
const userNameSpan = document.getElementById('userName');
const speakersHeader = document.getElementById('speakersHeader');
const greetingH2 = document.getElementById('greetingH2');
const greetingP = document.getElementById('greetingP');

nameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
        const name = this.value.trim();
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            infoPage.style.display = 'block';
            userNameSpan.textContent = name;
            splitIntoLetters(greetingH2);
            splitIntoLetters(greetingP);
            addDuckweedEffect(greetingH2);
            addDuckweedEffect(greetingP);
            createConfetti(60);
        }, 700);
    }
});

speakersHeader.addEventListener('click', () => {
    const namesContainer = document.getElementById('speakerNames');
    if (namesContainer.style.display === 'none') {
        renderSpeakers();
        namesContainer.style.display = 'flex';
        createConfetti(40);
    }
});

window.onload = () => {
    const welcomeTitle = document.getElementById('welcomeTitle');
    const welcomeSubtitle = document.getElementById('welcomeSubtitle');
    splitIntoLetters(welcomeTitle);
    splitIntoLetters(welcomeSubtitle);
    addDuckweedEffect(welcomeTitle);
    addDuckweedEffect(welcomeSubtitle);
    createConfetti(35);
};
