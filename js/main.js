const panels = document.querySelectorAll('.main_container--right > div');
const master = document.getElementById('master');
const detailSheet = document.getElementById('detail-sheet');
const btnBack = document.getElementById('btn-back');
const allPanels = document.querySelectorAll('.main_container--right > div');
const links = document.querySelectorAll('.menu_list a');
const catThumbnails = document.querySelectorAll('.project_thumbnails img');

const sheets = [
    // Subimos un nivel (..) a la raíz, entramos a src/ y luego a assets/
    new URL('../src/assets/images/sheet1.jpg', import.meta.url).href,
    new URL('../src/assets/images/sheet2.jpg', import.meta.url).href,
];

links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        allPanels.forEach(panel => panel.classList.remove('active'));
        allPanels[index].classList.add('active');
    });
});

//Cerrar panel en outside click
document.addEventListener('click', (e) => {
    const isClickInsidePanel = e.target.closest('.main_container--right');
    const isClickOnMenu = e.target.closest('.menu_list');
    
    if (!isClickInsidePanel && !isClickOnMenu && e.target.id !== 'btn-back') {
        // Quitar active de los paneles
        allPanels.forEach(panel => panel.classList.remove('active'));
        
        // Quitar active de los links del menu
        links.forEach(link => link.classList.remove('active'));
    }
});


// Click en thumbnail para ver detalles
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
//Al presionar volver, vuelve al panel de proyectos
btnBack.addEventListener('click', (e) => {
    e.stopPropagation();
    master.classList.remove('is-viewing-project');
    setTimeout(() => {
        detailSheet.src = "";
    }, 850); 

    const projectsPanel = document.querySelector('.bg_3');
    const allPanels = document.querySelectorAll('.main_container--right > div');
    allPanels.forEach(p => p.classList.remove('active'));
    projectsPanel.classList.add('active');
});
const navlink = document.querySelectorAll('.nav-link');

links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Limpiar estados previos de paneles y links
        allPanels.forEach(panel => panel.classList.remove('active'));
        links.forEach(l => l.classList.remove('active'));
        
        // Activar el panel y el link actual
        allPanels[index].classList.add('active');
        link.classList.add('active');
    });
});
const scrollContainer = document.querySelector('.bg_2');
scrollContainer.scrollTop = 0; // Esto resetea el scroll al inicio