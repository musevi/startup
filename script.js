function addGoal(date, buddy, penalty) {
    thisGoal = document.createElement('div');
    thisGoal.className = "row"
    goal = `
    <div class="col-sm-5">
    <p>Finish job applications</p>
    <label class="container">
        <input type="checkbox">
        <span class="checkmark"></span><em>Mark complete</em>
    </label>
    </div>
    <div class="col" style="text-align: center;">${date}</div>
    <div class="col" style="text-align: center;">${buddy}</div>
    <div class="col" style="text-align: center;">$ ${penalty}</div>
    <button onclick='deleteSomething()'
    <hr/>`
    thisGoal.innerHTML = goal;
    mainContainer = document.getElementById("mainContainer");
    mainContainer.appendChild(thisGoal);
    mainContainer.getElementById("delete").addEventListener('click', deleteSomething(thisGoal))
}

