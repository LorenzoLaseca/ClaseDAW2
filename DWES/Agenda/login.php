<?php
session_start();
?>

<html>

<head>
  <meta charset="utf-8">
  <!-- Favicons -->
  <link href="assets/img/agenda.png" rel="icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">
</head>

<body >
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Agenda v2</p>


                <form action="" method="POST">
                  <div class="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Correo electrónico" name="email" value=<?= isset($_POST['email']) ? $_POST['email'] : '' ?>>


                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" class="form-control form-control-lg" name="pass" placeholder="Contraseña">
                  </div>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit" name="ok">
                    Entrar
                  </button>
                </form>
              </div>
              <div>
                <p class="mb-0">
                  ¿Todavía no tienes cuenta?
                  <a href="register.php" class="text-white-50 fw-bold">Regístrate gratis</a>
                </p>
              </div>

              <?php
              $users = unserialize(file_get_contents("users.txt"));

              if (isset($_POST['ok'])) {
                if (isset($_POST['pass'])) {
                  $passLog = $_POST['pass'];
                  if (isset($users[$_POST['email']])) {
                    if (password_verify($passLog,  $users[$_POST['email']]['pass'])) {
                      $_SESSION['email'] = $_POST['email'];
                      header('Location: ./index.php');
                    } else {
                      echo "<span style='color:red'> La contraseña introducida no es correcta.</span><br>";
                    }
                  } else {
                    echo "<span style='color:red'> El correo introducido no está registrado.</span><br>";
                  }
                }
              }
              ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</body>

</html>