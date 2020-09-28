
export function ModalButtonHeightSet() {
    console.log('here');
    document.getElementById('ModalButton').style.height = document.getElementById('ModalButton').offsetWidth+'px';
}

export function ModalButtonClick(){
    document.getElementById("ModalButton").style.visibility = "hidden";
    document.getElementById("EditFormModal").style.visibility = "visible";
};

//Checks that click is outside of form
export function OutsideModal(event) {
    var elem = event.target.id;
    if(elem == "EditFormModal"){
        document.getElementById("ModalButton").style.visibility = "visible";
        document.getElementById("EditFormModal").style.visibility = "hidden";
    }
};

export function ModalCloseX(){
    document.getElementById("ModalButton").style.visibility = "visible";
    document.getElementById("EditFormModal").style.visibility = "hidden";
};

