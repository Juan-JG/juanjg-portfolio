const panels = document.querySelectorAll('.main_container--right > div');
const master = document.getElementById('master');
const detailSheet = document.getElementById('detail-sheet');
const btnBack = document.getElementById('btn-back');
const allPanels = document.querySelectorAll('.main_container--right > div');
const links = document.querySelectorAll('.menu_list a');
const catThumbnails = document.querySelectorAll('.project_thumbnails img');

const sheets = [
    // Subimos un nivel (..) a la raíz, entramos a src/ y luego a assets/
    new URL('../src/assets/sheet1.jpg', import.meta.url).href,
    new URL('../src/assets/sheet2.jpg', import.meta.url).href,
];

links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        allPanels.forEach(panel => panel.classList.remove('active'));
        allPanels[index].classList.add('active');
    });
});

//Close panel at outside click
document.addEventListener('click', (e) => {
    const isClickInsidePanel = e.target.closest('.main_container--right');
    const isClickOnMenu = e.target.closest('.menu_list');
    if (!isClickInsidePanel && !isClickOnMenu && e.target.id !== 'btn-back') {
        allPanels.forEach(panel => panel.classList.remove('active'));
    }
});


// Click on a project thumbnail to get its details
catThumbnails.forEach(cat => {
    cat.addEventListener('click', (e) => {
        e.preventDefault();
        const index = cat.getAttribute('data-index');
        const sheetUrl = sheets[index];

        if (sheetUrl) {
            detailSheet.src = sheetUrl;
            master.classList.add('is-viewing-project');
        }
    });
});
//Go back button, set projects thumbnails panel as active panel 
btnBack.addEventListener('click', (e) => {
    e.stopPropagation();
    master.classList.remove('is-viewing-project');
    setTimeout(() => {
        detailSheet.src = "";
    }, 850); 

    const projectsPanel = document.querySelector('.bg_2');
    const allPanels = document.querySelectorAll('.main_container--right > div');
    allPanels.forEach(p => p.classList.remove('active'));
    projectsPanel.classList.add('active');
});