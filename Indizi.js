//INDIZI
var N_indizi = 3;

function addIndizi() {

    for (let n = 1; n <= N_indizi; n++) {

        var index1 = floor(random(naviPosizionate.length));
        var nave_selected = naviPosizionate[index1];

        var parts = nave_selected.parts;
        var index2 = floor(random(parts.length));
        var part = parts[index2];

        if (nave_selected.dim > 1 && nave_selected.indizio == false && (index2 == 0 || index2 == parts.length - 1)) {

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {

                    if (grid[i][j].x == part.x && grid[i][j].y == part.y) {
                        grid[i][j].conteine_indizio = true;
                        nave_selected.indizio = true;
                    }

                }
            }
        }
        else {
            n--;
        }

    }//end for loop

}


function ShowIndizi() {

    ShowNavi();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            if (grid[i][j].conteine_indizio == false) {

                var x = grid[i][j].x + side_length;
                var y = grid[i][j].y + side_length;

                fill(255);
                stroke(0);
                rect(x, y, side_length, side_length);

            }

        }
    }

}//end function