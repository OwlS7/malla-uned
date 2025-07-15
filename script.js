// Datos de la malla curricular (igual que antes)
const asignaturas = {
    // ... (mantén la estructura de datos anterior) ...
};

document.addEventListener('DOMContentLoaded', function() {
    cargarMallaCompleta();
    cargarProgresoGuardado();
    actualizarResumenProgreso();
    
    // Manejar cambio entre niveles
    document.querySelectorAll('.nivel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nivel-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const nivel = this.getAttribute('data-nivel');
            filtrarPorNivel(nivel);
        });
    });

    // Configurar eventos
    document.getElementById('busqueda').addEventListener('input', aplicarFiltros);
    document.getElementById('btn-guardar').addEventListener('click', guardarProgreso);
    document.getElementById('btn-limpiar').addEventListener('click', reiniciarProgreso);
});

function cargarMallaCompleta() {
    const contenedor = document.querySelector('.bloques-container');
    contenedor.innerHTML = '';
    
    // Cargar bloques del diplomado (A-E)
    for (let letra = 'A'; letra <= 'E'; letra = String.fromCharCode(letra.charCodeAt(0) + 1)) {
        if (asignaturas.diplomado[letra]) {
            crearBloque(asignaturas.diplomado[letra], letra);
        }
    }
    
    // Cargar bloques del bachillerato (F-J)
    for (let letra = 'F'; letra <= 'J'; letra = String.fromCharCode(letra.charCodeAt(0) + 1)) {
        if (asignaturas.bachillerato[letra]) {
            crearBloque(asignaturas.bachillerato[letra], letra);
        }
    }
}

function crearBloque(datosBloque, letraBloque) {
    const contenedor = document.querySelector('.bloques-container');
    
    const bloqueDiv = document.createElement('div');
    bloqueDiv.className = 'bloque';
    bloqueDiv.setAttribute('data-bloque', letraBloque);
    bloqueDiv.setAttribute('data-nivel', letraBloque <= 'E' ? 'diplomado' : 'bachillerato');
    
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
        card.className = 'asignatura-card';
        card.setAttribute('data-codigo', asignatura.codigo || asignatura.nombre.replace(/\s+/g, '-'));
        
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
            <input type="checkbox" class="checkbox-aprobada" id="chk-${asignatura.codigo || asignatura.nombre.replace(/\s+/g, '-')}">
            <div class="asignatura-title">${asignatura.nombre}</div>
            ${codigoHTML}
            <div class="asignatura-creditos">${asignatura.creditos} créditos</div>
            ${requisitosHTML}
            ${asignatura.modalidad ? `<div class="asignatura-modalidad">Modalidad: ${asignatura.modalidad}</div>` : ''}
        `;
        
        const checkbox = card.querySelector('.checkbox-aprobada');
        checkbox.addEventListener('change', function() {
            card.classList.toggle('aprobada', this.checked);
            actualizarResumenProgreso();
        });
        
        grid.appendChild(card);
    });
    
    contenedor.appendChild(bloqueDiv);
}

function filtrarPorNivel(nivel) {
    const bloques = document.querySelectorAll('.bloque');
    
    bloques.forEach(bloque => {
        if (nivel === 'todos') {
            bloque.style.display = 'block';
        } else {
            const bloqueNivel = bloque.getAttribute('data-nivel');
            bloque.style.display = bloqueNivel === nivel ? 'block' : 'none';
        }
    });
}

function aplicarFiltros() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    const bloques = document.querySelectorAll('.bloque');
    
    bloques.forEach(bloque => {
        if (bloque.style.display !== 'none') {
            const cards = bloque.querySelectorAll('.asignatura-card');
            
            cards.forEach(card => {
                const textoCard = card.textContent.toLowerCase();
                const cumpleBusqueda = busqueda === '' || textoCard.includes(busqueda);
                
                card.style.display = cumpleBusqueda ? 'block' : 'none';
            });
        }
    });
}

function actualizarResumenProgreso() {
    const totalAsignaturas = document.querySelectorAll('.asignatura-card').length;
    const aprobadas = document.querySelectorAll('.asignatura-card.aprobada').length;
    const pendientes = totalAsignaturas - aprobadas;
    
    // Calcular créditos completados
    let creditosCompletados = 0;
    document.querySelectorAll('.asignatura-card.aprobada').forEach(card => {
        const creditosText = card.querySelector('.asignatura-creditos').textContent;
        const creditos = parseInt(creditosText);
        creditosCompletados += isNaN(creditos) ? 0 : creditos;
    });
    
    // Actualizar UI
    document.getElementById('aprobadas-count').textContent = aprobadas;
    document.getElementById('pendientes-count').textContent = pendientes;
    document.getElementById('creditos-completados').textContent = creditosCompletados;
    
    const porcentaje = Math.round((aprobadas / totalAsignaturas) * 100);
    document.getElementById('progreso-total').textContent = `${porcentaje}%`;
    document.getElementById('progress-fill').style.width = `${porcentaje}%`;
}

function guardarProgreso() {
    const progreso = {};
    
    document.querySelectorAll('.asignatura-card').forEach(card => {
        const codigo = card.getAttribute('data-codigo');
        const aprobada = card.classList.contains('aprobada');
        progreso[codigo] = aprobada;
    });
    
    localStorage.setItem('progreso-carrera', JSON.stringify(progreso));
    alert('Progreso guardado correctamente');
}

function cargarProgresoGuardado() {
    const progresoGuardado = localStorage.getItem('progreso-carrera');
    if (!progresoGuardado) return;
    
    const progreso = JSON.parse(progresoGuardado);
    
    document.querySelectorAll('.asignatura-card').forEach(card => {
        const codigo = card.getAttribute('data-codigo');
        if (progreso[codigo]) {
            card.classList.add('aprobada');
            card.querySelector('.checkbox-aprobada').checked = true;
        }
    });
}

function reiniciarProgreso() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
        localStorage.removeItem('progreso-carrera');
        document.querySelectorAll('.asignatura-card').forEach(card => {
            card.classList.remove('aprobada');
            card.querySelector('.checkbox-aprobada').checked = false;
        });
        actualizarResumenProgreso();
    }
}
