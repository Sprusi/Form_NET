let FirstNet, SecondNET;
document.querySelector('.but-1').addEventListener('click', () => {
    let ip = document.querySelector('.form__input_ip-1').value;
    let mask = document.querySelector('.form__input_mask-1').value;

    let NET = getNET(ip, mask);
    if (NET == 1) {
        document.querySelector('.form__NET-1').innerHTML = 'Error. Check the format';
    }
    else {
        document.querySelector('.form__NET-1').innerHTML = NET;
        FirstNet = NET;
    }

    document.querySelector('.form__NET-1').classList.add("active");
});

document.querySelector('.but-2').addEventListener('click', () => {
    let ip = document.querySelector('.form__input_ip-2').value;
    let mask = document.querySelector('.form__input_mask-2').value;

    let NET = getNET(ip, mask);
    if (NET == 1) {
        document.querySelector('.form__NET-2').innerHTML = 'Error. Check the format';
    }
    else {
        document.querySelector('.form__NET-2').innerHTML = NET;
        SecondNET = NET;
    }

    document.querySelector('.form__NET-2').classList.add("active");
});

document.querySelector('.srav_krug').addEventListener('click', () => {

    if ((FirstNet == SecondNET) && (FirstNet != undefined)) {
        document.querySelector('.form__NET-1').classList.remove("red");
        document.querySelector('.form__NET-2').classList.remove("red");

        document.querySelector('.form__NET-1').classList.add("green");
        document.querySelector('.form__NET-2').classList.add("green");
    }
    else {
        document.querySelector('.form__NET-1').classList.remove("green");
        document.querySelector('.form__NET-2').classList.remove("green");

        document.querySelector('.form__NET-1').classList.add("red");
        document.querySelector('.form__NET-2').classList.add("red");
    }
});


function getNET(ip, mask) {

    let elIp = ip.split(".");
    let elMask = mask.split(".");

    if (elIp.length != 4 || elMask.length != 4) {
        return 1;
    }
    else {
        for (let i = 0; i < 4; i++) {
            const elementIp = elIp[i];
            const elementMask = elMask[i];

            elIp[i] = parseInt(elementIp).toString(2);
            let l = elIp[i].length;
            if (l < 8) {
                for (let j = 0; j < 8 - l; j++) {
                    elIp[i] = "0" + elIp[i];
                }
            }

            elMask[i] = parseInt(elementMask).toString(2);
            l = elMask[i].length;
            if (l < 8) {
                for (let j = 0; j < 8 - l; j++) {
                    elMask[i] = "0" + elMask[i];
                }

            }
        }


        let res = [];
        let elementRes = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                const symvolIp = elIp[i];
                const symvolMask = elMask[i];

                elementRes[j] = Number(symvolIp[j]) * Number(symvolMask[j]);
            }
            res[i] = elementRes.join('');
        }

        return res.join('.');
    }
};
