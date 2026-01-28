const masterWrapper = document.getElementById('master-wrapper');
const btnBack = document.getElementById('btn-back');

const allPanels = document.querySelectorAll('.main-container-right > section');
const links = document.querySelectorAll('.menu-list a');

const projectsContainer = document.getElementById("projects-container");
const gridContainer = document.getElementById('project-grid-images');

const lightbox = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');

const experienceContainer = document.getElementById("experience-list");

window.addEventListener('load', function () {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const content = document.getElementById('content');
    loaderWrapper.classList.add('fade-out');
    
    if (content) {
        content.style.display = 'block';
    }

    setTimeout(() => {
        loaderWrapper.remove();
    }, 1000);
});

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
  '/src/assets/images/thumb*_*.jpg',
  { eager: true, query: '?url', import: 'default' }
);

// Obtener las keys y ordenarlas alfabéticamente
const sortedKeys = Object.keys(thumbs).sort();

// Crear array de proyectos en orden
const projects = sortedKeys.map((key, index) => ({
  thumb: thumbs[key],
  alt: `Project ${index + 1}`
}));

projects.forEach((project, index) => {
  const img = document.createElement("img");
  img.src = project.thumb;
  img.alt = project.alt;
  img.dataset.index = index;
  img.className = "project-thumb-btn";
  projectsContainer.appendChild(img);
});

const detailImages = import.meta.glob(
  '/src/assets/images/detail*_*.webp',
  { eager: true, query: '?url', import: 'default' }
);

const projectsData = [
  {
    title: "Tenpo",
    year: "2025",
    description: "Spearheaded the end-to-end development and deployment of 10+ high-conversion landing pages using Webflow, enhanced with custom HTML/CSS and JavaScript for advanced functionality. I specialized in bridging the gap between design and technical execution, collaborating closely with UX/UI teams to launch a mission-critical emergency portal focused on accessibility and performance. Beyond visual development, I architected a seamless content workflow by integrating Azure-hosted legal assets into the Webflow CMS and managed monthly feature updates under strict QA and version control standards. My proactive approach to resolving production incidents and working within CI/CD pipelines ensured a robust, scalable, and high-quality user experience.",
    tags: ["Webflow CMS", "JavaScript (ES6+)", "HTML5 & CSS3", "Azure Cloud Storage", "UI/UX", "QA", "Performance Optimization", "Accessibility" ],
    images: [
      detailImages['/src/assets/images/detail1_p1.webp'],
      detailImages['/src/assets/images/detail2_p1.webp'],
      detailImages['/src/assets/images/detail3_p1.webp'],
      detailImages['/src/assets/images/detail4_p1.webp']
    ]
  },
  {
    title: "Tenpo Banking Emergency Portal",
    year: "2025",
    description: "I led the UI design and technical implementation of Tenpo’s banking emergency portal, a mission-critical platform requiring high availability and precision. Working at the intersection of product and engineering, I architected the site’s information hierarchy and interaction flows, translating high-fidelity Figma prototypes into a robust Webflow production environment. My role focused on upholding strict corporate design systems while proactively integrating UX enhancements that improved navigation and clarity for users in high-stress financial scenarios. By bridging the gap between design vision and technical deployment, I ensured a seamless, responsive, and secure digital experience that met rigorous brand and performance standards.",
    tags: ["Webflow", "Figma", "UI/UX", "Design Systems", "JavaScript", "Responsive Design", "Prototyping"],
    images: [
      detailImages['/src/assets/images/detail1_p2.webp'],
      detailImages['/src/assets/images/detail2_p2.webp'],
      detailImages['/src/assets/images/detail3_p2.webp'],
      detailImages['/src/assets/images/detail4_p2.webp']
    ]
  },
  {
    title: "eTiza",
    year: "2023 - 2024",
    description: "I orchestrated the comprehensive redesign of a technology-driven corporate website, strategically integrating AI-focused visual metaphors and online education motifs to strengthen the brand’s digital identity. Utilizing Figma for rapid prototyping and iterative testing, I transitioned the conceptual vision into a high-performance frontend using HTML, CSS, and JavaScript, ensuring a fully responsive and accessible experience. Beyond the technical build, I acted as a technical mentor by training the internal team on web development fundamentals and Git version control, successfully establishing a more structured, collaborative, and professionalized engineering workflow.",
    tags: ["HTML5 & CSS3", "JavaScript", "Figma", "Git & GitHub", "UI/UX", "Team Mentorship", "Prototyping"],
    images: [
      detailImages['/src/assets/images/detail1_p3.webp'],
      detailImages['/src/assets/images/detail2_p3.webp'],
      detailImages['/src/assets/images/detail3_p3.webp']
    ]
  },
  {
    title: "eTiza Interactive Website",
    year: "2024",
    description: "I pioneered the development of interactive microsites by integrating custom 3D assets into the browser, leveraging Three.js to create seamless, immersive user experiences. This initiative involved deep R&D into WebGL capabilities, focusing on the real-time rendering of complex models authored in Blender. By bridging the gap between 3D animation and frontend engineering, I successfully deployed functional prototypes that allow for fluid, low-latency user interaction with spatial environments. The result is a sophisticated fusion of visual storytelling and high-performance web development that pushes the boundaries of standard UI patterns.",
    tags: ["Three.js", "WebGL", "Blender", "3D Modeling & Animation", "JavaScript (ES6+)", "Interactive Design"],
    images: [
      detailImages['/src/assets/images/detail1_p4.webp'],
      detailImages['/src/assets/images/detail2_p4.webp'],
      detailImages['/src/assets/images/detail3_p4.webp']
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


lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
        if (!lightbox.classList.contains('active')) {
            lightbox.classList.add('hidden');
        }
    }, 400);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
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
