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

// Variables globales
let currentView = 'diplomado';
let progresoGlobal = {};

// Cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarProgreso();
    cargarMalla();
    configurarEventos();
});

function cargarMalla() {
    const container = document.getElementById('bloques-container');
    container.innerHTML = '';

    if (currentView === 'todos') {
        cargarBloques(mallaData.diplomado);
        cargarBloques(mallaData.bachillerato);
    } else {
        cargarBloques(mallaData[currentView]);
    }
}

function cargarBloques(bloquesData) {
    const container = document.getElementById('bloques-container');

    for (const [nombreBloque, asignaturas] of Object.entries(bloquesData)) {
        const bloqueDiv = document.createElement('div');
        bloqueDiv.className = 'bloque';

        // Cabecera del bloque
        const bloqueHeader = document.createElement('div');
        bloqueHeader.className = 'bloque-header';

        const tituloBloque = document.createElement('h2');
        tituloBloque.className = 'bloque-title';
        tituloBloque.textContent = nombreBloque;

        const creditosBloque = document.createElement('span');
        creditosBloque.className = 'bloque-creditos';
        const totalCreditos = asignaturas.reduce((sum, asig) => sum + asig.creditos, 0);
        creditosBloque.textContent = `${totalCreditos} créditos`;

        bloqueHeader.appendChild(tituloBloque);
        bloqueHeader.appendChild(creditosBloque);
        bloqueDiv.appendChild(bloqueHeader);

        // Asignaturas
        asignaturas.forEach(asignatura => {
            const asignaturaDiv = document.createElement('div');
            const codigoAsignatura = asignatura.codigo || asignatura.nombre.replace(/\s+/g, '-').toLowerCase();
            asignaturaDiv.className = 'asignatura';
            asignaturaDiv.dataset.codigo = codigoAsignatura;

            // Aplicar estado si está en progresoGlobal
            if (progresoGlobal[codigoAsignatura]) {
                asignaturaDiv.classList.add('aprobada');
            }

            // Información de la asignatura
            const infoDiv = document.createElement('div');
            infoDiv.className = 'asignatura-info';

            const nombreAsignatura = document.createElement('div');
            nombreAsignatura.className = 'asignatura-nombre';
            nombreAsignatura.textContent = asignatura.nombre;

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

            infoDiv.appendChild(nombreAsignatura);
            infoDiv.appendChild(detallesDiv);
            asignaturaDiv.appendChild(infoDiv);

            // Evento para marcar como aprobada
            asignaturaDiv.addEventListener('click', function() {
                this.classList.toggle('aprobada');
                const codigo = this.dataset.codigo;
                progresoGlobal[codigo] = this.classList.contains('aprobada');
                actualizarProgreso();
            });

            bloqueDiv.appendChild(asignaturaDiv);
        });

        container.appendChild(bloqueDiv);
    }
    
    actualizarProgreso();
}

function configurarEventos() {
    // Botones de navegación
    document.getElementById('btn-diplomado').addEventListener('click', function() {
        currentView = 'diplomado';
        actualizarBotones();
        cargarMalla();
    });

    document.getElementById('btn-bachillerato').addEventListener('click', function() {
        currentView = 'bachillerato';
        actualizarBotones();
        cargarMalla();
    });

    document.getElementById('btn-todos').addEventListener('click', function() {
        currentView = 'todos';
        actualizarBotones();
        cargarMalla();
    });

    // Botón guardar
    document.getElementById('btn-guardar').addEventListener('click', guardarProgreso);
}

function actualizarBotones() {
    document.querySelectorAll('.nivel-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${currentView}`).classList.add('active');
}

function guardarProgreso() {
    localStorage.setItem('malla-progreso', JSON.stringify(progresoGlobal));
    alert('Progreso guardado correctamente');
}

function cargarProgreso() {
    const progresoGuardado = localStorage.getItem('malla-progreso');
    if (progresoGuardado) {
        progresoGlobal = JSON.parse(progresoGuardado);
    }
}

function actualizarProgreso() {
    // Totales fijos según la malla curricular
    const totalCreditosDiplomado = 78;
    const totalCreditosBachillerato = 51;
    const totalCreditosGeneral = totalCreditosDiplomado + totalCreditosBachillerato;
    
    let creditosDiplomado = 0;
    let creditosBachillerato = 0;
    let asignaturasAprobadas = 0;
    
    // Calcular créditos aprobados
    for (const [nivel, bloques] of Object.entries(mallaData)) {
        for (const bloque of Object.values(bloques)) {
            for (const asignatura of bloque) {
                const codigo = asignatura.codigo || asignatura.nombre.replace(/\s+/g, '-').toLowerCase();
                if (progresoGlobal[codigo]) {
                    asignaturasAprobadas++;
                    if (nivel === 'diplomado') {
                        creditosDiplomado += asignatura.creditos;
                    } else {
                        creditosBachillerato += asignatura.creditos;
                    }
                }
            }
        }
    }
    
    const creditosGenerales = creditosDiplomado + creditosBachillerato;
    
    // Actualizar estadísticas
    document.getElementById('aprobadas-count').textContent = asignaturasAprobadas;
    document.getElementById('creditos-aprobados').textContent = creditosGenerales;
    document.getElementById('diplomado-creditos').textContent = creditosDiplomado;
    document.getElementById('bachillerato-creditos').textContent = creditosBachillerato;
    
    // Calcular porcentajes (asegurando que no excedan el 100%)
    const porcentajeGeneral = Math.min(100, Math.round((creditosGenerales / totalCreditosGeneral) * 100));
    const porcentajeDiplomado = Math.min(100, Math.round((creditosDiplomado / totalCreditosDiplomado) * 100));
    const porcentajeBachillerato = Math.min(100, Math.round((creditosBachillerato / totalCreditosBachillerato) * 100));
    
    // Actualizar barras de progreso
    document.getElementById('general-fill').style.width = `${porcentajeGeneral}%`;
    document.getElementById('general-percent').textContent = `${porcentajeGeneral}%`;
    
    document.getElementById('diplomado-fill').style.width = `${porcentajeDiplomado}%`;
    document.getElementById('diplomado-percent').textContent = `${porcentajeDiplomado}%`;
    
    document.getElementById('bachillerato-fill').style.width = `${porcentajeBachillerato}%`;
    document.getElementById('bachillerato-percent').textContent = `${porcentajeBachillerato}%`;
}
