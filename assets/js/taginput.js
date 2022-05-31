window.refreshTags = () => {
    [...document.querySelectorAll('.input-tag .tags li')].forEach((tag, i) => {
        addCloseBtn(tag);
    });
};

window.addCloseBtn = function (tag) {
    const close = document.createElement('span');
    close.classList.add('close');
    close.innerHTML = '&times';

    close.addEventListener('click', function () {
        close.closest('li').remove();
    });

    tag.appendChild(close);
};

window.tagsInit = () => {
    const tagInputs = [...document.querySelectorAll('.input-tag')];
    const tags = [...document.querySelectorAll('.input-tag .tags')];
    const tagLists = [...document.querySelectorAll('.input-tag .tags li')];
    const inputs = [...document.querySelectorAll('.input-tag input')];
    const acs = [...document.querySelectorAll('.input-tag-wrapper .autocomplete')];

    for (const i in tagInputs) {
        const reload = (value) => {
            let dataArray = state[acs[i].getAttribute('data-fill')];

            if (window.methods.tagFilters[acs[i].getAttribute('method')])
                dataArray = window.methods.tagFilters[acs[i].getAttribute('method')](dataArray, tags[i], value);

            acs[i].innerHTML = '';
            
            for (const data of dataArray) {
                const li = document.createElement('li');
                li.setAttribute('data-value', data.id);
                li.innerHTML = data.name.replace(' ', '&nbsp;');

                li.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('here');
                    const newLi = document.createElement('li');
                    newLi.classList.add('tags-li');
                    newLi.setAttribute('data-value', li.getAttribute('data-value'));
                    newLi.innerHTML = li.innerHTML;
                    addCloseBtn(newLi);
                    tags[i].appendChild(newLi);
                    inputs[i].value = '';
                });
                
                acs[i].appendChild(li);
            }
        };

        inputs[i].addEventListener('keyup', function (e) {
            // if (e.key === ' ') {
            //     const { value } = inputs[i];

            //     const li = document.createElement('li');
            //     li.classList.add('tags-li');
            //     li.innerHTML = value;
            //     addCloseBtn(li);

            //     tags[i].appendChild(li);

            //     inputs[i].value = '';
            // }
            if (e.key === 'Backspace' && inputs[i].value === '') {
                const lists = [...this.closest('div').children[0].children];
                lists[lists.length - 1]?.remove();
                reload();
            }
            else {
                reload(inputs[i].value);
            }
        });

        tagInputs[i].addEventListener('click', () => inputs[i].focus());

        inputs[i].addEventListener('focus', function (e) {
            tagInputs[i].classList.add('focused');
            acs[i].style.display = 'block';
            reload();
        });

        inputs[i].addEventListener('blur', function (e) {
            tagInputs[i].classList.remove('focused');
            setTimeout(() => {
                acs[i].style.display = 'none';
            }, 500);
        });
    }
};