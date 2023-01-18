<div class="form-outline form-white mb-4">
    <input type="text" id="typeNameX" class="form-control form-control-lg" placeholder="Nombre" name="name" value=<?= isset($_POST['name']) ? $_POST['name'] : '' ?>>
</div>
<div class="form-outline form-white mb-4">
    <input type="text" id="typeUserSurnameX" class="form-control form-control-lg" placeholder="Apellidos" name="userSurname" value=<?= isset($_POST['userSurname']) ? $_POST['userSurname'] : '' ?>>
</div>
<div class="form-outline form-white mb-4">
    <input type="text" id="typeAddressX" class="form-control form-control-lg" placeholder="Dirección" name="address" value=<?= isset($_POST['address']) ? $_POST['address'] : '' ?>>
</div>
<div class="form-outline form-white mb-4">
    <input type="tel" id="typePhoneNumberX" class="form-control form-control-lg" placeholder="Teléfono" name="phoneNumber" value=<?= isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : '' ?>>
</div>