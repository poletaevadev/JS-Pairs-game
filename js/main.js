(() => {
  let interval = null;

  function createAppTitle(title) {
    const appTitle = document.createElement('h1');
    appTitle.innerHTML = title;
    appTitle.classList.add('header__title');
    return appTitle;
  }

  function createAppForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const formBtn = document.createElement('button');

    form.classList.add('game-form');

    input.classList.add('game-input');
    input.type = 'number';
    input.step = 2;
    input.placeholder = 'Please enter an even number from 2 to 10';

    formBtn.classList.add('game-form-btn', 'btn-reset');
    formBtn.textContent = 'Start';

    form.append(input, formBtn);

    return {
      form,
      input,
      formBtn
    }
  }

  function createGame() {
    const header = document.querySelector('.header');
    const gameSection = document.querySelector('.game-section__container');
    const gameTitle = createAppTitle('Pairs Game');
    const appForm = createAppForm();
    const confetti = document.querySelector('.confetti');

    header.innerHTML = '';
    gameSection.innerHTML = '';
    gameSection.classList.remove('fade-in');
    confetti.innerHTML = '';
    appForm.form.classList.add('fade-in');
    timerObj.timerConteiner.classList.remove('fade-in');
    timerObj.timerConteiner.textContent = '';
    timerObj.timerConteiner.append(
      timerObj.minutesSpan,
      timerObj.border,
      timerObj.secondsSpan
    );

    header.append(gameTitle);
    gameSection.append(appForm.form);

    appForm.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputValue = appForm.input.value;
      const validNumber = checkOnValidation(inputValue);

      function checkOnValidation(numb) {
        if (numb > 1 && numb < 11) {
          if (!(numb % 2)) {
            return numb;
          }
        }
        return null;
      }

      if (!validNumber) {
        appForm.input.value = '4';
      } else {
        appForm.input.value = '';
        appForm.form.classList.remove('fade-in');
        startGame(Math.pow(validNumber, 2));
      }
    });
  }

  function createTimerContainer() {
    const timerConteiner = document.createElement('div');
    const minutesSpan = document.createElement('span');
    const secondsSpan = document.createElement('span');
    const border = document.createElement('span');

    timerConteiner.classList.add('game-timer');
    border.textContent = ' : ';
    timerConteiner.append(minutesSpan, border, secondsSpan);

    return {
      timerConteiner,
      minutesSpan,
      border,
      secondsSpan
    }
  }

  const timerObj = createTimerContainer();

  function startTimer(value) {
    clearInterval(interval);

    const timer = Math.sqrt(value) * 15000;
    let seconds = Math.floor((timer / 1000) % 60);
    let minutes = Math.floor((timer / 1000 / 60) % 60);

    timerObj.minutesSpan.textContent = ('0' + minutes).slice(-2);
    timerObj.secondsSpan.textContent = ('0' + seconds).slice(-2);

    interval = setInterval(startTime, 1000);

    function startTime() {
      if (seconds == 0 && minutes != 0) {
        minutes--;
        seconds = ('0' + 59).slice(-2);
      }
      else if (seconds <= 0 && minutes == 0) {
        clearInterval(interval);
        alert('Game over');
        window.location.reload();
      } else {
        seconds--
      }
      timerObj.minutesSpan.textContent = ('0' + minutes).slice(-2);
      timerObj.secondsSpan.textContent = ('0' + seconds).slice(-2);
    }
  }

  function createGameCard(defaultIcon, flippedCardIcon)  {
    const card = document.createElement('div');
    card.classList.add('game-card');

    const notFlippedCardI = document.createElement('i');
    const flippedCardI = document.createElement('i');

    notFlippedCardI.classList.add('fa-solid', `fa-${defaultIcon}`);
    flippedCardI.classList.add('fa-solid', `fa-${flippedCardIcon}`);

    card.append(flippedCardI, notFlippedCardI);

    return card;
  }

  function shuffleCards(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const duplicateCards = (array) => array.reduce((res, current) => res.concat([current, current]), []);

  function createCardsIcons(initialCount)  {
    const cardsIcons = [
      'heart',
      'star',
      'cloud',
      'face-smile',
      'ghost',
      'umbrella',
      'gift',
      'bomb',
      'umbrella',
      'droplet',
      'fire',
      'eye',
      'plane',
      'globe',
      'city',
      'tree',
      'anchor',
      'bicycle',
      'brush',
      'music',
      'gamepad',
      'sun',
      'feather',
      'fish',
      'bug',
      'kiwi-bird',
      'water',
      'marker',
      'virus',
      'landmark',
      'cube',
      'mountain-sun',
      'snowflake',
      'child',
      'mask',
      'clock',
      'rocket',
      'vihara',
      'laptop',
      'dollar-sign',
      'brain',
      'leaf',
      'yin-yang',
      'wine-glass',
      'award',
      'palette',
      'motorcycle',
      'seedling',
      'trophy',
      'crown'
    ];

    switch (initialCount) {
      case initialCount:
        return cardsIcons.slice(0, initialCount / 2);
      default:
        break;
    }
  }

  function startGame(difficult) {
    let firstCard = null;
    let secondCard = null;
    let clickable = true;

    const gameSection = document.querySelector('.game-section__container');
    const gameTable = document.createElement('div');
    const cardsIcons = createCardsIcons(difficult);
    const duplicatedCardsIcons = duplicateCards(cardsIcons);
    const restartBtn = document.createElement('button');

    gameSection.innerHTML = '';
    restartBtn.textContent = 'Restart';
    gameSection.classList.add('fade-in');
    gameTable.classList.add('game-table');
    restartBtn.classList.add('restart-btn', 'btn-reset');

    shuffleCards(duplicatedCardsIcons);

    duplicatedCardsIcons.forEach(icon => gameTable.append(createGameCard('circle-question', icon)));

    gameSection.append(timerObj.timerConteiner, gameTable, restartBtn);

    startTimer(difficult);

    restartBtn.addEventListener('click', createGame);

    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card, index) => {
      card.style.width = 100 / Math.sqrt(difficult) - 2 + '%';
      card.addEventListener('click', () => {

        if (clickable == true && !card.classList.contains('successfully')) {
          card.classList.add('flip');

          if (firstCard == null) {
            firstCard = index;
          } else {
            if (index != firstCard) {
              secondCard = index;
              clickable = false;
            }
          }

          if (firstCard != null && secondCard != null && firstCard != secondCard) {
            if (
              cards[firstCard].firstElementChild.className ===
              cards[secondCard].firstElementChild.className
            ) {
              setTimeout(() => {
                cards[firstCard].classList.add('successfully');
                cards[secondCard].classList.add('successfully');

                firstCard = null;
                secondCard = null;
                clickable = true;
              }, 500);
            } else {
              setTimeout(() => {
                cards[firstCard].classList.remove('flip');
                cards[secondCard].classList.remove('flip');

                firstCard = null;
                secondCard = null;
                clickable = true;
              }, 500);
            }
          }

          if (Array.from(cards).every(card => card.className.includes('flip'))) {
            document.querySelector('.confetti').innerHTML = confetti;
            timerObj.timerConteiner.classList.add('fade-in');
            timerObj.timerConteiner.textContent = 'Congratulations!';
          }
        }
      });
    });
  }

  const confetti = `
    <div class="confetti-149"></div>
    <div class="confetti-148"></div>
    <div class="confetti-147"></div>
    <div class="confetti-146"></div>
    <div class="confetti-145"></div>
    <div class="confetti-144"></div>
    <div class="confetti-143"></div>
    <div class="confetti-142"></div>
    <div class="confetti-141"></div>
    <div class="confetti-140"></div>
    <div class="confetti-139"></div>
    <div class="confetti-138"></div>
    <div class="confetti-137"></div>
    <div class="confetti-136"></div>
    <div class="confetti-135"></div>
    <div class="confetti-134"></div>
    <div class="confetti-133"></div>
    <div class="confetti-132"></div>
    <div class="confetti-131"></div>
    <div class="confetti-130"></div>
    <div class="confetti-129"></div>
    <div class="confetti-128"></div>
    <div class="confetti-127"></div>
    <div class="confetti-126"></div>
    <div class="confetti-125"></div>
    <div class="confetti-124"></div>
    <div class="confetti-123"></div>
    <div class="confetti-122"></div>
    <div class="confetti-121"></div>
    <div class="confetti-120"></div>
    <div class="confetti-119"></div>
    <div class="confetti-118"></div>
    <div class="confetti-117"></div>
    <div class="confetti-116"></div>
    <div class="confetti-115"></div>
    <div class="confetti-114"></div>
    <div class="confetti-113"></div>
    <div class="confetti-112"></div>
    <div class="confetti-111"></div>
    <div class="confetti-110"></div>
    <div class="confetti-109"></div>
    <div class="confetti-108"></div>
    <div class="confetti-107"></div>
    <div class="confetti-106"></div>
    <div class="confetti-105"></div>
    <div class="confetti-104"></div>
    <div class="confetti-103"></div>
    <div class="confetti-102"></div>
    <div class="confetti-101"></div>
    <div class="confetti-100"></div>
    <div class="confetti-99"></div>
    <div class="confetti-98"></div>
    <div class="confetti-97"></div>
    <div class="confetti-96"></div>
    <div class="confetti-95"></div>
    <div class="confetti-94"></div>
    <div class="confetti-93"></div>
    <div class="confetti-92"></div>
    <div class="confetti-91"></div>
    <div class="confetti-90"></div>
    <div class="confetti-89"></div>
    <div class="confetti-88"></div>
    <div class="confetti-87"></div>
    <div class="confetti-86"></div>
    <div class="confetti-85"></div>
    <div class="confetti-84"></div>
    <div class="confetti-83"></div>
    <div class="confetti-82"></div>
    <div class="confetti-81"></div>
    <div class="confetti-80"></div>
    <div class="confetti-79"></div>
    <div class="confetti-78"></div>
    <div class="confetti-77"></div>
    <div class="confetti-76"></div>
    <div class="confetti-75"></div>
    <div class="confetti-74"></div>
    <div class="confetti-73"></div>
    <div class="confetti-72"></div>
    <div class="confetti-71"></div>
    <div class="confetti-70"></div>
    <div class="confetti-69"></div>
    <div class="confetti-68"></div>
    <div class="confetti-67"></div>
    <div class="confetti-66"></div>
    <div class="confetti-65"></div>
    <div class="confetti-64"></div>
    <div class="confetti-63"></div>
    <div class="confetti-62"></div>
    <div class="confetti-61"></div>
    <div class="confetti-60"></div>
    <div class="confetti-59"></div>
    <div class="confetti-58"></div>
    <div class="confetti-57"></div>
    <div class="confetti-56"></div>
    <div class="confetti-55"></div>
    <div class="confetti-54"></div>
    <div class="confetti-53"></div>
    <div class="confetti-52"></div>
    <div class="confetti-51"></div>
    <div class="confetti-50"></div>
    <div class="confetti-49"></div>
    <div class="confetti-48"></div>
    <div class="confetti-47"></div>
    <div class="confetti-46"></div>
    <div class="confetti-45"></div>
    <div class="confetti-44"></div>
    <div class="confetti-43"></div>
    <div class="confetti-42"></div>
    <div class="confetti-41"></div>
    <div class="confetti-40"></div>
    <div class="confetti-39"></div>
    <div class="confetti-38"></div>
    <div class="confetti-37"></div>
    <div class="confetti-36"></div>
    <div class="confetti-35"></div>
    <div class="confetti-34"></div>
    <div class="confetti-33"></div>
    <div class="confetti-32"></div>
    <div class="confetti-31"></div>
    <div class="confetti-30"></div>
    <div class="confetti-29"></div>
    <div class="confetti-28"></div>
    <div class="confetti-27"></div>
    <div class="confetti-26"></div>
    <div class="confetti-25"></div>
    <div class="confetti-24"></div>
    <div class="confetti-23"></div>
    <div class="confetti-22"></div>
    <div class="confetti-21"></div>
    <div class="confetti-20"></div>
    <div class="confetti-19"></div>
    <div class="confetti-18"></div>
    <div class="confetti-17"></div>
    <div class="confetti-16"></div>
    <div class="confetti-15"></div>
    <div class="confetti-14"></div>
    <div class="confetti-13"></div>
    <div class="confetti-12"></div>
    <div class="confetti-11"></div>
    <div class="confetti-10"></div>
    <div class="confetti-9"></div>
    <div class="confetti-8"></div>
    <div class="confetti-7"></div>
    <div class="confetti-6"></div>
    <div class="confetti-5"></div>
    <div class="confetti-4"></div>
    <div class="confetti-3"></div>
    <div class="confetti-2"></div>
    <div class="confetti-1"></div>
    <div class="confetti-0"></div>`;


  document.addEventListener('DOMContentLoaded', () => {
    createGame();
  });

})();


