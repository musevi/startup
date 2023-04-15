
(async () => {
  username = localStorage.getItem('userName');
  const url = `/api/goals/`+username
  const response = await fetch(url);
  const goallist = await response.json();

  document.querySelector('#currUser').textContent = username;
  document.querySelector('#numGoals').textContent = goallist.usergoals.length;
  if(goallist.usergoals.length === 0) {
    displayEmptyMessage();
  }

  for(let i = 0; i < goallist.usergoals.length; i++) {
    const newgoal = goallist.usergoals[i].goal;
    const date = goallist.usergoals[i].date;
    const buddy = goallist.usergoals[i].buddy;
    const penalty = goallist.usergoals[i].penalty;
    showGoal(newgoal, date, buddy, penalty);
  }
})();

function displayEmptyMessage() {
  message = document.createElement('div');
  emptymessage = `<p><em>You have no current goals. Add a goal to get started!</em></p>`
  message.innerHTML= emptymessage;
  mainContainer = document.getElementsByClassName("tabletoedit");
  mainContainer[0].appendChild(message);
}

function showGoal(newgoal, date, buddy, penalty) {
  thisGoal = document.createElement('div');
  thisGoal.className = "row"
  goal = `
  <div class="col-sm-5">
  <p id="goal">${newgoal}</p>
  <span id="${buddy}"></span>
  <span id="${penalty}"></span>
  <button style="margin-bottom: 5px;" type="button" id="${newgoal}" class="btn btn-secondary btn-sm" onclick="completeGoal(this)">Completed</button><button style="margin-left: 10px; margin-bottom: 5px;" type="button" class="btn btn-secondary btn-sm" onclick="incompleteGoal(this.parentElement)>Not completed</button>
  </div>
  <div class="col" style="text-align: center;">${date}</div>
  <div class="col" style="text-align: center;">${buddy}</div>
  <div class="col" style="text-align: center;">$ ${penalty}</div>
  <hr/>`
  thisGoal.innerHTML = goal;
  mainContainer = document.getElementsByClassName("tabletoedit");
  mainContainer[0].appendChild(thisGoal);
}

async function addGoal() {
  let newgoal = document.getElementById('goal').value;
  let date = document.getElementById('deadline').value;
  let buddy = document.getElementById('buddy').value;
  let penalty = document.getElementById('penalty').value;
  if (!(checkData(newgoal, date, buddy, penalty))) {
    return;
  }
  await addGoalToDB(newgoal, date, buddy, penalty);
  location.reload();
  // thisGoal = document.createElement('div');
  // thisGoal.className = "row"
  // goal = `
  // <div class="col-sm-5">
  // <p>${newgoal}</p>
  // <label class="container">
  //   <input type="checkbox">
  //   <span class="checkmark"></span><em>Mark complete</em>
  // </label>
  // </div>
  // <div class="col" style="text-align: center;">${date}</div>
  // <div class="col" style="text-align: center;">${buddy}</div>
  // <div class="col" style="text-align: center;">$ ${penalty}</div>
  // <hr/>`
  // thisGoal.innerHTML = goal;
  // mainContainer = document.getElementsByClassName("tabletoedit");
  // mainContainer[0].appendChild(thisGoal);
  //mainContainer[0].getElementsByClassName("checkmark").addEventListener('click', removeRow(thisGoal))
}

async function addGoalToDB(newgoal, date, buddy, penalty) {
  username = localStorage.getItem('userName');
  const endpoint = `/api/setgoal`;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ user: username, goal: newgoal, date: date, buddy: buddy, penalty: penalty }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const body = await response.json();
}

function checkData(newgoal, date, buddy, penalty) {
  if(newgoal === '' || date ==='' || buddy === '' || penalty === '') {

    errormessage = document.createElement('div');
    message = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Error!</strong> Be sure to fill all form fields.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    errormessage.innerHTML = message;
    errorspace = document.getElementsByClassName("col-sm-8");
    errorspace[0].appendChild(errormessage);
    return false;
  }else {
    return true;
  }
}

async function completeGoal(completed) {
  console.log(completed.id);

  username = localStorage.getItem('userName');
  const url = `/api/goals/`+username + `/` +completed.id;
  const response = await fetch(url);
  location.reload();
}

async function incompleteGoal(parent) {

}

function displayQuote(data) {
  const containerEl = document.querySelector("#quote");

  const quoteEl = document.createElement("p");
  quoteEl.classList.add("quote");
  const authorEl = document.createElement("p");
  authorEl.classList.add("author");

  quoteEl.textContent = data.content;
  authorEl.textContent = data.author;

  containerEl.appendChild(quoteEl);
  containerEl.appendChild(authorEl);
}

function callService(url, displayCallback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayCallback(data);
    });
}

const random = Math.floor(Math.random() * 1000);
callService("https://api.quotable.io/random", displayQuote);
