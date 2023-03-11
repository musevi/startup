
function addGoal() {
    let newgoal = document.getElementById('goal').value;
    let date = document.getElementById('deadline').value;
    let buddy = document.getElementById('buddy').value;
    let penalty = document.getElementById('penalty').value;
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
    // mainContainer.getElementById("delete").addEventListener('click', deleteSomething(thisGoal))

}


