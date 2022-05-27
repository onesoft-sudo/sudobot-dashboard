<?php
    @session_start();
    $_PREFIX = '..';
    $_TITLE = 'Moderation Settings - SudoBot';

    // echo '<pre>';
    // print_r();
    // echo '</pre>';

    if (!isset($_GET['guild_id']))
        exit();

    $guild_id = $_GET['guild_id'];

    if (!isset($_SESSION['tokens'][$guild_id])) 
        exit();
    
    $page = 'dashboard';

    require('../header.php');
?>
<div class="container mb-5">
    <div class="row">
        <div class="col">
            <h1>Moderation</h1>
        </div>
    </div>
    <form action="" method="post">
        <div class="row mt-2">
            <div class="col-md">
                
                    <div class="form-group">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Anti-Raid Systems</h5>
                                <p class="card-text">Lock specified channels after a raid is detected.</p>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-check d-flex align-items-center mt-3">
                                            <input class="form-check-input mt-0" type="checkbox" name="raid_enabled" data-key="raid.enabled" value="true">
                                            <label class="ms-2">Enable this filter</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-3">
                                    <div class="col-md-6">
                                        <label for="">Member Join Limit</label>
                                        <input type="number" class="form-control" name="raid_max_join" data-key="raid.max_joins">
                                        <span class="form-text text-muted">Channels will be locked if the given number of users are joined in the given time limit.</span>
                                    </div>
                                    <div class="col-md-6 mt-2 mt-md-0">
                                        <label for="">Time Limit</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" name="raid_time" data-key="raid.time">
                                            <div class="input-group-text">
                                                <span class="d-desktop">milliseconds</span><span class="d-mobile">ms</span>
                                            </div>
                                        </div>
                                        <span class="form-text text-muted">Channels will be locked if someone breaks the given join limit in the given time limit.</span>
                                    </div>
                                </div>

                                <div class="row pt-3">
                                    <div class="col">
                                        <label for="">Channel Preferences</label>

                                        <div class="form-check d-flex align-items-center mt-3">
                                            <input class="form-check-input mt-0" type="checkbox" name="raid_exclude" data-key="raid.exclude" onchange="load1DataCTRL(this)" value="true">
                                            <label class="ms-2">Don't lock these channels</label>
                                        </div>

                                        <br>
                                        
                                        <div class="checkboxes mt-3">
                                            <textarea name="raid_channels" data-jsonraw="raid.channels" class="form-control" rows="4"></textarea>
                                            <span class="form-text text-muted">These channels <span id="check1Data">won't</span> be locked if a raid happens. Channel IDs should be separated by a newline (enter). Channel categories can also be passed to represent all channels in the category. Must be valid IDs.</span>
                                        </div>

                                        <script>
                                            function load1DataCTRL(el) {
                                                el.checked ? document.getElementById('check1Data').innerHTML = 'won\'t' : document.getElementById('check1Data').innerHTML = 'will';
                                            }

                                            load1DataCTRL(document.querySelector('input[name="raid_exclude"]'));
                                        </script>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Manual channel locking</h5>
                                <p class="card-text">Lock specified channels using the <span class="cmd">lockall</span> command.</p>
                                
                                <div class="row">
                                    <div class="col">
                                        <label for="">Channels</label>
                                        
                                        <div class="checkboxes mt-3" id="channels1">
                                            <textarea name="lockall" class="form-control" data-jsonraw="lockall" rows="4"></textarea>
                                            <span class="form-text text-muted">Channel IDs should be separated by a newline (enter). Channel categories can also be passed to represent all channels in the category. Must be valid IDs.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Spam Filter</h5>
                                <p class="card-text">Take action against spamming. First spam detection for an user will do nothing except showing a message that spam was detected. Second time it will warn the user and after that each spam will cause a mute.</p>

                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-check d-flex align-items-center mt-3">
                                            <input class="form-check-input mt-0" type="checkbox" name="spam_enabled" data-key="spam_filter.enabled" value="true">
                                            <label class="ms-2">Enable this filter</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row pt-3">
                                    <div class="col-md-6">
                                        <label for="">Message Limit</label>
                                        <input type="number" class="form-control" name="spam_limit" data-key="spam_filter.limit">
                                        <span class="form-text text-muted">The maximum number of messages that can be sent by a user in the given time limit.</span>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="">Time Limit</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" name="spam_time" data-key="spam_filter.time">
                                            <div class="input-group-text">
                                                <span class="d-desktop">milliseconds</span><span class="d-mobile">ms</span>
                                            </div>
                                        </div>
                                        <span class="form-text text-muted">The time limit in which messages will be counted.</span>
                                    </div>
                                </div>

                                <div class="row pt-3">
                                    <div class="col">
                                        <label for="">Excluded Channels</label>
                                        <br>
                                        <span class="form-text text-muted">Spam will be ignored in the selected channels. Moderators are always whitelisted.</span>
                                        
                                        <div class="checkboxes mt-3" id="channels2">
                                            <textarea name="spam_exclude" class="form-control" rows="4" data-jsonraw="spam_filter.exclude"></textarea>
                                            <span class="form-text text-muted">Channel IDs should be separated by a newline (enter). Channel categories can also be passed to represent all channels in the category. Must be valid IDs.</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <a href="#" id="toggleHidden1" onclick="event.preventDefault(); const el = document.getElementById('hidden1'); el.style.display != 'none' && el.style.display != 'block' ? el.style.display = 'none' : null; el.style.display == 'none' ? el.style.display = 'block' : el.style.display = 'none'; this.innerHTML === 'Show advanced options...' ? this.innerHTML = 'Hide advanced options' : this.innerHTML = 'Show advanced options...';">Show advanced options...</a>
                                    </div>
                                </div>

                                <div class="row pt-4" id="hidden1">
                                    <div class="col">
                                        <h6>Advanced Options</h6>

                                        <div class="pt-2">
                                            <label for="">Messaging Interval</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" name="spam_diff" data-key="spam_filter.diff">
                                                <div class="input-group-text">
                                                    <span class="d-desktop">milliseconds</span><span class="d-mobile">ms</span>
                                                </div>
                                            </div>
                                            <span class="form-text text-muted">The difference of time between two messages of a user. If a user is sending messages in this rate then it will be treated as spam. It is generally set to 2000 ms. If you're not sure what you're doing, don't modify this field!</span>
                                        </div>

                                        <div class="pt-2">
                                            <label for="">Max repeated characters</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" name="spam_chars" data-key="filters.chars_repeated">
                                            </div>
                                            <span class="form-text text-muted">The max limit of repeated characters in a message.</span>
                                        </div>

                                        <div class="pt-2">
                                            <label for="">Max repeated words & sentences</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" name="spam_words" data-key="filters.words_repeated">
                                            </div>
                                            <span class="form-text text-muted">The max limit of repeated words & sentences in a message.</span>
                                        </div>

                                        <div class="pt-2">
                                            <label for="">Similar repeated messages limit</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" name="spam_same" data-key="spam_filter.samelimit">
                                            </div>
                                            <span class="form-text text-muted">The max limit of repeated similar messages. If a user exceeds this limit, then it will be treated as spam.</span>
                                        </div>

                                        <div class="pt-2">
                                            <label for="">Mute duration</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control" name="spam_unmute_in" data-key="spam_filter.unmute_in">
                                                <div class="input-group-text">
                                                    <span class="d-desktop">milliseconds</span><span class="d-mobile">ms</span>
                                                </div>
                                            </div>
                                            <span class="form-text text-muted">The mute duration for spammers.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Blocked words</h5>
                                <p class="card-text">Blacklist offensive words.</p>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-check d-flex align-items-center mt-3">
                                            <input class="form-check-input mt-0" type="checkbox" name="blocked_enabled" data-key="filters.words_enabled" value="true" id="testID2">
                                            <label for="testID2" class="ms-2">Enable this filter</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-3">
                                    <div class="col">
                                        <label for="">Words</label>
                                        <textarea name="blocked_words" class="form-control" cols="30" rows="3" data-jsonraw="filters.words"></textarea>
                                        <span class="form-text text-muted">The blacklisted words. Should be separated by <span class="cmd">\n</span> (enter/newline).</span>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="form-check d-flex align-items-center mt-3">
                                            <input class="form-check-input mt-0" type="checkbox" name="regex" value="true" data-key="filters.regex" id="blockedRegex">
                                            <label for="blockedRegex" class="ms-2">Enable RegEx (Regular Expressions) <spam class="badge badge-primary bg-primary" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">BETA</spam></label>
                                        </div>

                                        <span class="form-text text-muted">Enable RegEx parsing. All words will be considered as RegEx patterns. Learn more about RegEx <a href="https://en.wikipedia.org/wiki/Regular_expression">here</a>.</span>
                                    </div>
                                </div>

                                <div class="row pt-3">
                                    <div class="col">
                                        <label for="">Excluded Channels</label>
                                        <br>
                                        <span class="form-text text-muted">Blocked words will be ignored in the selected channels.</span>
                                        
                                        <div class="checkboxes mt-3" id="channels4">
                                            <textarea name="blocked_excluded" class="form-control" rows="4" data-jsonraw="filters.words_excluded"></textarea>
                                            <span class="form-text text-muted">Channel IDs should be separated by a newline (enter). Channel categories can also be passed to represent all channels in the category. Must be valid IDs.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md">
                    <div class="form-group mt-3 mt-md-0">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Message filters</h5>
                                <p class="card-text">Delete messages using various filters.</p>

                                <div class="row">
                                    <div class="col">
                                        <div class="form-check d-flex align-items-center mt-3">
                                            <input class="form-check-input mt-0" type="checkbox" name="blocked_invite_ignore_mods" value="true" data-key="filters.ignore_staff" id="oneID">
                                            <label for="oneID" class="ms-2">Ignore Moderators for message filters</label>
                                        </div>

                                        <span class="form-text text-muted">Moderators will be able to bypass these filters.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Invite Filter</h5>
                                <p class="card-text">Prevent users from posting any external invites.</p>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-check d-flex align-items-center mt-3">
                                            <input class="form-check-input mt-0" type="checkbox" name="invite_enabled" value="true" data-key="filters.invite_enabled" id="testID">
                                            <label for="testID" class="ms-2">Enable this filter</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row pt-3">
                                    <div class="col">
                                        <label for="">Excluded Channels</label>
                                        <br>
                                        <span class="form-text text-muted">This filter will be disabled in the selected channels.</span>
                                        
                                        <div class="checkboxes mt-3" id="channels5">
                                            <textarea name="invite_excluded" class="form-control" rows="4" data-jsonraw="filters.invite_excluded"></textarea>
                                            <span class="form-text text-muted">Channel IDs should be separated by a newline (enter). Channel categories can also be passed to represent all channels in the category. Must be valid IDs.</span>
                                        </div>                                  
                                        <div class="form-group mt-3">
                                            <label for="">Info Message</label>
                                            <textarea name="invite_message" class="form-control mt-2" rows="4" data-key="filters.invite_message"></textarea>
                                            <span class="form-text text-muted">The message to send when a user posts an invite.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Logging Channel</h5>
                                <p class="card-text">The actions and events logging channel.</p>
                                
                                <div class="row">
                                    <div class="col">
                                        <label for="">Channel</label>
                                        <select class="form-control minimal" name="logging_channel" data-channels id="channels3">
                                            <option value="none">None</option>
                                        </select>
                                        <span class="form-text text-muted">The logging channel. Selecting none will disable logging.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Join/Leave Logging Channel</h5>
                                <p class="card-text">The member join and leave logging channel.</p>
                                
                                <div class="row">
                                    <div class="col">
                                        <label for="">Channel</label>
                                        <select class="form-control minimal" name="logging_channel_join_leave" data-channels>
                                            <option value="none">None</option>
                                        </select>
                                        <span class="form-text text-muted">The join/leave logging channel. Selecting none will disable logging.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Announcement Channel</h5>
                                <p class="card-text">The announcement channel.</p>
                                
                                <div class="row">
                                    <div class="col">
                                        <label for="">Channel</label>
                                        <select class="form-control minimal" name="announcement_channel" data-channels id="channels6">
                                            <option value="none">None</option>
                                        </select>
                                        <span class="form-text text-muted">The announcement channel.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Moderator Role</h5>
                                <p class="card-text">Only users having this role can run commands.</p>
                                
                                <div class="row">
                                    <div class="col">
                                        <label for="">Role</label>
                                        <select class="form-control minimal" name="mod_role" data-roles='true' id="roles1">
                                            <option value="none">None</option>
                                        </select>
                                        <span class="form-text text-muted">The role. Selecting none will disable this feature.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">General Role</h5>
                                <p class="card-text">Common role that all users have.</p>
                                
                                <div class="row">
                                    <div class="col">
                                        <label for="">Role</label>
                                        <select class="form-control minimal" name="gen_role" data-roles='true' id="roles2">
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <h5 class="card-title">Muted Role</h5>
                                <p class="card-text">The role which will be assigned to the muted users.</p>
                                
                                <div class="row">
                                    <div class="col">
                                        <label for="">Role</label>
                                        <select class="form-control minimal" name="muted_role" data-roles='true' id="roles3">
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group mt-3 mb-5">
                        <div class="card card-dark bg-dark">
                            <div class="card-body">
                                <button type="submit" name="submit" value="null" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>

                <div class="sudotoast d-flex">
                    <p>You have unsaved changes!</p>
                    <div class="d-flex">
                        <button class="btn btn-light" id="saveBtn">Save</button>
                        <button class="btn btn-light" id="discardBtn">Discard</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<a href="<?= $_SERVER['PHP_SELF'] ?>" class="d-none" id="reload"></a>

<script src="<?= $_PREFIX; ?>/assets/js/save.js"></script>

<script>
    window.CONFIG = {
        endpoint: "<?= $endpoint ?>",
        token: "<?= $_SESSION['tokens'][$guild_id] ?>",
        guild_id: "<?= $guild_id ?>",
    };
</script>

<script src="<?= $_PREFIX; ?>/assets/js/config-loader.js"></script>
<script src="<?= $_PREFIX; ?>/assets/js/config-submit.js"></script>

<?php
    require('../footer.php');
?>