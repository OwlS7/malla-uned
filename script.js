// Datos completos de la malla curricular por bloques
const asignaturas = {
    diplomado: {
        "A": {
            titulo: "Bloque A (16 Créditos)",
            asignaturas: [
                {
                    nombre: "Humanidades 1",
                    codigo: "",
                    creditos: 3,
                    tipo: "humanidades",
                    requisitos: []
                },
                {
                    nombre: "Humanidades 2",
                    codigo: "",
                    creditos: 3,
                    tipo: "humanidades",
                    requisitos: []
                },
                {
                    nombre: "Lógica Algorítmica",
                    codigo: "03304",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: []
                },
                {
                    nombre: "Matemática para Computación I",
                    codigo: "03068",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: []
                },
                {
                    nombre: "Inglés para Informática",
                    codigo: "00997",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: []
                }
            ]
        },
        "B": {
            titulo: "Bloque B (15 Créditos)",
            asignaturas: [
                {
                    nombre: "Humanidades 3",
                    codigo: "",
                    creditos: 3,
                    tipo: "humanidades",
                    requisitos: []
                },
                {
                    nombre: "Principios de Administración",
                    codigo: "04038",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: []
                },
                {
                    nombre: "Lógica para Computación",
                    codigo: "03071",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["03304"]
                },
                {
                    nombre: "Matemática para Computación II",
                    codigo: "03069",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["03068"]
                },
                {
                    nombre: "Inglés para Informática II",
                    codigo: "03072",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00997"]
                }
            ]
        },
        "C": {
            titulo: "Bloque C (19 Créditos)",
            asignaturas: [
                {
                    nombre: "Humanidades 4",
                    codigo: "",
                    creditos: 3,
                    tipo: "humanidades",
                    requisitos: []
                },
                {
                    nombre: "Contabilidad I",
                    codigo: "00226",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: []
                },
                {
                    nombre: "Introducción a la Programación",
                    codigo: "00831",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["03071", "03069", "03072"]
                },
                {
                    nombre: "Organización de Computadoras",
                    codigo: "00823",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["03069", "03071"]
                },
                {
                    nombre: "Estadística I",
                    codigo: "00104",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: []
                }
            ]
        },
        "D": {
            titulo: "Bloque D (14 Créditos)",
            asignaturas: [
                {
                    nombre: "Programación Intermedia",
                    codigo: "00824",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["00831"]
                },
                {
                    nombre: "Base de Datos",
                    codigo: "00826",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00831"]
                },
                {
                    nombre: "Arquitectura de Computadores",
                    codigo: "03306",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["00831", "00823"]
                },
                {
                    nombre: "Telemática y Redes",
                    codigo: "00883",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00831", "00823"]
                }
            ]
        },
        "E": {
            titulo: "Bloque E (14 Créditos)",
            asignaturas: [
                {
                    nombre: "Programación Avanzada",
                    codigo: "00830",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["00824", "00826"]
                },
                {
                    nombre: "Ingeniería del Software",
                    codigo: "03300",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["00824", "00826"]
                },
                {
                    nombre: "Estructura de Datos",
                    codigo: "00825",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00824"]
                },
                {
                    nombre: "Sistemas Operativos",
                    codigo: "00881",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00824", "00823"]
                }
            ]
        }
    },
    bachillerato: {
        "F": {
            titulo: "Bloque F (14 Créditos)",
            asignaturas: [
                {
                    nombre: "Análisis y Diseño de Sistemas",
                    codigo: "03301",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["03300", "00830"]
                },
                {
                    nombre: "Fundamentos en Programación Web",
                    codigo: "03075",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00830"]
                },
                {
                    nombre: "Compiladores",
                    codigo: "03307",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["03306", "00823", "00824", "00825"]
                },
                {
                    nombre: "Curso Humanidades",
                    codigo: "",
                    creditos: 3,
                    tipo: "humanidades",
                    requisitos: []
                }
            ]
        },
        "G": {
            titulo: "Bloque G (14 Créditos)",
            asignaturas: [
                {
                    nombre: "Ingeniería de Requerimientos",
                    codigo: "03302",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["03301"]
                },
                {
                    nombre: "Base de Datos II",
                    codigo: "03084",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00826"]
                },
                {
                    nombre: "Soporte Técnico",
                    codigo: "03308",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["03306"]
                },
                {
                    nombre: "Seguridad y Auditoria en las TIC",
                    codigo: "03070",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00883", "00826"]
                }
            ]
        },
        "H": {
            titulo: "Bloque H (13 Créditos)",
            asignaturas: [
                {
                    nombre: "Telemática y Redes II",
                    codigo: "03076",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["00883", "00881"]
                },
                {
                    nombre: "Administración TIC",
                    codigo: "03305",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["04038"]
                },
                {
                    nombre: "Investigación de Operaciones para Ingeniería",
                    codigo: "03029",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: []
                },
                {
                    nombre: "Curso Humanidades",
                    codigo: "",
                    creditos: 3,
                    tipo: "humanidades",
                    requisitos: []
                }
            ]
        },
        "I": {
            titulo: "Bloque I (6 Créditos)",
            asignaturas: [
                {
                    nombre: "Autogestión y Desarrollo Empresarial",
                    codigo: "03073",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: ["03305"]
                },
                {
                    nombre: "Tendencias en las TIC",
                    codigo: "03077",
                    creditos: 3,
                    tipo: "profesional",
                    requisitos: []
                }
            ]
        },
        "J": {
            titulo: "Bloque J (4 Créditos)",
            asignaturas: [
                {
                    nombre: "Práctica o Proyecto Profesional",
                    codigo: "00886",
                    creditos: 4,
                    tipo: "profesional",
                    requisitos: ["Aprobar proceso de solicitud de tema TFG"],
                    modalidad: "Virtual"
                }
            ]
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Cargar inicialmente el diplomado
    cargarMalla('diplomado');
    
    // Manejar cambio entre diplomado y bachillerato
    document.querySelectorAll('.nivel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nivel-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const nivel = this.getAttribute('data-nivel');
            document.getElementById('diplomado-view').style.display = nivel === 'diplomado' ? 'block' : 'none';
            document.getElementById('bachillerato-view').style.display = nivel === 'bachillerato' ? 'block' : 'none';
            
            // Aplicar filtros al cambiar de nivel
            aplicarFiltros();
        });
    });

    // Configurar eventos de filtros
    document.getElementById('busqueda').addEventListener('input', aplicarFiltros);
    document.getElementById('filtro-bloque').addEventListener('change', aplicarFiltros);
});

function cargarMalla(nivel) {
    const contenedor = document.getElementById(`${nivel}-view`);
    contenedor.innerHTML = '';
    
    for (const [letraBloque, datosBloque] of Object.entries(asignaturas[nivel])) {
        const bloqueDiv = document.createElement('div');
        bloqueDiv.className = 'bloque';
        bloqueDiv.setAttribute('data-bloque', letraBloque);
        
        bloqueDiv.innerHTML = `
            <div class="bloque-header">
                <h2 class="bloque-title">${datosBloque.titulo}</h2>
                <span class="bloque-creditos">${datosBloque.asignaturas.reduce((sum, asig) => sum + asig.creditos, 0)} créditos</span>
            </div>
            <div class="asignaturas-grid"></div>
        `;
        
        const grid = bloqueDiv.querySelector('.asignaturas-grid');
        
        datosBloque.asignaturas.forEach(asignatura => {
            const card = document.createElement('div');
            card.className = `asignatura-card ${asignatura.tipo}`;
            
            let requisitosHTML = '';
            if (asignatura.requisitos && asignatura.requisitos.length > 0) {
                if (typeof asignatura.requisitos === 'string') {
                    requisitosHTML = `<div class="asignatura-requisitos">${asignatura.requisitos}</div>`;
                } else {
                    requisitosHTML = `<div class="asignatura-requisitos">Requisitos: ${asignatura.requisitos.join(', ')}</div>`;
                }
            }
            
            let codigoHTML = asignatura.codigo ? `<div class="asignatura-codigo">Código: ${asignatura.codigo}</div>` : '';
            
            card.innerHTML = `
                <div class="asignatura-title">${asignatura.nombre}</div>
                ${codigoHTML}
                <div class="asignatura-creditos">${asignatura.creditos} créditos</div>
                ${requisitosHTML}
                ${asignatura.modalidad ? `<div class="asignatura-modalidad">Modalidad: ${asignatura.modalidad}</div>` : ''}
            `;
            
            grid.appendChild(card);
        });
        
        contenedor.appendChild(bloqueDiv);
    }
}

function aplicarFiltros() {
    const nivelActivo = document.querySelector('.nivel-btn.active').getAttribute('data-nivel');
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    const filtroBloque = document.getElementById('filtro-bloque').value;
    
    const contenedor = document.getElementById(`${nivelActivo}-view`);
    const bloques = contenedor.querySelectorAll('.bloque');
    
    bloques.forEach(bloque => {
        const letraBloque = bloque.getAttribute('data-bloque');
        const mostrarBloque = filtroBloque === 'todos' || filtroBloque === letraBloque;
        
        bloque.style.display = mostrarBloque ? 'block' : 'none';
        
        if (mostrarBloque) {
            const cards = bloque.querySelectorAll('.asignatura-card');
            
            cards.forEach(card => {
                const textoCard = card.textContent.toLowerCase();
                const cumpleBusqueda = busqueda === '' || textoCard.includes(busqueda);
                
                card.style.display = cumpleBusqueda ? 'block' : 'none';
            });
        }
    });
}
