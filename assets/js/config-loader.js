"use strict";

const setInputValue = (input, value) => {
    if (input.getAttribute('type') === 'checkbox' || input.getAttribute('type') === 'radio') {
        input.checked = value;
    }
    else {
        input.value = value;
    }
};

function loadConfigValues() {
    const dataInputs = document.querySelectorAll('[data-key]');

    for (const input of dataInputs) {
        let key = input.getAttribute('data-key');

        if (key.includes('.')) {
            const [key1, key2] = key.split('.');

            try {
                setInputValue(input, state.config[key1][key2]);
            }
            catch(e) {
                console.log(e, key1, key2);
            }
        }
        else {
            setInputValue(input, state.config[key]);
        }
    }
}

function loadConfigValuesJSON() {
    const dataInputs = document.querySelectorAll('[data-jsonraw]');

    for (const input of dataInputs) {
        let key = input.getAttribute('data-jsonraw');

        if (key.includes('.')) {
            const [key1, key2] = key.split('.');
            setInputValue(input, state.config[key1][key2].join('\n'));
        }
        else {
            setInputValue(input, state.config[key].join('\n'));
        }
    }
}

function loadChannelsToState() {
    return new Promise((resolve, reject) => {
        axios.get(`${CONFIG.endpoint}/channels/${CONFIG.guild_id}?token=${CONFIG.token}`)
        .then(res => {
            window.state.channels = res.data;
            resolve(res);
        })
        .catch(e => {
            alert('There was an error while trying to fetch data from the API.');
            console.log(e);
            reject(e);
        });
    });
}

function loadRolesToState() {
    return new Promise((resolve, reject) => {
        axios.get(`${CONFIG.endpoint}/roles/${CONFIG.guild_id}?token=${CONFIG.token}`)
        .then(res => {
            window.state.roles = res.data;
            resolve(res);
        })
        .catch(e => {
            alert('There was an error while trying to fetch data from the API.');
            console.log(e);
            reject(e);
        });
    });
}

async function loadChannels(elements, callback) {
    if (!state.channels)
        await loadChannelsToState();
    
    for (const el of elements) {
        el.innerHTML = '<option value="' + state.channels[0].id + '">None</option>';
        console.log(state.channels);
        for (const channel of state.channels) {
            if (!['GUILD_TEXT', 'GUILD_NEWS'].includes(channel.type))
                continue;

            console.log('here');
            
            el.innerHTML += '<option value="' + channel.id + '" ' + (callback(el, channel, state.channels) ? 'selected' : '') + '>#' + channel.name + '</option>';
        }
    }
}

async function loadRoles(elements, callback) {
    if (!state.roles)
        await loadRolesToState();
    
    for (const el of elements) {
        el.innerHTML = '';
        let addone = el.getAttribute('data-roles') !== 'true';

        if (addone)
            el.innerHTML += '<option value="' + state.roles[0].id + '">None</option>';
        else 
            el.innerHTML += '';

        for (const role of state.roles) {
            el.innerHTML += '<option value="' + role.id + '" ' + (callback(el, role, state.roles) ? 'selected' : '') + '>' + (role.name[0] === '@' ? '' : '@') + role.name + '</option>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    startProcess();
    window.state = window.state || {};

    axios.get(`${CONFIG.endpoint}/config/${CONFIG.guild_id}?token=${CONFIG.token}`)
    .then(res => {
        window.state.config = res.data;
        typeof CONFIG.configCallback === 'function' ? CONFIG.configCallback(res.data) : null;

        // load basic config data
        loadConfigValues();
        loadConfigValuesJSON();

        // load channels to select elements
        loadChannels(document.querySelectorAll('[data-channels]'), (el, channel) => {
            if (el.getAttribute('name') === 'logging_channel') 
                return channel.id === state.config.logging_channel;
            if (el.getAttribute('name') === 'announcement_channel') 
                return channel.id === state.config.announcement_channel;
            if (el.getAttribute('name') === 'starboard_channel') 
                return channel.id === state.config.starboard.channel;
            if (el.getAttribute('name') === 'logging_channel_join_leave') 
                return channel.id === state.config.logging_channel_join_leave;
        });

        // load roles to select elements
        loadRoles(document.querySelectorAll('[data-roles]'), (el, role) => {
            if (el.getAttribute('name') === 'mod_role') 
                return role.id === state.config.mod_role;
            if (el.getAttribute('name') === 'gen_role') 
                return role.id === state.config.gen_role;
            if (el.getAttribute('name') === 'muted_role') 
                return role.id === state.config.mute_role;
        });

        endProcess();
    })
    .catch(e => {
        alert('There was an error while trying to fetch data from the API.');
        console.log(e);

        endProcess();
    });
});