import './style.css';

const player = document.querySelector('.name');
const scoreValue = document.querySelector('.score');
const submitButton = document.querySelector('.submit');
const scoreList = document.querySelector('.score_list');
const refreshButton = document.querySelector('.refresh');
const notificationMsg = document.getElementById('notify');

const submission = async (user, score) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/GTxSCoGwWNR7KyHpsIUK/scores', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Davis Game',
      user,
      score,
    }),
    headers: {
      'content-type': 'application/json; charset= UTF-8',
    },
  });
  const jsonresponse = await response.json();
  return jsonresponse;
};

const refreshing = async () => {
  notificationMsg.textContent = 'retriving data from API';
  notificationMsg.classList.add('active');
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/GTxSCoGwWNR7KyHpsIUK/scores', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const jsonresponse = await response.json();
  return jsonresponse.result;
};

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  await submission(player.value, scoreValue.value);
  player.value = '';
  scoreValue.value = '';
});

refreshButton.addEventListener('click', async (e) => {
  e.preventDefault();
  let response = await refreshing();
  response = response.sort((a, b) => b.score - a.score);
  response.forEach((element) => {
    scoreList.innerHTML += `<li class='scores_li'>${element.user}: ${element.score}</li>`;
  });
});
