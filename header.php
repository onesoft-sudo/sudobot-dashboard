<?php 
    @session_start();

    function e($e) {
        return htmlspecialchars($e);
    }

    $_PREFIX ??= '.';
    
    $guild_id1 = '';

    if (!isset($rd) && !isset($_SESSION['username'])) {
        header("Location: $_PREFIX/login/");
        exit();
    }

    include("config.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($_TITLE ?? 'No Title') ?></title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?= $_PREFIX ?>/assets/css/style.css">
    <script src="<?= $_PREFIX ?>/assets/js/app.js"></script>

    <?php if (isset($_SESSION['username'])): ?>
        <script>
            <?php
                $token = null;

                foreach ($_SESSION['tokens'] as $t) {
                    $token = $t;
                    break;
                }
            ?>
            window.CONFIG = {
                endpoint: "<?= $endpoint ?>",
                token: "<?= $token ?>",
            };
        </script>
    <?php endif; ?>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <?= $_H_APPEND ?? '' ?>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="<?=$_PREFIX ?>">
                <img src="<?= $_PREFIX ?>/img/sudobot.png" width="30px" height="30px" style="border-radius: 10px;" alt="SudoBot">
                <span>SudoBot</span>
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link<?= isset($page) && $page === 'home' ? ' active' : ''; ?>" aria-current="page" href="<?=$_PREFIX ?>">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link<?= isset($page) && $page === 'dashboard' ? ' active' : ''; ?>" href="<?=$_PREFIX ?>/dashboard/">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link<?= isset($page) && $page === 'invite' ? ' active' : ''; ?>" href="<?=$_PREFIX ?>/invite/">Invite</a>
                    </li>
                    <li class="nav-item user-wrapper d-flex">
                        <?php if (isset($_SESSION['username'])): ?>
                        <div class="d-inline-block mt-0 me-3" style="display: none;" id="processing">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div class="user d-inline-block mt-0" style="position: relative;">
                            <div class="dropstart">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <?= htmlspecialchars($_SESSION['username']); ?>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="<?= $_PREFIX ?>/logout.php">Logout</a></li>
                                    <div class="dropdown-divider"></div>
                                    <?php 
                                        foreach ($_SESSION['tokens'] as $guild => $token) {
                                            if (isset($_GET['guild_id']) && ($guild . '') === $_GET['guild_id']) {
                                                $guild_id1 = $guild;
                                            }
                                    ?>
                                        <li><a class="dropdown-item guildName" href="<?= $_SERVER['PHP_SELF'] ?>?guild_id=<?= $guild ?>" data-guildID="<?= $guild ?>">Loading...</a></li>
                                    <?php } ?>
                                </ul>
                            </div>
                        </div>
                        <?php endif; ?>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <?php if (isset($_SESSION['username'])): ?>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            startProcess();

            try {
                axios.post(`${CONFIG.endpoint}/guilds/?token=${CONFIG.token}`, {
                    guilds: <?= json_encode(array_keys((array) $_SESSION['tokens'])); ?>
                })
                .then(res => {
                    const els = [...document.querySelectorAll('.guildName')];
                    state.guilds = [];

                    console.log(res.data.guilds);

                    for (let index in els) {
                        console.log(index);
                        state.guilds.push(res.data.guilds[index]);

                        if (res.data.guilds[index].id === '<?= $guild_id1 ?>') {
                            state.currentGuild = res.data.guilds[index];
                            els[index].classList.add('active');
                        }

                        els[index].innerHTML = res.data.guilds[index].name;
                    }

                    if (!state.currentGuild) { 
                        state.currentGuild = state.guilds[0];
                        els[0].classList.add('active');
                    }

                    if (window.methods.guildLoad)
                        window.methods.guildLoad(state.currentGuild);
                    
                    endProcess();
                })
                .catch(e => {
                    console.log(e);

                    if (!(new RegExp('There was an error while trying to fetch data from the API.', 'gm')).test($('.container').innerHTML)) {
                        insertAlert($('.container'), {
                            content: 'There was an error while trying to fetch data from the API.',
                            type: 'warning',
                            expire: 5500,
                            top: true
                        });
                    }

                    endProcess();
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        
    </script>
    <?php endif; ?>