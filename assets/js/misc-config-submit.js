document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    startProcess();

    const submit = document.querySelector('button[type=submit]');

    submit.innerHTML = 'Saving Changes...';
    submit.classList.add('disabled');

    const qs = name => document.querySelector(`[name="${name}"]`);
    const roleCommands = {};
    const els = [...document.querySelectorAll('.role-override')];

    for (const el of els) {
        roleCommands[el.getAttribute('data-role')] = qs(`override-${el.getAttribute('data-role')}`).value.split('\n').filter(c => c !== '');
    }

    const data = {
        prefix: qs('prefix').value,
        debug: qs('debug').checked,
        warn_notallowed: qs('warn_notallowed').checked,
        global_commands: qs('global_commands').value.split('\n').filter(c => c !== ''),
        starboard: {
            enabled: qs('starboard_enabled').checked,
            reactions: parseInt(qs('starboard_reactions').value),
            channel: qs('starboard_channel').value,
        },
        autorole: {
            enabled: qs('autorole_enabled').checked,
            roles: [...qs('autorole_roles').childNodes].map(e => e.getAttribute('data-value')),
        },
        role_commands: roleCommands
    };

    console.clear();
    console.log(data);

    axios.post(`${CONFIG.endpoint}/config/misc/${CONFIG.guild_id}?token=${CONFIG.token}`, {
        data
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res.data);
        location.reload();
        endProcess();
    })
    .catch(e => {
        console.log(e);
        alert('An error occured while saving the data. (API Error)');
        endProcess();
    });
});