// Datos completos de la malla curricular
const mallaData = {
    diplomado: {
        "Bloque A (16 Créditos)": [
            { nombre: "Humanidades 1", codigo: "", creditos: 3, requisitos: [] },
            { nombre: "Humanidades 2", codigo: "", creditos: 3, requisitos: [] },
            { nombre: "Lógica Algorítmica", codigo: "03304", creditos: 4, requisitos: [] },
            { nombre: "Matemática para Computación I", codigo: "03068", creditos: 3, requisitos: [] },
            { nombre: "Inglés para Informática", codigo: "00997", creditos: 3, requisitos: [] }
        ],
        "Bloque B (15 Créditos)": [
            { nombre: "Humanidades 3", codigo: "", creditos: 3, requisitos: [] },
            { nombre: "Principios de Administración", codigo: "04038", creditos: 3, requisitos: [] },
            { nombre: "Lógica para Computación", codigo: "03071", creditos: 3, requisitos: ["03304"] },
            { nombre: "Matemática para Computación II", codigo: "03069", creditos: 3, requisitos: ["03068"] },
            { nombre: "Inglés para Informática II", codigo: "03072", creditos: 3, requisitos: ["00997"] }
        ],
        "Bloque C (19 Créditos)": [
            { nombre: "Humanidades 4", codigo: "", creditos: 3, requisitos: [] },
            { nombre: "Contabilidad I", codigo: "00226", creditos: 4, requisitos: [] },
            { nombre: "Introducción a la Programación", codigo: "00831", creditos: 4, requisitos: ["03071", "03069", "03072"] },
            { nombre: "Organización de Computadoras", codigo: "00823", creditos: 4, requisitos: ["03069", "03071"] },
            { nombre: "Estadística I", codigo: "00104", creditos: 4, requisitos: [] }
        ],
        "Bloque D (14 Créditos)": [
            { nombre: "Programación Intermedia", codigo: "00824", creditos: 4, requisitos: ["00831"] },
            { nombre: "Base de Datos", codigo: "00826", creditos: 3, requisitos: ["00831"] },
            { nombre: "Arquitectura de Computadores", codigo: "03306", creditos: 4, requisitos: ["00831", "00823"] },
            { nombre: "Telemática y Redes", codigo: "00883", creditos: 3, requisitos: ["00831", "00823"] }
        ],
        "Bloque E (14 Créditos)": [
            { nombre: "Programación Avanzada", codigo: "00830", creditos: 4, requisitos: ["00824", "00826"] },
            { nombre: "Ingeniería del Software", codigo: "03300", creditos: 4, requisitos: ["00824", "00826"] },
            { nombre: "Estructura de Datos", codigo: "00825", creditos: 3, requisitos: ["00824"] },
            { nombre: "Sistemas Operativos", codigo: "00881", creditos: 3, requisitos: ["00824", "00823"] }
        ]
    },
    bachillerato: {
        "Bloque F (14 Créditos)": [
            { nombre: "Análisis y Diseño de Sistemas", codigo: "03301", creditos: 4, requisitos: ["03300", "00830"] },
            { nombre: "Fundamentos en Programación Web", codigo: "03075", creditos: 3, requisitos: ["00830"] },
            { nombre: "Compiladores", codigo: "03307", creditos: 4, requisitos: ["03306", "00823", "00824", "00825"] },
            { nombre: "Curso Humanidades", codigo: "", creditos: 3, requisitos: [] }
        ],
        "Bloque G (14 Créditos)": [
            { nombre: "Ingeniería de Requerimientos", codigo: "03302", creditos: 4, requisitos: ["03301"] },
            { nombre: "Base de Datos II", codigo: "03084", creditos: 3, requisitos: ["00826"] },
            { nombre: "Soporte Técnico", codigo: "03308", creditos: 4, requisitos: ["03306"] },
            { nombre: "Seguridad y Auditoria en las TIC", codigo: "03070", creditos: 3, requisitos: ["00883", "00826"] }
        ],
        "Bloque H (13 Créditos)": [
            { nombre: "Telemática y Redes II", codigo: "03076", creditos: 3, requisitos: ["00883", "00881"] },
            { nombre: "Administración TIC", codigo: "03305", creditos: 4, requisitos: ["04038"] },
            { nombre: "Investigación de Operaciones para Ingeniería", codigo: "03029", creditos: 3, requisitos: [] },
            { nombre: "Curso Humanidades", codigo: "", creditos: 3, requisitos: [] }
        ],
        "Bloque I (6 Créditos)": [
            { nombre: "Autogestión y Desarrollo Empresarial", codigo: "03073", creditos: 3, requisitos: ["03305"] },
            { nombre: "Tendencias en las TIC", codigo: "03077", creditos: 3, requisitos: [] }
        ],
        "Bloque J (4 Créditos)": [
            { nombre: "Práctica o Proyecto Profesional", codigo: "00886", creditos: 4, requisitos: ["Aprobar proceso de solicitud de tema TFG"], modalidad: "Virtual" }
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Cargar malla inicial
    renderMalla('diplomado');
    
    // Cargar progreso guardado
    loadProgress();
    
    // Configurar eventos
    setupEventListeners();
});

function renderMalla(nivel) {
    const container = document.getElementById('bloques-container');
    container.innerHTML = '';
    
    if (nivel === 'todos') {
        renderNivel('diplomado');
        renderNivel('bachillerato');
    } else {
        renderNivel(nivel);
    }
    
    updateProgress();
}

function renderNivel(nivel) {
    const container = document.getElementById('bloques-container');
    const bloques = mallaData[nivel];
    
    for (const [bloqueNombre, asignaturas] of Object.entries(bloques)) {
        const bloqueDiv = document.createElement('div');
        bloqueDiv.className = 'bloque';
        bloqueDiv.dataset.nivel = nivel;
        
        // Cabecera del bloque
        const bloqueHeader = document.createElement('div');
        bloqueHeader.className = 'bloque-header';
        
        const bloqueTitle = document.createElement('h2');
        bloqueTitle.className = 'bloque-title';
        bloqueTitle.textContent = bloqueNombre;
        
        const bloqueCreditos = document.createElement('span');
        bloqueCreditos.className = 'bloque-creditos';
        const totalCreditos = asignaturas.reduce((sum, asig) => sum + asig.creditos, 0);
        bloqueCreditos.textContent = `${totalCreditos} créditos`;
        
        bloqueHeader.appendChild(bloqueTitle);
        bloqueHeader.appendChild(bloqueCreditos);
        bloqueDiv.appendChild(bloqueHeader);
        
        // Asignaturas
        asignaturas.forEach(asignatura => {
            const asignaturaDiv = document.createElement('div');
            asignaturaDiv.className = 'asignatura';
            asignaturaDiv.dataset.codigo = asignatura.codigo || asignatura.nombre.replace(/\s+/g, '-').toLowerCase();
            
            // Información de la asignatura
            const infoDiv = document.createElement('div');
            infoDiv.className = 'asignatura-info';
            
            const nombreSpan = document.createElement('div');
            nombreSpan.className = 'asignatura-nombre';
            nombreSpan.textContent = asignatura.nombre;
            
            const detallesDiv = document.createElement('div');
            detallesDiv.className = 'asignatura-detalles';
            
            if (asignatura.codigo) {
                const codigoSpan = document.createElement('span');
                codigoSpan.className = 'asignatura-codigo';
                codigoSpan.textContent = `Código: ${asignatura.codigo}`;
                detallesDiv.appendChild(codigoSpan);
            }
            
            const creditosSpan = document.createElement('span');
            creditosSpan.className = 'asignatura-creditos';
            creditosSpan.textContent = `${asignatura.creditos} créditos`;
            detallesDiv.appendChild(creditosSpan);
            
            if (asignatura.requisitos && asignatura.requisitos.length > 0) {
                const requisitosDiv = document.createElement('div');
                requisitosDiv.className = 'asignatura-requisitos';
                
                if (typeof asignatura.requisitos === 'string') {
                    requisitosDiv.textContent = `Requisitos: ${asignatura.requisitos}`;
                } else {
                    requisitosDiv.textContent = `Requisitos: ${asignatura.requisitos.join(', ')}`;
                }
                
                detallesDiv.appendChild(requisitosDiv);
            }
            
            if (asignatura.modalidad) {
                const modalidadDiv = document.createElement('div');
                modalidadDiv.className = 'asignatura-modalidad';
                modalidadDiv.textContent = `Modalidad: ${asignatura.modalidad}`;
                detallesDiv.appendChild(modalidadDiv);
            }
            
            infoDiv.appendChild(nombreSpan);
            infoDiv.appendChild(detallesDiv);
            
            // Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'asignatura-checkbox';
            checkbox.addEventListener('change', function() {
                asignaturaDiv.classList.toggle('aprobada', this.checked);
                saveProgress();
                updateProgress();
            });
            
            asignaturaDiv.appendChild(infoDiv);
            asignaturaDiv.appendChild(checkbox);
            bloqueDiv.appendChild(asignaturaDiv);
        });
        
        container.appendChild(bloqueDiv);
    }
}

function setupEventListeners() {
    // Botones de nivel
    document.querySelectorAll('.nivel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nivel-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderMalla(this.dataset.nivel);
        });
    });
    
    // Búsqueda
    document.getElementById('search-input').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const asignaturas = document.querySelectorAll('.asignatura');
        
        asignaturas.forEach(asig => {
            const nombre = asig.querySelector('.asignatura-nombre').textContent.toLowerCase();
            const codigo = asig.dataset.codigo.toLowerCase();
            const matches = nombre.includes(searchTerm) || codigo.includes(searchTerm);
            asig.style.display = matches ? 'flex' : 'none';
        });
    });
    
    // Guardar progreso
    document.getElementById('save-btn').addEventListener('click', saveProgress);
    
    // Reiniciar progreso
    document.getElementById('reset-btn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
            localStorage.removeItem('malla-progress');
            document.querySelectorAll('.asignatura').forEach(asig => {
                asig.classList.remove('aprobada');
                asig.querySelector('.asignatura-checkbox').checked = false;
            });
            updateProgress();
            alert('Progreso reiniciado correctamente');
        }
    });
}

function saveProgress() {
    const progress = {};
    
    document.querySelectorAll('.asignatura').forEach(asig => {
        const codigo = asig.dataset.codigo;
        progress[codigo] = asig.classList.contains('aprobada');
    });
    
    localStorage.setItem('malla-progress', JSON.stringify(progress));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('malla-progress');
    if (!savedProgress) return;
    
    const progress = JSON.parse(savedProgress);
    
    document.querySelectorAll('.asignatura').forEach(asig => {
        const codigo = asig.dataset.codigo;
        if (progress[codigo]) {
            asig.classList.add('aprobada');
            asig.querySelector('.asignatura-checkbox').checked = true;
        }
    });
    
    updateProgress();
}

function updateProgress() {
    const totalAsignaturas = document.querySelectorAll('.asignatura').length;
    const aprobadas = document.querySelectorAll('.asignatura.aprobada').length;
    
    // Calcular créditos aprobados
    let creditosAprobados = 0;
    document.querySelectorAll('.asignatura.aprobada').forEach(asig => {
        const creditosText = asig.querySelector('.asignatura-creditos').textContent;
        const creditos = parseInt(creditosText);
        creditosAprobados += isNaN(creditos) ? 0 : creditos;
    });
    
    // Actualizar UI
    document.getElementById('aprobadas-count').textContent = aprobadas;
    document.getElementById('total-asignaturas').textContent = totalAsignaturas;
    document.getElementById('creditos-aprobados').textContent = creditosAprobados;
    
    // Actualizar barras de progreso
    const porcentajeAsignaturas = totalAsignaturas > 0 ? (aprobadas / totalAsignaturas) * 100 : 0;
    const porcentajeCreditos = (creditosAprobados / 129) * 100;
    
    document.getElementById('asignaturas-progress').style.width = `${porcentajeAsignaturas}%`;
    document.getElementById('creditos-progress').style.width = `${porcentajeCreditos}%`;
}
