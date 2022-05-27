<?php
    @session_start();

    $_PREFIX = '..';
    $_TITLE = 'Login - SudoBot';
    $errors = [];
    $rd = false;

    if (isset($_SESSION['username'])) {
        header("Location: $_PREFIX/dashboard/");
        exit();
    }

    if (isset($_POST['username']) && isset($_POST['password'])) {
        $u = $_POST['username'];
        $p = $_POST['password'];

        if (trim($u) !== '' && trim($p) !== '') {
            $users = json_decode(file_get_contents("../storage/users.json"));
            $userdata = null;

            foreach ($users as $user) {
                if ($user->username === $u) {
                    if ($user->password === hash('sha512', $p)) {
                        $_SESSION['id'] = $user->id;
                        $_SESSION['username'] = $u;
                        $_SESSION['tokens'] = (array) $user->tokens;
                        $userdata = $user;

                        header('Location: ../dashboard/');
                        exit();
                    }
                    else {
                        $userdata = true;
                        $errors[] = 'Wrong password entered.';
                        break;
                    }
                }
            }

            if (!$userdata)
                $errors[] = 'No such user found.';
        }
        else {
            if (trim($u) === '') {
                $errors[] = 'You must specify a username to log in.';
            }
            else if (trim($p) === '') {
                $errors[] = 'You must enter a password to log in.';
            }
        }
    }

    require('../header.php');
?>
<div class="container">
    <div class="row text-center">
        <div class="col">
            <h1>Login</h1>
            <br>
        </div>
    </div>

    <div class="row d-flex justify-content-center align-items-center h-100 pb-4">
        <div class="col-md-4">
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
            <form action="<?= $_SERVER['PHP_SELF']; ?>" method="post">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" class="form-control">
                </div>
                <br>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" class="form-control">
                    <small class="form-text text-muted"><a onclick="const el = $('#forgotPassword'); let d = el.style.display === '' ? 'none' : el.style.display; console.log(d); (d === 'none') ? el.style.display = 'block' : el.style.display = 'none';" href="#">Forgot password?</a></small>
                </div>
                <div class="form-group" style="display: none;" id="forgotPassword">
                    <p>Please send an email at <a href="mailto:rakinar2@gmail.com">rakinar2@gmail.com</a> or DM rakinar2#7578 at Discord.</p>
                </div>
                <br>
                <div class="form-group">
                    <button class="btn btn-primary d-block w-100" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</div>
    
<?php
    require('../footer.php');
?>