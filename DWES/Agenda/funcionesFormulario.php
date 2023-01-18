<?php
function mostrarAgenda($param)
{
    echo <<< end
    <table class="table table-striped" style="background: white">
    <thead>
        <tr>
            <th scope="col" id="ciudad">Ciudad</th>
            <th scope="col" id="nombre">Nombre</th>
            <th scope="col" id="apellidos">Apellidos</th>
            <th scope="col" id="fnac">Fecha de nacimiento</th>
            <th scope="col" id="tlfno">Teléfono</th>
            <th scope="col" id="email">Email</th>
            <th scope="col" id="modificar">Modificar</th>
            <th scope="col" id="eliminar">Eliminar</th>
        </tr>
    </thead>
    <tbody>
    end;
    foreach ($param as $nombreapell => $contacto) {
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

function mostrarUsuarios($param)
{
    echo <<< end
    <table class="table table-striped" style="background: white">
    <thead>
        <tr>
            <th scope="col" id="email">Email</th>
            <th scope="col" id="pass">Contraseña</th>
            <th scope="col" id="username">Nombre</th>
            <th scope="col" id="userSurname">Apellidos</th>
            <th scope="col" id="nickname">Nickname</th>
            <th scope="col" id="address">Dirección</th>
            <th scope="col" id="phoneNumber">Teléfono</th>
            <th scope="col" id="modificar">Modificar</th>
            <th scope="col" id="eliminar">Eliminar</th>
        </tr>
    </thead>
    <tbody>
    end;
    foreach ($param as $email => $user) {
        echo "
        <tr>
                <td>" . $email . "</td>
                <td>" . '*******' . "</td>
                <td>" . $user['username'] . "</td>
                <td>" . $user['userSurname'] . "</td>
                <td>" . $user['nickname'] . "</td>
                <td>" . $user['address'] . "</td>
                <td>" . $user['phoneNumber'] . "</td>
                <td style='text-align:center'><a href='modificarUsuario.php?email=" . $email . "'<i class='bx bx-user-check'></a></td>
                <td style='text-align:center'><a href='eliminarUsuario.php?email=" . $email . "'<i class='bx bx-trash' style='color:#FF0000'></a></td>
        </tr>";
    }
    echo "
    </tbody>
</table> ";
}

function eliminar($nombre, $apellidos, $agenda, $fileAgenda)
{
    $nombreCompleto = htmlspecialchars($nombre . " " . $apellidos);
    unset($agenda[$nombreCompleto]);
    file_put_contents("$fileAgenda", serialize($agenda));
}

function eliminarUsuario($email, $users, $fileUsers)
{
    unset($users[$email]);
    file_put_contents("$fileUsers", serialize($users));
}

function aniadir($tfno, $eCorreo, $nombre, $apellidos, $ciudad, $fNac, $fileAgenda)
{

    if (empty($nombre) || empty($apellidos) || empty($ciudad) || empty($fNac)) {
        echo '<div class="error">';
        echo "<p>Faltan datos esenciales</p>";
        echo '</div>';
        exit;
    }

    if (empty($tfno)  && $eCorreo == '') { // Solo el tlfno o el eCorreo pueden quedar vacíos, pero no los dos a la vez. 
        echo '<div class="error">';
        echo "El campo Teléfono ($tfno) y el campo Correo electrónico ($eCorreo) están vacíos <br>";
        echo '</div>';
        exit;
    }

    if (strlen($nombre) < 2) { // El nombre debe tener 2 caracteres mínimo.
        echo '<div class="error">';
        echo "EL nombre introducido ($nombre) es demasiado corto <br>";
        echo '</div>';
        exit;
    }

    if (strlen($apellidos) < 2) { // El apellido debe tener dos caracteres mínimo.
        echo '<div class="error">';
        echo "Los apellidos introducidos ($apellidos) son demasiado cortos <br>";
        echo '</div>';
        exit;
    }

    $agenda = unserialize(file_get_contents("$fileAgenda")); //cogemos todo lo que hay en agenda.txt

    if (isset($agenda[$nombre . " " . $apellidos])) { // El contacto $nombre $apellidos ya existe
        return false;
    } else {
        $contactoNuevo = ['ciudad' => $ciudad, 'nombre' => $nombre, 'apellidos' => $apellidos, 'fnac' => $fNac, 'tlfno' => $tfno, 'mail' => $eCorreo]; //Nuevo contacto
        $agenda[$contactoNuevo['nombre'] . " " . $contactoNuevo['apellidos']] = $contactoNuevo; // Añade contacto al array de agenda
        file_put_contents("$fileAgenda", serialize($agenda)); //Escribir el nuevo contacto en agenda.txt
        return true;
    }
}

function modificar($tfno, $eCorreo, $nombre, $apellidos, $ciudad, $fNac, $fileAgenda)
{

    if (empty($nombre) || empty($apellidos) || empty($ciudad) || empty($fNac)) {
        echo '<div class="error">';
        echo "<p>Faltan datos esenciales</p>";
        echo '</div>';
        exit;
    }

    if (empty($tfno)  && $eCorreo == '') { // Solo el tlfno o el eCorreo pueden quedar vacíos, pero no los dos a la vez. 
        echo '<div class="error">';
        echo "El campo Teléfono ($tfno) y el campo Correo electrónico ($eCorreo) están vacíos <br>";
        echo '</div>';
        exit;
    }

    if (strlen($nombre) < 2) { // El nombre debe tener 2 caracteres mínimo.
        echo '<div class="error">';
        echo "EL nombre introducido ($nombre) es demasiado corto <br>";
        echo '</div>';
        exit;
    }

    if (strlen($apellidos) < 2) { // El apellido debe tener dos caracteres mínimo.
        echo '<div class="error">';
        echo "Los apellidos introducidos ($apellidos) son demasiado cortos <br>";
        echo '</div>';
        exit;
    }

    $agenda = unserialize(file_get_contents("$fileAgenda")); //cogemos todo lo que hay en agenda.txt
    $contactoNuevo = ['ciudad' => $ciudad, 'nombre' => $nombre, 'apellidos' => $apellidos, 'fnac' => $fNac, 'tlfno' => $tfno, 'mail' => $eCorreo]; //Nuevo contacto
    $agenda[$contactoNuevo['nombre'] . " " . $contactoNuevo['apellidos']] = $contactoNuevo; // Añade contacto al array de agenda
    file_put_contents("$fileAgenda", serialize($agenda)); //Escribir el nuevo contacto en agenda.txt
}

function consultarContacto($nombre, $apellidos, $ciudad, $agenda)
{
    $nombreCompleto = $nombre . ' ' . $apellidos;
    $resultado = [];

    if (!empty($nombre) && !empty($apellidos)) {
        foreach ($agenda as $contacto) {
            if ($contacto['nombre'] . " " . $contacto['apellidos'] === $nombreCompleto) {
                $resultado[] = $contacto;
                break;
            }
        }
        mostrarAgenda($resultado);
    } elseif (!empty($nombre) && empty($apellidos) && !empty($ciudad)) {
        foreach ($agenda as $contacto) {
            if ($contacto['nombre'] === $nombre && $contacto['ciudad'] === $ciudad) {
                $resultado[] = $contacto;
            }
        }
        mostrarAgenda($resultado);
    } elseif (!empty($nombre) && empty($apellidos) && empty($ciudad)) {
        foreach ($agenda as $contacto) {
            if ($contacto['nombre'] === $nombre) {
                $resultado[] = $contacto;
            }
        }
        mostrarAgenda($resultado);
    } elseif (empty($nombre) && !empty($apellidos) && !empty($ciudad)) {
        foreach ($agenda as $contacto) {
            if ($contacto['apellidos'] === $apellidos && $contacto['ciudad'] === $ciudad) {
                $resultado[] = $contacto;
            }
        }
        mostrarAgenda($resultado);
    } elseif (empty($nombre) && !empty($apellidos)) {
        foreach ($agenda as $contacto) {
            if ($contacto['apellidos'] === $apellidos) {
                $resultado[] = $contacto;
            }
        }
        mostrarAgenda($resultado);
    } elseif (!empty($ciudad)) {
        foreach ($agenda as $contacto) {
            if ($contacto['ciudad'] === $ciudad) {
                $resultado[] = $contacto;
            }
        }
        mostrarAgenda($resultado);
    } else {
        echo "¡Debes introducir un nombre o ciudad!";
    }
}


function selectComunidades($selected = '')
{
    $comunidades = [
        '', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma de Mayorca', 'Las Palma', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vitoria', 'La Coruña',
        'Granada', 'Oviedo', 'Santa Cruz', 'Pamplona', 'Almería', 'San Sebastian', 'Burgos', 'Albacete', 'Santander', 'Castellón', 'Logroño', 'Badajoz', 'Salamanca', 'Huelva', 'Lérida',
        'Tarragona', 'León', 'Cádiz', 'Jaén', 'Orense', 'Gerona', 'Lugo', 'Cáceres', 'Melilla', 'Guadalajara', 'Toledo', 'Ceuta', 'Pontevedra', 'Palencia', 'Ciudad Real', 'Zamora', 'Ávila',
        'Cuenca', 'Huesca', 'Segovia', 'Soria', 'Teruel',
    ];
    echo '
        <select class="form-control" name="ciudad" id="ciudad">';
    foreach ($comunidades as $value) {
        if ($selected == $value) {
            echo '<option value="';
            echo $value . '" selected>' . $value . "</option>";
        } else {
            echo '<option value="';
            echo $value . '">' . $value . "</option>";
        }
    }
    echo "</select>";
}

function aniadirUsuario($email, $pass, $username, $userSurname, $nickname, $address, $phoneNumber): bool
{
    if (empty($email) || empty($pass) || empty($nickname)) {
        echo '<div class="error">';
        echo "<p>Faltan datos esenciales</p>";
        echo '</div>';
        exit;
    }

    if (strlen($nickname) < 2) {
        echo '<div class="error">';
        echo "El nickname introducido ($nickname) es demasiado corto <br>";
        echo '</div>';
        exit;
    }

    if (!preg_match(
        '/^[a-zA-Z0-9_.+-ñÑ]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/',
        $email
    )) {
        echo '<div class="error">';
        echo "<span style='color:red'> El mail introducido no tiene un formato válido.</span><br>";
        echo '</div>';
        exit;
    }


    $users = unserialize(file_get_contents("users.txt"));

    if (isset($users[$email])) {
        echo "<span style='color:red'>El correo introducido ya existe.<br></span>";
        return false;
    } else {
        $newUser = ['username' => '', 'pass' => $pass, 'userSurname' => '', 'nickname' => $nickname, 'address' => '', 'phoneNumber' => '', 'role' => 'role_user'];

        $users[$email] = $newUser;
        file_put_contents("users.txt", serialize($users));
        file_put_contents('users/' . $email . '.txt', '');
        header('Location: ./index.php');
        return true;
    }
}

function modificarUsuario($email, $pass, $nickname,$role='role_user',  $username='', $userSurname='', $address='', $phoneNumber=''): bool
{
    if (empty($email) ||empty($nickname) || empty($pass)) {
        echo '<div class="error">';
        echo "<p>Faltan datos esenciales</p>";
        echo '</div>';
        exit;
    }

    $users = unserialize(file_get_contents("users.txt")); 
    $newUser = ['username' => '', 'pass' => $pass, 'userSurname' => '', 'nickname' => $nickname, 'address' => '', 'phoneNumber' => '', 'role' => 'role_user'];
    if(isset($users[$email])){
        //aqui meter añadirUsuario eliminandouser y añadiendo
        eliminarUsuario($email, $users, "users.txt");
        aniadirUsuario($email, $pass, $username, $userSurname, $nickname, $address, $phoneNumber);
        $user[$email]['role'] = $role;
    }else{
        //aqui meter pisar el user
        $users[$email] = $newUser; 
    }
    
    file_put_contents("users.txt", serialize($users));
    return true; 
}

function closeSession()
{
    session_unset();
    session_destroy();
    header("Location: index.php");
}
