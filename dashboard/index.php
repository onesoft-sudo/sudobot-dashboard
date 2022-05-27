<?php
    @session_start();

    $_PREFIX = '..';
    $_TITLE = 'Dashboard - SudoBot';

    if (isset($_GET['guild_id'])) {
        $guild_id = $_GET['guild_id'];

        if (!isset($_SESSION['tokens'][$guild_id])) 
            exit();
    }

    
    $page = 'dashboard';

    require('../header.php');
?>

<div class="container">
    <div class="row">
        <div class="col">
            <h1>Dashboard</h1>
            <div id="currentServer">
                <div class="spinner-border text-primary d-inline-block" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <h3 class="d-inline-block">Loading...</h3>
            </div>
            <br>
        </div>
    </div>
    <script>
        window.methods.guildLoad = guild => {
            const currentServer = document.querySelector('#currentServer');
            currentServer.innerHTML = `<h3>${guild.name}</h3>`;
        };
    </script>
    <div class="row mt-2">
        <div class="col-md-6">
            <div class="card card-dark bg-dark">
                <div class="card-body">
                    <a class="h5 card-title cursor-pointer" href="<?= $_PREFIX ?>/general/?guild_id=<?= $_GET['guild_id'] ?? array_keys($_SESSION['tokens'])[0] ?>">General Settings</a>
                    <p class="card-text">General configuration options.</p>
                    <a href="<?= $_PREFIX ?>/general/?guild_id=<?= $_GET['guild_id'] ?? array_keys($_SESSION['tokens'])[0] ?>" class="btn btn-primary">Go</a>
                </div>
            </div>
        </div>
        <div class="col-md-6">
                <div class="card card-dark bg-dark mt-3 mt-md-0">
                    <div class="card-body">
                        <a class="h5 card-title cursor-pointer" href="<?= $_PREFIX ?>/moderation/?guild_id=<?= $_GET['guild_id'] ?? array_keys($_SESSION['tokens'])[0] ?>">Moderation Settings</a>
                        <p class="card-text">Set up moderation.</p>
                        <a href="<?= $_PREFIX ?>/moderation/?guild_id=<?= $_GET['guild_id'] ?? array_keys($_SESSION['tokens'])[0] ?>" class="btn btn-primary">Go</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-5 mx-0">
        <div class="col text-center">
            <h6>SudoBot</h6>
            <p>
                Version 2.0.0-beta1<br>
                Control Panel Version 1.0.0-beta1<br>
                Report bugs at <a href="https://github.com/virtual-designer/sudobot/issues">GitHub</a> or <a href="mailto:rakinar2@gmail.com">Email</a>.
            </p>
        </div>
    </div>
</div>
<?php
    require('../footer.php');
?>