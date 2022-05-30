<?php
    $_PREFIX = '.';
    $_H_APPEND = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';
    $_TITLE = 'SudoBot';
    $rd = true;
    $page = 'home';
    require('header.php');
?>
<div class="container">
    <div class="row">
        <div class="col-md">
            <h1>The Ultimate Solution for <span class="text-primary">All in One</span> Moderation.</h1>
            <p>SudoBot is built for auto moderation and has a lot of auto moderation tools that can save you from headaches.<br>Keep your servers secure, with one click.</p>

            <div class="buttons d-md-flex">
                <a href="<?= $_PREFIX ?>/dashboard" class="btn btn-custom d-block d-md-inline-block">Control Panel</a>
                <a href="<?= $_PREFIX ?>/invite" class="btn btn-custom-outline ms-md-2 mt-2 mt-md-0 d-block d-md-inline-block">Request Invite</a>
            </div>
        </div>
        <div class="col-md d-flex justify-content-center align-items-center pt-5 pt-md-0">
            <img src="<?= $_PREFIX ?>/img/shield.png" width="50%" style="border-radius: 10px;" alt="SudoBot">
        </div>
    </div>
</div>

<div class="container py-5 mt-4" id="hanging-icons">
  <h2 class="pb-2 border-bottom">Features</h2>
  <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
    <div class="col d-flex align-items-start">
      <div class="icon-square flex-shrink-0 me-3">
        <i class="fa fa-shield fa-2x"></i>
      </div>
      <div>
        <h2>Spam Filter</h2>
        <p>Limit message sending by a specific rate so that the server remains clean.</p>
      </div>
    </div>
    <div class="col d-flex align-items-start">
      <div class="icon-square flex-shrink-0 me-3">
          <i class="fa fa-wrench fa-2x"></i>
      </div>
      <div>
        <h2>Anti-Raid Systems</h2>
        <p>Keep bad guys out of the server and prevent raid.</p>
      </div>
    </div>
    <div class="col d-flex align-items-start">
      <div class="icon-square flex-shrink-0 me-3">
          <i class="fa fa-filter fa-2x"></i>
      </div>
      <div>
        <h2>Message filters</h2>
        <p>Filter specific messages so that the server doesn't mess up.</p>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col">
      <div class="footer-links">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/virtual-designer/sudobot"><img src="<?= $_PREFIX ?>/img/github.png" alt=""></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://discord.gg/892GWhTzgs"><img src="<?= $_PREFIX ?>/img/discord.png" alt=""></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<?php
    require('footer.php');
?>