<?php
    @session_start();

    $_PREFIX = '..';
    $_TITLE = 'General Settings - SudoBot';
    
    if (!isset($_GET['guild_id']))
        exit();

    $guild_id = $_GET['guild_id'];

    if (!isset($_SESSION['tokens'][$guild_id])) 
        exit();

    $page = 'dashboard';
    require('../header.php');
?>

<div class="container">
    <div class="row">
        <div class="col">
            <h1>General Settings</h1>
        </div>
    </div>
    <form action="" method="post">
    <div class="row mt-2">
            <div class="col-md">
                <div class="row">
                    <div class="col-md">
                        <div class="form-group">
                            <div class="card card-dark bg-dark">
                                <div class="card-body">
                                    <h5 class="card-title">Command Prefix</h5>
                                    <p class="card-text">Set the command prefix.</p>

                                    <div class="row pt-3">
                                        <div class="col">
                                            <label for="">Prefix</label>
                                            <input type="text" name="prefix" class="form-control" data-key="prefix">
                                            <span class="form-text text-muted">The command prefix.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group mt-3">
                            <div class="card card-dark bg-dark">
                                <div class="card-body">
                                    <h5 class="card-title">Misc Settings</h5>
                                    <p class="card-text">Misc options.</p>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-check d-flex align-items-center mt-3">
                                                <input class="form-check-input mt-0" type="checkbox" name="warn_notallowed" value="true" data-key="warn_notallowed">
                                                <label class="ms-2">Warn users if they don't<br class="d-mobile"> have permission<br class="d-mobile"> to run commands</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-check d-flex align-items-center mt-3">
                                                <input class="form-check-input mt-0" type="checkbox" name="debug" value="true" data-key="debug">
                                                <label class="ms-2">Enable debug mode</label>
                                            </div>

                                            <span class="form-text text-muted">Enabling this option will send extra data each time when an error is occurred.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group mt-3">
                            <div class="card card-dark bg-dark">
                                <div class="card-body">
                                    <h5 class="card-title">Global Commands</h5>
                                    <p class="card-text">Set commands that everyone can run.</p>

                                    <div class="row pt-3">
                                        <div class="col">
                                            <label for="">Words</label>
                                            <textarea name="global_commands" class="form-control" cols="30" rows="5" data-jsonraw="global_commands"></textarea>
                                            <span class="form-text text-muted">The commands. Should be separated by <span class="cmd">\n</span> (enter/newline).</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md">
                <div class="row">
                    <div class="col">
                        <div class="form-group mt-3 mt-md-0">
                            <div class="card card-dark bg-dark">
                                <div class="card-body">
                                    <h5 class="card-title">Starboard</h5>
                                    <p class="card-text">Set up starboard system.</p>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-check d-flex align-items-center mt-3">
                                                <input class="form-check-input mt-0" type="checkbox" name="starboard_enabled" value="true" data-key="starboard.enabled">
                                                <label class="ms-2">Enable starboard</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row pt-3">
                                        <div class="col">
                                            <label for="">Required Reactions</label>
                                            <input type="number" class="form-control" name="starboard_reactions" data-key="starboard.reactions">
                                            <span class="form-text text-muted">The required number of star reactions to be posted in the starboard.</span>
                                        </div>
                                    </div>

                                                
                                    <div class="row">
                                        <div class="col">
                                            <label for="">Channel</label>
                                            <select class="form-control minimal" name="starboard_channel" data-channels>
                                                <option value="none">None</option>
                                            </select>
                                            <span class="form-text text-muted">The starboard channel.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group mt-3">
                            <div class="card card-dark bg-dark">
                                <div class="card-body">
                                    <h5 class="card-title">Autorole</h5>
                                    <p class="card-text">Set up autorole system.</p>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-check d-flex align-items-center mt-3">
                                                <input class="form-check-input mt-0" type="checkbox" name="autorole_enabled" value="true" data-key="autorole.enabled">
                                                <label class="ms-2">Enable autorole</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row pt-3">
                                        <div class="col">
                                            <label for="">Roles</label>
                                            <textarea name="autorole_roles" class="form-control" cols="30" rows="5" data-jsonraw="autorole.roles"></textarea>
                                            <span class="form-text text-muted">The role IDs. Should be separated by <span class="cmd">\n</span> (enter/newline).</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="form-group mt-3">
                    <div class="card card-dark bg-dark">
                        <div class="card-body">

                            <div class="d-flex justify-content-between">
                                <div>
                                    <h5 class="card-title">Command Permission Overrides</h5>
                                    <p class="card-text">Set up permission override system.</p>
                                </div>
                                <div>
                                    <button class="btn btn-primary" type="button" id="addOverride" data-bs-toggle="modal" data-bs-target="#staticBackdrop">&plus;<span class="d-desktop"> Add</span></button>
                                </div>
                            </div>

                            <br>

                            <div id="overrides">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md">
                <div class="form-group mt-3 mb-5">
                    <div class="card card-dark bg-dark">
                        <div class="card-body">
                            <button type="submit" name="submit" value="null" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    
    <div class="sudotoast d-flex">
        <p>You have unsaved changes!</p>
        <div class="d-flex">
            <button class="btn btn-light" id="saveBtn">Save</button>
            <button class="btn btn-light" id="discardBtn">Discard</button>
        </div>
    </div>
</div>


<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-dark">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Add Override</h5>
        <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
            <label for="">Role</label>
            <select id="modalRole" class="form-control minimal" data-roles="true">
                <option value="none">None</option>
            </select>
        </div>

        <br>

        <div>
            <label for="">Disallowed commands</label>
            <textarea class="form-control" cols="30" rows="5" id="modalCommands"></textarea>
            <span class="form-text text-muted">The commands. Should be separated by <span class="cmd">\n</span> (enter/newline).</span>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="modalAddBtn">Add</button>
      </div>
    </div>
  </div>
</div>


<script>
    window.CONFIG = {
        endpoint: "<?= $endpoint ?>",
        token: "<?= $_SESSION['tokens'][$guild_id] ?>",
        guild_id: "<?= $guild_id ?>",
        configCallback(config) {
            console.log('here2');
            loadRolesToState()
            .then(renderOverrides)
            .catch(e => console.log(e));
        }
    };

    function addOverride() {
        const roleID = document.querySelector('#modalRole').value;

        if (hasOverride(roleID)) {
            insertAlert($('.modal-body'), {
                content: "An override for this role already exists. Please edit it instead.",
                expire: 4000,
                top: true
            });

            return;
        } 

        const commands = document.querySelector('#modalCommands').value;
        const role = state.roles.find(r => r.id === roleID);

        let str = `
            <div class="row role-override" data-role="${role.id}">
                <div class="col">
                    <div class="d-block d-md-flex justify-content-between align-items-center my-2">
                        <label for="">Disallowed commands for role: ${role.name} (${role.id})</label>
                        <div>
                            <button class="btn btn-primary" type="button" data-role="${role.id}" data-index="${state.i + 1}" onclick="moveOverride(this.getAttribute('data-role'), parseInt(this.getAttribute('data-index')) - 1)">&uarr;</button>
                            <button class="btn btn-primary" type="button" data-role="${role.id}" data-index="${state.i + 1}" onclick="moveOverride(this.getAttribute('data-role'), parseInt(this.getAttribute('data-index')) + 1)">&darr;</button>
                            <button class="btn btn-danger" type="button" data-role="${role.id}" onclick="removeOverride(this.getAttribute('data-role'))">&times;</button>
                        </div>
                    </div>
                    <textarea name="override-${role.id}" class="form-control" cols="30" rows="5">${commands}</textarea>
                    <span class="form-text text-muted">The commands. Should be separated by <span class="cmd">\n</span> (enter/newline).</span>
                </div>
            </div>
        `;

        document.querySelector('#overrides').innerHTML += str;
        bootstrap.Modal.getInstance(document.querySelector('.modal')).hide();
        state.config.role_commands[role.id] = commands.split('\n');
    }

    function hasOverride(roleID) {
        return document.querySelector('[data-role=\'' + roleID + '\']') !== null;
    }

    function removeOverride(roleID) {
        if (!hasOverride(roleID)) {
            alert("Invalid role ID");
            return;
        } 

        document.querySelector('[data-role="' + roleID + '"]').remove();
        delete state.config.role_commands[roleID];
    }

    function moveOverride(id, pos) {
        let count = 0;

        for (const roleID in state.config.role_commands)
            count++;

        pos = pos < 0 ? 0 : pos;
        pos = pos >= count ? count - 1 : pos;

        const arr = {...state.config.role_commands};
        let copied;
        let role;

        console.log(id, pos, state.config.role_commands);

        for (const roleID in state.config.role_commands) {
            if (roleID === id) {
                copied = [...(state.config.role_commands[roleID])];
                role = roleID;
                delete state.config.role_commands[roleID];
            }
        }

        console.log('Again', state.config.role_commands);

        let i = 0;
        const obj = {};
        let done = false;

        for (const roleID in state.config.role_commands) {
            console.log("----", roleID, i, role, copied);

            if (i === pos && !done) {
                obj[role] = copied;
                console.log('yes');
            }

            obj[roleID] = state.config.role_commands[roleID];
            i++;
        }

        let last;

        for (const roleID in arr)
            last = roleID;

        if (i === pos) {
            obj[role] = copied;
            console.log('yes');
        }

        console.log(state.config.role_commands, obj);

        state.config.role_commands = obj;
        renderOverrides();
    }

    function renderOverrides() {
        let i = 0;
        document.querySelector('#overrides').innerHTML = '';

        for (const roleID in state.config.role_commands) {
            let role = state.roles.find(r => r.id === roleID);

            let str = `
                <div class="row role-override" data-role="${role.id}">
                    <div class="col">
                        <div class="d-block d-md-flex justify-content-between align-items-center my-2">
                            <label for="">Disallowed commands for role: ${role.name} (${role.id})</label>
                            <div>
                                <button class="btn btn-primary" type="button" data-role="${role.id}" data-index="${i}" onclick="moveOverride(this.getAttribute('data-role'), parseInt(this.getAttribute('data-index')) - 1)">&uarr;</button>
                                <button class="btn btn-primary" type="button" data-role="${role.id}" data-index="${i}" onclick="moveOverride(this.getAttribute('data-role'), parseInt(this.getAttribute('data-index')) + 1)">&darr;</button>
                                <button class="btn btn-danger" type="button" data-role="${role.id}" onclick="removeOverride(this.getAttribute('data-role'))">&times;</button>
                            </div>
                        </div>
                        <textarea name="override-${role.id}" class="form-control" cols="30" rows="5">${state.config.role_commands[roleID].join('\n')}</textarea>
                        <span class="form-text text-muted">The commands. Should be separated by <span class="cmd">\n</span> (enter/newline).</span>
                    </div>
                </div>
            `;

            document.querySelector('#overrides').innerHTML += str;
            i++;
        }
        
        state.i = i;
    }

    document.querySelector('#modalAddBtn').addEventListener('click', addOverride);
</script>

<script src="<?= $_PREFIX; ?>/assets/js/config-loader.js"></script>
<script src="<?= $_PREFIX; ?>/assets/js/misc-config-submit.js"></script>
<script src="<?= $_PREFIX; ?>/assets/js/save.js"></script>

<?php
    require('../footer.php');
?>