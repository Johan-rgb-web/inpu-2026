document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------------
    // --- Lógica del Sistema de Pestañas (TABS) y Navegación Principal ---
    // --------------------------------------------------------------------------------

    const tabLinks = document.querySelectorAll('.nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Función para el toggle del menú en móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a, .nav button');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Función para cerrar el menú después de hacer clic en un enlace (en móvil)
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            });
        });
    }

    // Lógica principal de cambio de pestañas/tabs
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            // Si no hay target o es el botón de matrícula (que tiene target="_blank"), no ejecutamos la lógica de tabs.
            if (!targetElement || this.id === 'btn-matricula') return;

            e.preventDefault(); // Evita el salto de ancla/scroll por defecto.

            // 1. Ocultar todos los contenidos y desactivar todos los enlaces
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            tabLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            // 2. Mostrar el contenido objetivo y activar el enlace
            targetElement.classList.add('active');
            this.classList.add('active');

            // 3. Asegurar que el scroll esté al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Acción para el botón de Matrícula/Iniciar Sesión (ya es un <a> con target="_blank")
    const btnMatricula = document.getElementById('btn-matricula');
    if (btnMatricula) {
        btnMatricula.addEventListener('click', () => {
             // Puedes añadir una alerta o solo dejar el comportamiento del HTML
             // alert("¡Excelente decisión! Serás redirigido a nuestra página de inscripciones en línea.");
        });
    }
    
    // --- Scroll Suave para anclas internas (como el CTA del Hero) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --------------------------------------------------------------------------------
    // --- Lógica del Formulario del HERO (Página de Inicio) ---
    // --------------------------------------------------------------------------------
    
    const heroContactForm = document.getElementById('hero-contact-form');
    const heroFormMessage = document.getElementById('hero-form-message');

    if (heroContactForm) {
        heroContactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nombre = document.getElementById('hero-nombre').value;
            const celular = document.getElementById('hero-celular').value;

            if (nombre && celular && celular.length === 10) {
                heroFormMessage.textContent = '¡Tu cupo está reservado, ' + nombre + '! Te escribiremos a WhatsApp.';
                heroFormMessage.style.backgroundColor = '#d4edda';
                heroFormMessage.style.color = '#155724';
                heroFormMessage.style.padding = '10px';
                heroFormMessage.style.display = 'block';
                
                heroContactForm.reset();
                
                setTimeout(() => {
                    heroFormMessage.style.display = 'none';
                }, 5000);

            } else {
                heroFormMessage.textContent = 'Por favor, revisa tus datos.';
                heroFormMessage.style.backgroundColor = '#f8d7da';
                heroFormMessage.style.color = '#721c24';
                heroFormMessage.style.padding = '10px';
                heroFormMessage.style.display = 'block';
            }
        });
    }

    // --------------------------------------------------------------------------------
    // --- Lógica de Simulación de Portal Académico (portalacademico.html) ---
    // --------------------------------------------------------------------------------

    // Nota: Esta lógica está pensada para el archivo 'portalacademico.html',
    // por lo que solo se ejecutará si los elementos con estos IDs existen en la página.
    
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const mainContent = document.getElementById('app-content');
    const userNameSpan = document.getElementById('user-name');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const mainNavbar = document.getElementById('main-navbar'); 
    
    // --- Datos Ficticios (Simulación de Backend) ---
    const MOCK_USER_NAME = "Juan Pérez (Estudiante)";
    const MOCK_TEACHER_NAME = "Prof. Andrea Soto (Docente)";

    const courses = [
        { id: 1, title: "Matemáticas - Álgebra", teacher: "Prof. García", progress: "85%" },
        { id: 2, title: "Lenguaje y Comunicación", teacher: "Prof. Soto", progress: "60%" },
        { id: 3, title: "Historia Universal", teacher: "Prof. Morales", progress: "92%" },
        { id: 4, title: "Biología y Química", teacher: "Prof. Rojas", progress: "45%" },
    ];
    
    // Funciones de Navegación del Dashboard
    window.showSection = (sectionId) => {
        // Solo ejecutar si los elementos del dashboard existen (ej. estamos en portalacademico.html)
        if (!dashboardSection) return; 
        
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        
        dashboardSection.style.display = 'none';
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        if (sectionId === 'dashboard-section') {
             dashboardSection.style.display = 'block';
        }
        
        if (sectionId !== 'login-section' && loginSection) {
            loginSection.style.display = 'none';
        } else if (loginSection) {
            loginSection.style.display = 'block';
        }
        
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Función para cargar cursos del Dashboard
    function loadCourseList() {
        const courseListDiv = document.getElementById('course-list');
        if (!courseListDiv) return;
        
        courseListDiv.innerHTML = ''; 
        
        courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course-item';
            courseDiv.innerHTML = `
                <h4>${course.title}</h4>
                <p class="teacher">Docente: ${course.teacher}</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${course.progress};"></div>
                </div>
                <p class="progress-text">Progreso: ${course.progress}</p>
                <button class="view-material-btn" onclick="alert('Accediendo al material de ${course.title}')">Ver Contenido</button>
            `;
            courseListDiv.appendChild(courseDiv);
        });
    }

    // SIMULACIÓN DE INICIO DE SESIÓN
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            let authenticated = false;
            let userDisplay = "";
            
            if (username === 'estudiante' && password === '12345') {
                authenticated = true;
                userDisplay = MOCK_USER_NAME;
            } else if (username === 'profesor' && password === '12345') {
                authenticated = true;
                userDisplay = MOCK_TEACHER_NAME;
            }

            if (authenticated) {
                loginError.textContent = '';
                
                if (userNameSpan) userNameSpan.textContent = userDisplay; 
                if (mainNavbar) mainNavbar.style.display = 'flex'; 
                
                loadCourseList();
                window.showSection('dashboard-section');
                
            } else {
                loginError.textContent = 'Credenciales incorrectas. (Prueba: estudiante/12345)';
            }
        });
    }
    
    // SIMULACIÓN DE CIERRE DE SESIÓN
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert('Sesión cerrada correctamente.');
            
            if (mainNavbar) mainNavbar.style.display = 'none'; 
            
            // Limpiar campos
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            if (usernameInput) usernameInput.value = '';
            if (passwordInput) passwordInput.value = '';
            
            window.showSection('login-section');
        });
    }
    
    // EVENTO DE SIMULACRO
    const simulacrosList = document.getElementById('simulacros-list');
    if (simulacrosList) {
        simulacrosList.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-simulacro')) {
                alert(`Iniciando ${e.target.closest('li').textContent.split(' - ')[0]}.\n¡Mucha suerte!`);
            }
        });
    }

    // Inicialización para el Portal Académico
    if (loginSection) {
        window.showSection('login-section'); 
    }

});