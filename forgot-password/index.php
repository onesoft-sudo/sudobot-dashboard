<?php
    @session_start();

    $_PREFIX = '..';
    $_TITLE = 'Reset Password - SudoBot';
    $errors = [];
    $rd = false;

    if (!isset($_GET['code']))
        exit();

    $code = $_GET['code'];
    $username = null;

    $users = json_decode(file_get_contents("../storage/users.json"));
    $index = null;
    $userdata = null;
    $success = false;

    foreach ($users as $i => $user) {
        if ($user->pcode !== null && $user->pcode === $code) {
            $userdata = $user;
            $index = $i;
            break;
        }
    }

    if ($userdata === null) {
        $code_err = true;
    }
    else {
        $username = $userdata->username;
    }

    if (isset($_POST['password']) && isset($_POST['cpassword'])) {
        $p = $_POST['password'];
        $cp = $_POST['cpassword'];

        if ($p !== $cp) {
            $errors[] = "The passwords do not match";
        }
        else if ($userdata !== null) {
            $users[$index]->pcode = null;
            $users[$index]->password = hash('sha512', $p);
            file_put_contents('../storage/users.json', json_encode($users, JSON_PRETTY_PRINT));
            $success = true;
        }
    }

    require('../header.php');
?>
<div class="container">
    <div class="row text-center">
        <div class="col">
            <h1>Reset Password</h1>
            <br>
        </div>
    </div>

    <div class="row d-flex justify-content-center align-items-center h-100 pb-4">
        <div class="col-md-4">
            <?php if ($success): ?>
                <p>Your password has been updated. <a href="<?= $_PREFIX ?>/login/">Go to login page</a>.</p>
            <?php elseif (!isset($code_err)): ?>
                <?php 
                    if (!empty($errors)) {
                ?>
                <div class="alert alert-warning">
                    <?php
                        foreach ($errors as $error) {
                            echo $error . "\n<br>";      
                        }
                    ?>
                </div>
                <?php
                    }
                ?>
                <form action="<?= $_SERVER['REQUEST_URI']; ?>" method="post">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" class="form-control" value="<?= $username ?>" disabled>
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="password">New Password</label>
                        <input type="password" name="password" id="password" class="form-control">
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="password">Confirm New Password</label>
                        <input type="password" name="cpassword" id="cpassword" class="form-control">
                    </div>
                    <br>
                    <div class="form-group">
                        <button class="btn btn-primary d-block w-100" type="submit">Reset Password</button>
                    </div>
                </form>
            <?php else: ?>
                <h3 class="text-center">419 Page Expired</h3>
                <p class="text-center">The requested password reset code was expired.</p>
            <?php endif; ?>
        </div>
    </div>
</div>
    
<?php
    require('../footer.php');
?>