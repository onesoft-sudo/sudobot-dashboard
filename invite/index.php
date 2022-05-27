<?php
    @session_start();

    $_PREFIX = '..';
    $_TITLE = 'Invite - SudoBot';

    $rd = false;

    $page = 'invite';

    require('../header.php');
?>

<div class="container">
    <div class="row">
        <div class="col">
            <h1>Invite SudoBot</h1>
            <p>We're glad to know that you want to invite SudoBot! But please make sure that your server doesn't violate one of these:</p>
            <br>
            <ul>
                <li>At least 100 members</li>
                <li>No NSFW, Illegal, Religious or Political Stuff</li>
                <li>Community Server</li>
            </ul>

            <p>Please fill out <a href="https://forms.gle/aK6i8ZUtS8Q9KJak7">this form</a> to submit an invite request. We usually reply in 1-7 days.</p>
            <p>If you have any issues with SudoBot, you can let us know at <a href="https://github.com/virtual-designer/sudobot/issues">GitHub</a>, <a href="https://discord.gg/892GWhTzgs">Discord</a> or <a href="mailto:rakinar2@gmail.com">by email</a>.</p>
        </div>
    </div>
</div>
<?php
    require('../footer.php');
?>