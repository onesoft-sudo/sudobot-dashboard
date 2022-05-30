document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    startProcess();

    const submit = document.querySelector('button[type=submit]');

    submit.innerHTML = 'Saving Changes...';
    submit.classList.add('disabled');

    const qs = name => document.querySelector(`[name="${name}"]`);

    const data = {
        gen_role: qs('gen_role').value,
        mute_role: qs('muted_role').value,
        logging_channel: qs('logging_channel').value,
        logging_channel_join_leave: qs('logging_channel_join_leave').value,
        mod_role: qs('mod_role').value,
        announcement_channel: qs('announcement_channel').value,
        autoclear: {
            enabled: qs('autoclear_enabled').checked,
            channels: qs('autoclear_channels').value.split('\n').filter(e => e !== '')
        },
        spam_filter: {
            enabled: qs('spam_enabled').checked,
            limit: parseInt(qs('spam_limit').value),
            time: parseInt(qs('spam_time').value),
            diff: parseInt(qs('spam_diff').value),
            exclude: qs('spam_exclude').value.split('\n').filter(e => e !== ''),
            samelimit: parseInt(qs('spam_same').value),
            unmute_in: parseInt(qs('spam_unmute_in').value)
        },
        raid: {
            enabled: qs('raid_enabled').checked,
            max_joins: parseInt(qs('raid_max_join').value),
            time: parseInt(qs('raid_time').value),
            channels: qs('raid_channels').value.split('\n').filter(e => e !== ''),
            exclude: qs('raid_exclude').checked,
        },
        lockall: qs('lockall').value.split('\n').filter(e => e !== ''),
        // warn_notallowed: true,
        // global_commands: [
        //     "cat",
        //     "dog",
        //     "pixabay",
        //     "afk",
        //     "httpcat",
        //     "httpdog",
        //     "joke",
        //     "avatar",
        //     "profile"
        // ],
        // role_commands: {
        //     "957309094014889995": [],
        //     "961172512937508896": [
        //         "ban",
        //         "kick",
        //         "mute"
        //     ]
        // },
        filters: {
            ignore_staff: qs('blocked_invite_ignore_mods').checked,
            chars_repeated: parseInt(qs('spam_chars').value),
            words_repeated: parseInt(qs('spam_words').value),
            words: qs('blocked_words').value.split('\n').filter(e => e !== ''),
            regex: qs('regex').checked,
            words_enabled: qs('blocked_enabled').checked,
            invite_enabled: qs('invite_enabled').checked,
            words_excluded: qs('blocked_excluded').value.split('\n').filter(e => e !== ''),
            words_excluded: qs('blocked_excluded').value.split('\n').filter(e => e !== ''),
            invite_excluded: qs('invite_excluded').value.split('\n').filter(e => e !== ''),
            invite_message: qs('invite_message').value,
            file_mimes_excluded: [],
            file_types_excluded: [
                "exe",
                "msi",
                "mxbundle",
                "bat",
                "cmd",
                "ps1",
                "ps",
                "run",
                "sh",
                "bash",
                "apk",
                "xapk"
            ]
        }
    };

    console.clear();
    console.log(data);

    axios.post(`${CONFIG.endpoint}/config/mod/${CONFIG.guild_id}?token=${CONFIG.token}`, {
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