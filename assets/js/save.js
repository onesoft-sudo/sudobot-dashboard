(() => {
    const inputs = [...document.querySelectorAll("input, select, textarea")];
    const toast = document.querySelector('.sudotoast');
    const saveBtn = document.querySelector('#saveBtn');
    const discardBtn = document.querySelector('#discardBtn');
    const form = document.querySelector('form');

    let modificationStateShowed = true;

    if (inputs.length > 0) {
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                if (modificationStateShowed) {
                    toast.classList.add('open');
                    modificationStateShowed = false;
                }
            });

            input.addEventListener('keypress', () => {
                if (modificationStateShowed) {
                    toast.classList.add('open');
                    modificationStateShowed = false;
                }
            });
        });
    }

    discardBtn.addEventListener('click', () => {
        modificationStateShowed = true;
        toast.classList.remove('open');
        window.location.reload();
    });

    saveBtn.addEventListener('click', () => {
        document.querySelector('form button[type=\'submit\']').click();
        toast.classList.remove('open');
        saveBtn.innerHTML = 'Saving...';
        saveBtn.classList.add('disabled');
    });
})();