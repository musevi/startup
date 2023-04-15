
(async () => {
  console.log("in initial await")
  username = localStorage.getItem('userName');
  const url = `/api/goals/`+username
  const response = await fetch(url);
  const goallist = await response.json();

  //console.log(JSON.parse(JSON.stringify(goallist)));
  console.log(goallist);
  console.log(goallist.usergoals[0].goal)
  console.log(goallist.usergoals.length);

  for(let i = 0; i < goallist.usergoals.length; i++) {
    console.log("in the for loop");
    const newgoal = goallist.usergoals[i].goal;
    const date = goallist.usergoals[i].date;
    const buddy = goallist.usergoals[i].buddy;
    const penalty = goallist.usergoals[i].penalty;
    showGoal(newgoal, date, buddy, penalty);
  }
})();

function showGoal(newgoal, date, buddy, penalty) {
  thisGoal = document.createElement('div');
  thisGoal.className = "row"
  goal = `
  <div class="col-sm-5">
  <p>${newgoal}</p>
  <label class="container">
    <input type="checkbox">
    <span class="checkmark"></span><em>Mark complete</em>
  </label>
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
  thisGoal = document.createElement('div');
  thisGoal.className = "row"
  goal = `
  <div class="col-sm-5">
  <p>${newgoal}</p>
  <label class="container">
    <input type="checkbox">
    <span class="checkmark"></span><em>Mark complete</em>
  </label>
  </div>
  <div class="col" style="text-align: center;">${date}</div>
  <div class="col" style="text-align: center;">${buddy}</div>
  <div class="col" style="text-align: center;">$ ${penalty}</div>
  <hr/>`
  thisGoal.innerHTML = goal;
  mainContainer = document.getElementsByClassName("tabletoedit");
  mainContainer[0].appendChild(thisGoal);
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
