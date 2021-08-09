//NAVI---------------------------------------------->

var uno = 5;//navi da 1
var due = 3;//navi da 2
var tre = 2;//navi da 3
var quattro = 1;//navi da 4

function Nave(dim, dir) {

    this.dim = dim;//dimensione della nave
    this.dir = dir;//direzione della nave: 0 = orizzontale, 1 = verticale
    this.parts = [];
    this.indizio = false;

}

//parti di una nave
function Part(dim, dir) {

    this.x = null;
    this.y = null;
    this.dim = dim;
    this.dir = dir;
    this.indizio = false;

}

var navi = [];
var naviPosizionate = [];

var numeri = [uno, due, tre, quattro];

function addParts(nave) {

    for (let i = 0; i < nave.dim; i++) {

        nave.parts.push(new Part(nave.dim, nave.dir));
    }

}

function creaNavi() {

    var dim = 1;

    for (let i = 0; i < numeri.length; i++) {
        navi[i] = [];
        for (let j = 0; j < numeri[i]; j++) {
            var dir = round(random());
            var nave = new Nave(dim, dir);
            addParts(nave);
            navi[i][j] = nave;

        }
        dim++;
    }

}

function PosizionaNave(index_i, index_j) {

    var nave = navi[index_i][index_j];

    var trovato = false;//diventa true se ci sono posizioni possibili

    //trova tutte le posizioni possibili
    TrovaPosizioniPossibili(nave.dim, nave.dir);

    //scegline una a caso
    if (PosizioniPossibili.length > 0) {

        var Posto = PosizioniPossibili[floor(random(PosizioniPossibili.length))];
        var cella = Posto.celle;

        for (let i = 0; i < nave.dim; i++) {
            cella[i].filled = true;
            cella[i].color = 0;
            nave.parts[i].x = cella[i].x;
            nave.parts[i].y = cella[i].y;
        }

        var r = cella[0].y / side_length;
        var c = cella[0].x / side_length;

        if (nave.dir == 0) {

            for (let i = -1; i <= 1; i++) {

                if (grid[r - i] != undefined) {
                    if (grid[r - i][c - 1] != undefined) {

                        grid[r - i][c - 1].filled = true;
                        //grid[r - i][c - 1].color = 100;
                    }
                }
            }

            for (let index_x = c; index_x < c + nave.dim; index_x++) {

                if (grid[r - 1] != undefined) {
                    grid[r - 1][index_x].filled = true;
                    //grid[r - 1][index_x].color = 100;
                }

                if (grid[r + 1] != undefined) {
                    grid[r + 1][index_x].filled = true;
                    //grid[r + 1][index_x].color = 100;
                }

            }



            for (let i = -1; i <= 1; i++) {

                if (grid[r - i] != undefined) {
                    if (grid[r - i][c + nave.dim] != undefined) {

                        grid[r - i][c + nave.dim].filled = true;
                        //grid[r - i][c + nave.dim].color = 100;
                    }
                }
            }

        }

        else if (nave.dir == 1) {

            for (let i = -1; i <= 1; i++) {
                if (grid[r - 1] != undefined) {
                    if (grid[r - 1][c + i] != undefined) {
                        grid[r - 1][c + i].filled = true;
                        //grid[r - 1][c + i].color = 100;
                    }
                }
            }


            for (let index_y = r; index_y < r + nave.dim; index_y++) {

                if (grid[index_y][c - 1] != undefined) {
                    grid[index_y][c - 1].filled = true;
                    //grid[index_y][c - 1].color = 100;
                }

                if (grid[index_y][c + 1] != undefined) {
                    grid[index_y][c + 1].filled = true;
                    //grid[index_y][c + 1].color = 100;
                }

            }

            for (let i = -1; i <= 1; i++) {
                if (grid[r + nave.dim] != undefined) {
                    if (grid[r + nave.dim][c + i] != undefined) {
                        grid[r + nave.dim][c + i].filled = true;
                        //grid[r + nave.dim][c + i].color = 100;
                    }
                }
            }

        }

        trovato = true;

    }

    //riponi le posizioni possibili uguali a niente
    PosizioniPossibili = [];

    return trovato;

}


function ShowNavi() {

    for (let i = 0; i < naviPosizionate.length; i++) {

        var nave = naviPosizionate[i];

        var x = side_length;
        var y = side_length;

        if (nave.dim > 1) {

            if (nave.dir == 0) {

                for (let j = 0; j < nave.dim; j++) {

                    var x_part = nave.parts[j].x + extra + x;
                    var y_part = nave.parts[j].y + extra + y;

                    if (j == 0) {
                        fill(0);
                        noStroke();
                        rect(x_part, y_part, side_length - 2 * extra, side_length - 2 * extra, 0, rounded, rounded, 0);

                    }
                    if (j > 0 && j < nave.dim - 1) {
                        fill(0);
                        noStroke();
                        rect(x_part, y_part, side_length - 2 * extra, side_length - 2 * extra);
                    }
                    if (j == nave.dim - 1) {
                        fill(0);
                        noStroke();
                        rect(x_part, y_part, side_length - 2 * extra, side_length - 2 * extra, rounded, 0, 0, rounded);
                    }
                }

            }
            else if (nave.dir == 1) {

                for (let j = 0; j < nave.dim; j++) {

                    var x_part = nave.parts[j].x + extra + x;
                    var y_part = nave.parts[j].y + extra + y;

                    if (j == 0) {
                        fill(0);
                        noStroke();
                        rect(x_part, y_part, side_length - 2 * extra, side_length - 2 * extra, 0, 0, rounded, rounded);
                    }
                    if (j > 0 && j < nave.dim - 1) {
                        fill(0);
                        noStroke();
                        rect(x_part, y_part, side_length - 2 * extra, side_length - 2 * extra);
                    }
                    if (j == nave.dim - 1) {
                        fill(0);
                        noStroke();
                        rect(x_part, y_part, side_length - 2 * extra, side_length - 2 * extra, rounded, rounded, 0, 0);
                    }
                }

            }

        }
        else if (nave.dim == 1) {

            var x_part = nave.parts[0].x + extra_for_circle + x;
            var y_part = nave.parts[0].y + extra_for_circle + y;

            fill(0);
            ellipse(x_part, y_part, r);
        }

    }

}//end function