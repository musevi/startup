
function addGoal() {
    let newgoal = document.getElementById('goal').value;
    let date = document.getElementById('deadline').value;
    let buddy = document.getElementById('buddy').value;
    let penalty = document.getElementById('penalty').value;
    if (!(checkData(newgoal, date, buddy, penalty))) {
        return;
    }
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