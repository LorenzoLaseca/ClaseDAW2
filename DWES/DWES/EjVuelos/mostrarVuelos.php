<?php
function mostrarVuelo($ArrayVuelo, $idVuelo)
{
    echo <<< end
    <table class="table table-striped" style="background: white">
    <thead>
        <tr>
            <th scope="col" id="Origen">Ciudad</th>
            <th scope="col" id="Destino">Nombre</th>
            <th scope="col" id="Hora de Vuelo">Apellidos</th>
            <th scope="col" id="Ocupacion">Fecha de nacimiento</th>
        </tr>
    </thead>
    <tbody>
    end;
    foreach ($ArrayVuelo as $nombreapell => $contacto) {
        echo "
        <tr>
                <td>" . $contacto['ciudad'] . "</td>
                <td>" . $contacto['nombre'] . "</td>
                <td>" . $contacto['apellidos'] . "</td>
                <td>" . $contacto['fnac'] . "</td>
                <td>" . $contacto['tlfno'] . "</td>
                <td>" . $contacto['mail'] . "</td>
                <td style='text-align:center'><a href='modificar.php?nombre=" . $contacto['nombre'] . "&apellidos=" . $contacto['apellidos'] . "'<i class='bx bx-user-check'></a></td>
                <td style='text-align:center'><a href='eliminar.php?nombre=" . $contacto['nombre'] . "&apellidos=" . $contacto['apellidos'] . "'<i class='bx bx-trash' style='color:#FF0000'></a></td>
        </tr>";
    }
    echo "
    </tbody>
</table> ";
}

?>
