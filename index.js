const columnsAmount = 20;
const rowsAmount = 12;
const ratsAmount = 10;

const game = new Array(rowsAmount);


document.addEventListener("DOMContentLoaded", () => {
    CreateTable()
    Draw()
});


/**
 * Creates dom table
 * 
 * Assigns ID
 * 
 * Initializes to 0
 */
const CreateTable = () => {
    const table = document.getElementById("game");

    for (let i = 0; i < rowsAmount; i++) {
        game[i] = new Array(columnsAmount);

        const tr = document.createElement("tr");

        for (let j = 0; j < columnsAmount; j++) {
            const td = document.createElement("td");
            td.setAttribute('id', `${j}-${i}`);
            td.innerHTML = `${j}-${i}`
            tr.appendChild(td);
            game[i][j] = 0;
        }
        table.appendChild(tr);
    }
}

/**
 * Initializes or restars game and spawns rats
 */
const Start = () => {
    for (let i = 0; i < rowsAmount; i++) {
        for (let j = 0; j < columnsAmount; j++)
            game[i][j] = Math.random() > .5 ? 0 : 1;//0 = air, 1 = wall
    }

    let ratsSpawned = 0

    //spawns player rats
    while (ratsSpawned < ratsAmount) {
        const x = Math.floor(Math.random() * 6);
        const y = Math.floor(Math.random() * rowsAmount);
        if (game[y][x] !== 2) {
            game[y][x] = 2;
            ratsSpawned++;
        }
    }

    ratsSpawned = 0;

    //spawns enemy rats
    while (ratsSpawned < ratsAmount) {
        const x = Math.floor(Math.random() * 6 + columnsAmount - 5);
        const y = Math.floor(Math.random() * rowsAmount);
        if (game[y][x] !== 3) {
            game[y][x] = 3;
            ratsSpawned++;
        }
    }

    Draw()
}



/**
 * Draws current game to table
 * 
 * Called every tick
 * 
 * Currently draws number, should draw image
 */
const Draw = () => {
    console.log("DRAW")
    for (let i = 0; i < rowsAmount; i++) {
        for (let j = 0; j < columnsAmount; j++)
            document.getElementById(`${j}-${i}`).innerHTML = game[i][j];
    }
}


const Tick = () => {
    //loop rats one by one to check one of these
    //check for gravity
    //check for movement

    //loop the whole thing again to see if the movement of a previous rat allows a new rat to move?

    //what would be the best way to optimize this?
}