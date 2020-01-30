var identificador = 0;
var cont = 0;
var movs = 0;
var s = 0;
var m = 0;
var cronometro;
var seleccion1 = "";
var seleccion2 = "";
var imgs = ["img/Air_Force.jpg", "img/Air_Max_270.jpg", "img/Air_Force_01.jpg",
    "img/Huarache.jpg", "img/Jordan_1.jpg", "img/Falcon.jpg", "img/AF1_Off.jpg", "img/AJR1_Off.jpg",
    "img/All_star.jpg", "img/Sketch_to_self.jpg"
];
var imagenesSeleccionadas = [];
var arrayacertadas = [];
var arrayIdentificadores = [];
var arraymezclado = [];
var click = 1;


window.onload = function() {
    $("button").click(tiempo);
    juegoterminado();
}

function juegoterminado() {
    if (arrayacertadas.length == 20) {
        alert(arrayacertadas.length);
        $('#puzzle').html("");
        $('#puzzle').append('<center><img src="img/fotovictoria.jpg" width="540px" height="432px"></center>')
    }
}

function dimensiones(columnas, lineas) {
    cont = 1;
    $('#puzzle').html("");
    $('#puzzle').append('<table>');
    for (let i = 0; i < lineas; i++) {
        $('#puzzle').append('<tr>');
        for (let z = 0; z < columnas; z++) {
            $('#puzzle').append('<td><div class="piezas" id="Imagen' + cont + '"></div></td>');
            cont++;
        }
        $('#puzzle').append('</tr>');
    }
    $('#puzzle').append('</table>');
    $(".piezas").css({ "background-image": "url(img/principal.jpg)", "background-size": "100px 100px" })
    imagenes();
    voltear();

}

function voltear() {
    $(".piezas").click(function(event) {
        var identificador = event.delegateTarget.attributes.id.value;
        // console.log(identificador);
        //Guardamos la imagen, que posteriormente utilizaremos en la comparación.
        var imagen = event.target.id;
        // console.log(imagen);
        //Ejecutamos la animación para mostrar la imagen.
        animacion(identificador);
        imagenesSeleccionadas.push(imagen);
        arrayIdentificadores.push(identificador);
        if (click == 2) {
            var mismaimagen = comprobarMismaImagen();
            if (mismaimagen == true) {
                alert("Ha pulsado la misma imagen");
                animacion2(identificador);
                imagenesSeleccionadas = [];
                arrayIdentificadores = [];
                click = 0;


            } else {
                comprobar();
            }
        } else {
            //Continua clickando
            console.log("estos son los clicks que lleva" + click)
        }
        .0
        click++;
        juegoterminado();
    })
}

function comprobar() {
    // console.log(imagenesSeleccionadas);
    // console.log(arrayIdentificadores);
    //Comparamos Imagenes con el array imagenes seleccionadas
    if (imagenesSeleccionadas[0] == imagenesSeleccionadas[1]) {
        // console.log("Coinciden");
        // console.log(imagenesSeleccionadas[0] == imagenesSeleccionadas[1]);
        comprobarImagenAcertada(arrayIdentificadores[0]);
        comprobarImagenAcertada(arrayIdentificadores[1]);
        // console.log("El array de acertados " + arrayacertadas);
        // console.log("El array de imagenes acertados " + imagenesSeleccionadas);
        $("#" + arrayIdentificadores[0] + " img").click(false);
        $("#" + arrayIdentificadores[1] + " img").click(false);
        arrayacertadas.push(arrayIdentificadores[0], arrayIdentificadores[1]);
        imagenesSeleccionadas = [];
        arrayIdentificadores = [];
        click = 0;

    } else {
        // console.log("No coinciden");
        // console.log(imagenesSeleccionadas[0] == imagenesSeleccionadas[1]);
        comprobarImagenAcertada(arrayIdentificadores[0]);
        comprobarImagenAcertada(arrayIdentificadores[1]);
        animacion2(arrayIdentificadores[1]);
        animacion2(arrayIdentificadores[0]);
        imagenesSeleccionadas = [];
        arrayIdentificadores = [];
        click = 0;
    }

}

function comprobarImagenAcertada(imagen) {
    console.log(arrayacertadas);
    console.log("comprobarImagenAcertada " + imagen);
    var acertada = arrayacertadas.indexOf(imagen);
    if (acertada != -1) {
        console.log("Esta imagen ya esta acertada, no se deberia de dar la vuelta");


    } else {
        console.log("Esta imagen no ha sido acertada");
    }

}

function comprobarMismaImagen() {

    console.log("comprobarMismaImagen 0 " + arrayIdentificadores[0]);
    console.log("comprobarMismaImagen 1 " + arrayIdentificadores[1]);
    if (arrayIdentificadores[0] == arrayIdentificadores[1]) {
        return true;
    } else {
        return false;
    }

}


function animacion(identificador) {
    $("#" + identificador + " img").animate({
        transition: "all 1s ease-in-out",
        transform: "rotate(360deg)",
        opacity: "1"
    });



}

function animacion2(identificador) {
    $("#" + identificador + " img").animate({
        transition: "all 1s ease-in-out",
        transform: "rotate(180deg)",
        opacity: "0"
    });

}

function movimientos(click) {
    movs += click;
    document.getElementById("movimientos").innerHTML = "Movimientos: <br>" + movs;

}


function imagenes(numImgs = 10) {

    arraymezclado = [...imgs, ...imgs, ];
    arraymezclado = shuffle(arraymezclado);

    for (let i = 0; i <= 20; i++) {
        $('#Imagen' + i).prepend('<img id="' + arraymezclado[i - 1] +
            '" src="' + arraymezclado[i - 1] + '" width="100px" height="100px" />')
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // Mientras queden elementos a mezclar...
    while (0 !== currentIndex) {

        // Seleccionar un elemento sin mezclar...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // E intercambiarlo con el elemento actual
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function tiempo() {
    parartiempo();
    cronometro = setInterval(contartiempo, 1000)
}

function contartiempo() {
    var tiempo = document.getElementById("tiempo");
    s++;
    if (s < 10) {
        if (s > 59) {
            s = 00;
            m++;
            tiempo.innerHTML = "Tiempo:<br> 0" + m + " : " + s;

        }
        tiempo.innerHTML = "Tiempo:<br> " + m + " : 0" + s;
    } else {
        if (s > 59) {
            s = 00;
            m++;
            tiempo.innerHTML = "Tiempo:<br> " + m + " : " + s;

        }
        if (m > 9) {
            tiempo.innerHTML = "Tiempo:<br> " + m + " : " + s;

        }
        tiempo.innerHTML = "Tiempo:<br> " + m + " : " + s;
    }

}

function parartiempo() {
    clearInterval(cronometro);
    s = 0;
    m = 0;

}