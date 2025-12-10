const rotator_cases = document.querySelectorAll('.rotator__case');
const rotator_cases_arr = Array.from(rotator_cases);
let idx = 0;

setInterval(() => {
    rotator_cases_arr.forEach(rot_case => {
        rot_case.classList.remove('rotator__case_active');
    });

    rotator_cases_arr[idx].classList.add('rotator__case_active');

    idx = (idx + 1) % rotator_cases_arr.length;
}, 1000);