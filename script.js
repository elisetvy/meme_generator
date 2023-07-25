const memeForm = document.getElementById('meme_form');

memeForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const imgURL = document.getElementById('img-url').value;
  const topText = document.getElementById('top-text').value;
  const bottomText = document.getElementById('bottom-text').value;

  if (imgURL && topText && bottomText) {
    createMeme(imgURL, topText, bottomText);
    memeForm.scrollIntoView({
      top: '100%',
      behavior: 'smooth'
    });
  } else {
    alert('Please enter a valid image URL and top and bottom text.');
  }

  memeForm.reset();
});

function createMeme(imgURL, topText, bottomText) {
  const memeContainer = document.getElementById('meme_container');

  const newMeme = document.createElement('div');
  newMeme.classList.add('new_meme');
  newMeme.style.position = 'relative';

  const memeImg = new Image();
  memeImg.src = imgURL;

  const memeTopText = document.createElement('div');
  memeTopText.textContent = topText;
  memeTopText.classList.add('meme_text');
  memeTopText.classList.add('top');
  const memeBottomText = document.createElement('div');
  memeBottomText.textContent = bottomText;
  memeBottomText.classList.add('meme_text');
  memeBottomText.classList.add('bottom');

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const speech = document.createElement('button');
  speech.textContent = 'Text To Speech';
  speech.addEventListener('click', function (event) {
    const speechToText = new SpeechSynthesisUtterance(topText + bottomText);
    speechToText.rate = 0.75;
    speechSynthesis.speak(speechToText);
  });
  speech.style.visibility = 'hidden';
  buttons.appendChild(speech);

  const remove = document.createElement('button');
  remove.textContent = 'X';
  remove.addEventListener('click', function (event) {
    memeContainer.removeChild(newMeme);
  });
  remove.style.visibility = 'hidden';
  buttons.appendChild(remove);

  newMeme.appendChild(memeImg);
  newMeme.appendChild(memeTopText);
  newMeme.appendChild(memeBottomText);
  newMeme.appendChild(buttons);

  newMeme.addEventListener('mouseover', function (event) {
    newMeme.style.background = 'black';
    memeImg.style.opacity = '25%';
    memeTopText.style.opacity = '25%';
    memeBottomText.style.opacity = '25%';
    speech.style.visibility = 'visible';
    remove.style.visibility = 'visible';
  });

  newMeme.addEventListener('mouseout', function (event) {
    newMeme.style.background = 'none';
    memeImg.style.opacity = '100%';
    memeTopText.style.opacity = '100%';
    memeBottomText.style.opacity = '100%';
    speech.style.visibility = 'hidden';
    remove.style.visibility = 'hidden';
  });

  memeContainer.prepend(newMeme);
}