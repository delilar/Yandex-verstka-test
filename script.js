document.addEventListener('DOMContentLoaded', function() {
    function setupCarousel(section) {
        const participantsContainer = section.querySelector('.participants-container');
        const participants = participantsContainer.querySelectorAll('.participant');
        const forwardButton = section.querySelector('.forward-switch');
        const backButton = section.querySelector('.back-switch');
        const countDisplay = section.querySelector('.count');

        const totalParticipants = participants.length;
        let visibleParticipants = section.classList.contains('desktop') ? 3 : 1;
        let currentIndex = 0;

        function updateVisibleParticipants() {
            if (section.classList.contains('desktop') && window.matchMedia('(min-width: 1336px)').matches) {
                visibleParticipants = 3;
            } else if (section.classList.contains('mobile') && window.matchMedia('(min-width: 375px)').matches) {
                visibleParticipants = 1;
            } else {
                visibleParticipants = 1;
            }
            updateCarousel();
        }

        function updateCarousel() {
            participants.forEach((participant, index) => {
                if (index >= currentIndex && index < currentIndex + visibleParticipants) {
                    participant.style.display = 'block';
                } else {
                    participant.style.display = 'none';
                }
            });

            const end = Math.min(currentIndex + visibleParticipants, totalParticipants);
            countDisplay.innerHTML = `${end} <span class="low-opacity">/ ${totalParticipants}</span>`;

            backButton.disabled = currentIndex === 0;
            forwardButton.disabled = currentIndex + visibleParticipants >= totalParticipants;
        }

        function moveForward() {
            if (currentIndex + visibleParticipants < totalParticipants) {
                currentIndex++;
                updateCarousel();
            }
        }

        function moveBackward() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        forwardButton.addEventListener('click', moveForward);
        backButton.addEventListener('click', moveBackward);

        window.addEventListener('resize', updateVisibleParticipants);

        setInterval(moveForward, 4000);

        updateVisibleParticipants();
    }

    const desktopSection = document.querySelector('.participants.desktop');
    const mobileSection = document.querySelector('.participants.mobile');

    setupCarousel(desktopSection);
    setupCarousel(mobileSection);
});





const backStepsSwitch = document.querySelector('.back-steps-switch');
const forwardStepsSwitch = document.querySelector('.forward-steps-switch');
const dots = Array.from(document.querySelector('.dots').children);
const cards = document.querySelector('.steps-container.mobile').querySelectorAll('.step')

let activeCard = 0;

function changeCard(activeCard) {
    activeCard === cards.length - 1 ? forwardStepsSwitch.disabled = true : forwardStepsSwitch.disabled = false;
    activeCard === 0 ? backStepsSwitch.disabled = true : backStepsSwitch.disabled = false;

    cards.forEach(card => {
        card.style.transform = `translateX(${activeCard * (-100)}%)`
    })

    dots.forEach((dot, dotIndex) => {
        if(dotIndex === activeCard) {
            dot.classList.add('active')
        }
        else {
            dot.classList.remove('active')
        }
    })
}

forwardStepsSwitch.addEventListener('click', () => {
    activeCard++;

    changeCard(activeCard);
})

backStepsSwitch.addEventListener('click', ()=> {
    activeCard--;
    changeCard(activeCard);
})

dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
        activeCard = dotIndex;
        dots.forEach((disableDot) => {
            disableDot.classList.remove('active')
        })
        

        dot.classList.add('active')

        changeCard(activeCard)
    })
})