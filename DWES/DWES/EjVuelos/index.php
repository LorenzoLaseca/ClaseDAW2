<?php

$ArrayVuelos = [
    "AK127" => [
        "Origen" => "Madrid",
        "Destino" => "Londres",
        "Hora de Vuelo" => "00:25",
        "Ocupacion" => "0b011001,0b111010,0b011101,0b111111,0b111111,0b011011,0b100101,0b010101,0b000101,0b000000,0b010110,0b010111,0b111001,0b011101,0b110011,0b111000,0b100001,0b011011,0b000000,0b000001",

    ],
    "AK250" => [
        "Origen" => "Madrid",
        "Destino" => "Berlin",
        "Hora de Vuelo" => "01:10",
        "Ocupacion" => "0b001001,0b110110,0b010111,0b011101,0b000101,0b110101,0b011010,0b010101,0b100101,0b000101,0b010011,0b010101,0b011101,0b010100,0b000101,0b001101,0b011001,0b110101,0b111111,0b000111",

    ],
    "AK128" => [
        "Origen" => "Londres",
        "Destino" => "Madrid",
        "Hora de Vuelo" => "01:55",
        "Ocupacion" => "0b010001,0b011010,0b011101,0b010001,0b010100,0b110101,0b010101,0b100101,0b010101,0b010111,0b001101,0b010011,0b110101,0b010001,0b010100,0b010111,0b000000,0b011101,0b010011,0b010110" ,

        ]
    
]
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vuelos</title>
</head>

<body>
<form action="#" target="" method="post" name="formVuelos">

<label for="idVuelos">Introduzca el codigo del vuelo: </label>

<input type="submit" name="enviar" value="enviar datos"/>
</form>

</body>

</html>