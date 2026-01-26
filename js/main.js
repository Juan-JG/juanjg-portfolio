const masterWrapper = document.getElementById('master-wrapper');
const btnBack = document.getElementById('btn-back');

const allPanels = document.querySelectorAll('.main-container-right > section');
const links = document.querySelectorAll('.menu-list a');

const projectsContainer = document.getElementById("projects-container");
const gridContainer = document.getElementById('project-grid-images');

const lightbox = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');

const experienceContainer = document.getElementById("experience-list");


links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        allPanels.forEach(panel => panel.classList.remove('active'));
        links.forEach(l => l.classList.remove('active'));

        allPanels[index].classList.add('active');
        link.classList.add('active');
    });
});


document.addEventListener('click', (e) => {
    if (masterWrapper.classList.contains('is-viewing-project')) return;

    const isClickInsidePanel = e.target.closest('.main-container-right');
    const isClickOnMenu = e.target.closest('.menu-list');

    if (!isClickInsidePanel && !isClickOnMenu && e.target.id !== 'btn-back') {
        allPanels.forEach(panel => panel.classList.remove('active'));
        links.forEach(link => link.classList.remove('active'));
    }
});


const experiences = [
  {
    year: "2025",
    title: "Creative Designer & Frontend • Tenpo",
    description:
      "Development and maintenance of institutional web platforms and landing pages for digital campaigns, integrating interface design (UX/UI) with frontend implementation to ensure performance and brand consistency.",
    link: "https://www.tenpo.cl/",
    skills: ["JavaScript", "three.js", "Webflow", "Figma", "Adobe CC"],
  },
  {
    year: "2024 - 2025",
    title: "UX/UI • Municipalidad de Concón",
    description:
      "Conceptualization and UI/UX design of a mobile application for the optimization of municipal recycling services. Management of the entire design cycle: from requirements gathering and user testing to the delivery of high-fidelity interactive prototypes for technical validation.",
    link: "https://www.concon.cl/",
    skills: [
      "User Research",
      "Design Thinking",
      "Figma",
      "Miro",
      "Optimal Workshop",
    ],
  },
  {
    year: "2023 - 2024",
    title: "Digital Designer, UI & Frontend • eTiza",
    description:
      "Comprehensive production of interactive multimedia resources for educational platforms, optimizing creative workflows and ensuring visual quality in high-volume deliveries.",
    link: "https://etiza.io/",
    skills: [
      "Adobe CC",
      "JavaScript",
      "three.js",
      "HTML & Bootstrap",
      "Figma",
      "Articulate Storyline & Rise",
    ],
  },
  {
    year: "2022",
    title: "Designer • DTS",
    description:
      "Design and prototyping of interfaces for self-service systems, integrating technical 3D visualization with the user experience on public devices.",
    link: "https://www.dts.cl/?lang=en",
    skills: [
      "Adobe CC",
      "Inventor",
      "Keyshot",
      "SolidWorks",
      "User Experience",
      "User Research",
    ],
  },
  {
    year: "2021 - 2022",
    title: "Graphic Designer • BEC Industrial",
    description:
      "Project documentation and creation of graphic elements for internal communication and signage.",
    link: "https://www.linkedin.com/company/becindustrial/?originalSubdomain=cl",
    skills: ["Adobe CC", "AutoCAD", "Outlook"],
  },
  {
    year: "2020 - 2021",
    title: "Design Software Instructor • Self-employed",
    description:
      "Online classes in graphic design and 3D modeling software, consulting on branding, and creation of digital educational resources.",
    link: null,
    skills: ["Adobe CC", "Rhinoceros", "HTML & CSS", "Blender", "Maya"],
  },
  {
    year: "2018 - 2020",
    title: "Design Software Instructor • Nanjing University of the Arts",
    description:
      "Classes for international students on design principles and software for the application of digital tools in artistic projects, presentations, and theses.",
    link: "https://en.nua.edu.cn/",
    skills: [
      "Adobe CC",
      "Rhinoceros",
      "Keyshot",
      "User Experience",
      "Design Thinking",
    ],
  },
  {
    year: "2017 - 2018",
    title: "Designer • Universo Implementations",
    description:
      "Preparation of manufacturing plans and equipment catalogs for urban sports, institutional, and residential spaces.",
    link: "https://www.universoimplementaciones.cl/",
    skills: [
      "Adobe CC",
      "Rhinoceros",
      "Keyshot",
      "User Experience",
      "Inventor",
    ],
  },
];

experiences.forEach((exp) => {
  const item = document.createElement("a");
  item.className = "experience-link experience-container";
  item.href = exp.link;
  item.target = "_blank";

  item.innerHTML = `
    <div><p>${exp.year}</p></div>
    <div class="job-container">
      <div>
        <p><strong>${exp.title}</strong></p>
      </div>
      <div>
        <p>${exp.description}</p>
      </div>
      <div class="ribbon-container">
        ${exp.skills
          .map(skill => `
            <div class="ribbon">
              <p>${skill}</p>
            </div>
          `)
          .join("")}
      </div>
    </div>
  `;

  experienceContainer.appendChild(item);
});


const thumbs = import.meta.glob(
  '../assets/images/thumb_*.jpg',
  {
    eager: true,
    query: '?url',
    import: 'default'
  }
);

const projects = [
  { thumb: thumbs['/src/assets/images/thumb_tenpo.jpg'], alt: "Tenpo" },
  { thumb: thumbs['/src/assets/images/thumb_etenpo.jpg'], alt: "Emergencias Tenpo" },
  { thumb: thumbs['/src/assets/images/thumb_etiza.jpg'], alt: "eTiza" },
  { thumb: thumbs['/src/assets/images/thumb_ietiza.jpg'], alt: "iTiza" },
  { thumb: thumbs['/src/assets/images/thumb_ecopunto.jpg'], alt: "Ecopunto" },
  { thumb: thumbs['/src/assets/images/thumb_navbar.jpg'], alt: "Navbar" },
  { thumb: thumbs['/src/assets/images/thumb_dts.jpg'], alt: "DTS" },
  { thumb: thumbs['/src/assets/images/thumb_nua.jpg'], alt: "NUA" }
];
projects.forEach((project, index) => {
  const img = document.createElement("img");
  img.src = project.thumb;
  img.alt = project.alt;
  img.dataset.index = index;
  img.className = "project-thumb-btn";
  projectsContainer.appendChild(img);
});


const projectsData = [
  {
    title: "eTiza Soluciones 1",
    year: "2023 - 2024",
    description: "Creación de más de 300 recursos educativos multimedia.",
    tags: ["Adobe CC", "JavaScript", "E-learning"],
    images: [
      'assets/images/detail1_p1.jpg',
      'assets/images/eTiza_2.jpg',
      'assets/images/eTiza_3.jpg',
      'assets/images/eTiza_4.jpg'
    ]
  },
  {
    title: "eTiza Soluciones 2",
    year: "2023 - 2024",
    description: "Creación de más de 300 recursos educativos multimedia.",
    tags: ["Adobe CC", "JavaScript", "E-learning"],
    images: [
      'assets/images/detail1_p1.jpg',
      'assets/images/eTiza_2.jpg',
      'assets/images/eTiza_3.jpg',
      'assets/images/eTiza_4.jpg'
    ]
  },
  {
    title: "eTiza Soluciones 3",
    year: "2023 - 2024",
    description: "Creación de más de 300 recursos educativos multimedia.",
    tags: ["Adobe CC", "JavaScript", "E-learning"],
    images: [
      'assets/images/detail1_p1.jpg',
      'assets/images/eTiza_2.jpg',
      'assets/images/eTiza_3.jpg',
      'assets/images/eTiza_4.jpg'
    ]
  },
  {
    title: "eTiza Soluciones 4",
    year: "2023 - 2024",
    description: "Creación de más de 300 recursos educativos multimedia.",
    tags: ["Adobe CC", "JavaScript", "E-learning"],
    images: [
      'assets/images/detail1_p1.jpg',
      'assets/images/eTiza_2.jpg',
      'assets/images/eTiza_3.jpg',
      'assets/images/eTiza_4.jpg'
    ]
  },
  {
    title: "eTiza Soluciones 5",
    year: "2023 - 2024",
    description: "Creación de más de 300 recursos educativos multimedia.",
    tags: ["Adobe CC", "JavaScript", "E-learning"],
    images: [
      'assets/images/detail1_p1.jpg',
      'assets/images/eTiza_2.jpg',
      'assets/images/eTiza_3.jpg',
      'assets/images/eTiza_4.jpg'
    ]
  },
  {
    title: "eTiza Soluciones 6",
    year: "2023 - 2024",
    description: "Creación de más de 300 recursos educativos multimedia.",
    tags: ["Adobe CC", "JavaScript", "E-learning"],
    images: [
      'assets/images/detail1_p1.jpg',
      'assets/images/eTiza_2.jpg',
      'assets/images/eTiza_3.jpg',
      'assets/images/eTiza_4.jpg'
    ]
  },
  {
    title: "eTiza Soluciones 7",
    year: "2023 - 2024",
    description: "Creación de más de 300 recursos educativos multimedia.",
    tags: ["Adobe CC", "JavaScript", "E-learning"],
    images: [
      'assets/images/detail1_p1.jpg',
      'assets/images/eTiza_2.jpg',
      'assets/images/eTiza_3.jpg',
      'assets/images/eTiza_4.jpg'
    ]
  },
  {
    title: "eTiza Soluciones 8",
    year: "2023 - 2024",
    description: "Creación de más de 300 recursos educativos multimedia.",
    tags: ["Adobe CC", "JavaScript", "E-learning"],
    images: [
      'assets/images/detail1_p1.jpg',
      'assets/images/eTiza_2.jpg',
      'assets/images/eTiza_3.jpg',
      'assets/images/eTiza_4.jpg'
    ]
  }
];


function openProject(index) {
    const data = projectsData[index];
    if (!data) return;

    document.getElementById('detail-title').innerText = data.title;
    document.getElementById('detail-year').innerText = data.year;
    document.getElementById('detail-text').innerText = data.description;

    const tagsContainer = document.getElementById('detail-tags');
    tagsContainer.innerHTML = data.tags
        .map(tag => `<div class="ribbon"><p>${tag}</p></div>`)
        .join("");

    gridContainer.innerHTML = data.images
        .map(src => `<img src="${src}" class="zoomable" alt="Project detail">`)
        .join("");

    masterWrapper.classList.add('is-viewing-project');
}


projectsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-thumb-btn")) {
    openProject(e.target.dataset.index);
  }
});


gridContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('zoomable')) {
        lightboxImg.src = e.target.src;
        lightbox.classList.remove('hidden');
        setTimeout(() => lightbox.classList.add('active'), 10);
    }
});


lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.classList.add('hidden'), 400);
    }
});


btnBack.addEventListener('click', (e) => {
    e.stopPropagation();
    masterWrapper.classList.remove('is-viewing-project');

    const projectsPanel = document.querySelector('.bg_3');
    const panels = document.querySelectorAll('.main_container--right > div');

    panels.forEach(p => p.classList.remove('active'));
    projectsPanel.classList.add('active');
});
