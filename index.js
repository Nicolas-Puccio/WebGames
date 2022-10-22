const columnsAmount = 20;
const rowsAmount = 12;
const ratsAmount = 10;
const tickInterval = 75;
let ticking = false;//true stops user input

/**
 * Creates dom table
 * 
 * Assigns ID
 */
document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("game");

    //creates game grid
    for (let i = 0; i < rowsAmount; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < columnsAmount; j++) {
            const td = document.createElement("td");
            td.setAttribute('id', `${j}-${i}`);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    //creates input rows
    for (let i = 0; i < 2; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < columnsAmount; j++) {
            const td = document.createElement("td");
            td.setAttribute('id', `${j}-${rowsAmount + i}`);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
});



/**
 * Initializes or restarts game and spawns rats
 */
const Start = () => {
    if (ticking)//fix this, it should stop the tick and allow you to restart at any time
        return

    //sets air and cheese grid
    for (let i = 0; i < rowsAmount; i++) {
        for (let j = 0; j < columnsAmount; j++)
            document.getElementById(`${j}-${i}`).className = `image${Math.random() > .5 ? 0 : 1}`;//0 = air, 1 = cheese
    }

    let ratsSpawned = 0

    //spawns player rats
    while (ratsSpawned < ratsAmount) {
        const j = Math.floor(Math.random() * 5);
        const i = Math.floor(Math.random() * rowsAmount);
        if (document.getElementById(`${j}-${i}`).className !== 'image2') {
            document.getElementById(`${j}-${i}`).className = 'image2';
            ratsSpawned++;
        }
    }

    ratsSpawned = 0;

    //spawns enemy rats
    while (ratsSpawned < ratsAmount) {
        const j = Math.floor(Math.random() * 5 + columnsAmount - 5);
        const i = Math.floor(Math.random() * rowsAmount);
        if (document.getElementById(`${j}-${i}`).className !== 'image3') {
            document.getElementById(`${j}-${i}`).className = 'image3';
            ratsSpawned++;
        }
    }

    //for restarting
    for (let j = 0; j < columnsAmount; j++) {
        document.getElementById(`${j}-${rowsAmount}`).className = 'noinput';
        document.getElementById(`${j}-${rowsAmount}`).onclick = () => { return false; }
        document.getElementById(`${j}-${rowsAmount + 1}`).className = 'noinput';
        document.getElementById(`${j}-${rowsAmount + 1}`).onclick = () => { return false; }
    }
}



const Tick = () => {
    if (ticking)
        return

    ticking = true
    let movementFlag = true;

    //calls movement until none is detected, then enables input row
    const interval = setInterval(() => {
        if (!movementFlag) {
            clearInterval(interval);
            console.log(`Stopped loop`);
            ticking = false;
            EnableInput();
        }
        movementFlag = MovementTick()
    }, tickInterval);


    //what would be the best way to optimize this?
}



const GravityTick = () => {
    for (let i = rowsAmount - 2; i >= 0; i--) {//makes more sense to begin from below right? purposely ignoring most bottom row
        for (let j = 0; j < columnsAmount; j++) {
            const element = document.getElementById(`${j}-${i}`);
            if (element.className === 'image2' || element.className === 'image3') {//if this is a rat
                if (document.getElementById(`${j}-${i + 1}`).className === "image0") {//if the is nothing under the rat
                    document.getElementById(`${j}-${i + 1}`).className = element.className;
                    element.className = 'image0';
                    return true;
                }
            }
        }
    }

    return false;
}


const MovementTick = () => {
    if (GravityTick())
        return true

    for (let i = rowsAmount - 1; i >= 0; i--) {
        for (let j = 0; j < columnsAmount; j++) {
            const element = document.getElementById(`${j}-${i}`);
            if (element.className === 'image2') {//if this is a rat
                //go right
                if (j + 1 === columnsAmount) {
                    element.className = 'image0';
                }
                else if (document.getElementById(`${j + 1}-${i}`).className === "image0") {
                    document.getElementById(`${j + 1}-${i}`).className = element.className;
                    element.className = 'image0';
                    return true
                }

            } else if (element.className === 'image3') {//if this is a rat
                //go left
                if (j === 0) {
                    element.className = 'image0';
                }
                else if (document.getElementById(`${j - 1}-${i}`).className === "image0") {
                    document.getElementById(`${j - 1}-${i}`).className = element.className;
                    element.className = 'image0';
                    return true
                }
            }
        }
    }
    return false;
}


//i could use this function to initialize rows too, instead of repeating code on Start() and Input()
const EnableInput = () => {
    console.log('enable input')

    for (let j = 0; j < columnsAmount; j++) {
        document.getElementById(`${j}-${rowsAmount}`).className = 'noinput';
        document.getElementById(`${j}-${rowsAmount}`).onclick = () => { return false; }
        document.getElementById(`${j}-${rowsAmount + 1}`).className = 'noinput';
        document.getElementById(`${j}-${rowsAmount + 1}`).onclick = () => { return false; }

        for (let i = 0; i < rowsAmount; i++) {
            if (document.getElementById(`${j}-${i}`).className === 'image2') {
                document.getElementById(`${j}-${rowsAmount}`).className = 'inputup';
                document.getElementById(`${j}-${rowsAmount}`).onclick = () => { Input(j, true) }
                document.getElementById(`${j}-${rowsAmount + 1}`).className = 'inputdown';
                document.getElementById(`${j}-${rowsAmount + 1}`).onclick = () => { Input(j, false) }
                break;
            }
        }
    }
}


const Input = (j, up) => {
    console.log(j, up);

    for (let j = 0; j < columnsAmount; j++) {
        document.getElementById(`${j}-${rowsAmount}`).className = 'noinput';
        document.getElementById(`${j}-${rowsAmount}`).onclick = () => { return false; }
        document.getElementById(`${j}-${rowsAmount + 1}`).className = 'noinput';
        document.getElementById(`${j}-${rowsAmount + 1}`).onclick = () => { return false; }
    }

    if (up) {
        const aux = document.getElementById(`${j}-${0}`).className
        for (let i = 1; i < rowsAmount; i++) {
            document.getElementById(`${j}-${i - 1}`).className = document.getElementById(`${j}-${i}`).className
        }
        document.getElementById(`${j}-${rowsAmount - 1}`).className = aux
    }

    if (!up) {
        const aux = document.getElementById(`${j}-${rowsAmount - 1}`).className
        for (let i = rowsAmount - 2; i >= 0; i--) {
            document.getElementById(`${j}-${i + 1}`).className = document.getElementById(`${j}-${i}`).className
        }
        document.getElementById(`${j}-${0}`).className = aux
    }

    Tick()
}