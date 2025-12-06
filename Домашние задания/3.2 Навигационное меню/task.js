const menu_links = document.querySelectorAll('.menu__link');
const ml_arr = Array.from(menu_links);

ml_arr.forEach(link => {
    link.onclick = function(event) {
        const menu_item = this.closest('.menu__item');
        const submenu = menu_item.querySelector('.menu_sub');

        if (submenu) {
            submenu.classList.toggle('menu_active');
            return false
        }

    };
});