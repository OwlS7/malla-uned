document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de cursos
    fetch('data/cursos.json')
        .then(response => response.json())
        .then(data => {
            populateTable(data.cursos);
            calculateCredits(data.cursos);
        });

    // Manejar cambios de vista
    document.querySelectorAll('input[name="view"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('diagram-view').style.display = 
                this.value === 'diagram' ? 'block' : 'none';
            document.getElementById('table-view').style.display = 
                this.value === 'table' ? 'block' : 'none';
        });
    });

    // Filtros
    document.getElementById('search').addEventListener('input', filterCourses);
    document.getElementById('block-filter').addEventListener('change', filterCourses);

    // Botones de nivel
    document.getElementById('show-diplomado').addEventListener('click', function() {
        showLevel('diplomado');
    });
    document.getElementById('show-bachillerato').addEventListener('click', function() {
        showLevel('bachillerato');
    });
    document.getElementById('show-all').addEventListener('click', function() {
        showLevel('all');
    });
});

function populateTable(courses) {
    const tbody = document.querySelector('#courses-table tbody');
    tbody.innerHTML = '';

    courses.forEach(course => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${course.bloque}</td>
            <td>${course.codigo || ''}</td>
            <td>${course.asignatura}</td>
            <td>${course.creditos}</td>
            <td>${course.requisitos.join(', ') || 'Ninguno'}</td>
        `;
        
        tbody.appendChild(row);
    });
}

function calculateCredits(courses) {
    let diplomadoCredits = 0;
    let bachilleratoCredits = 0;
    
    courses.forEach(course => {
        const creditos = parseInt(course.creditos) || 0;
        if (['A', 'B', 'C', 'D', 'E'].includes(course.bloque)) {
            diplomadoCredits += creditos;
        } else {
            bachilleratoCredits += creditos;
        }
    });
    
    document.getElementById('diplomado-credits').textContent = diplomadoCredits;
    document.getElementById('bachillerato-credits').textContent = bachilleratoCredits;
    document.getElementById('total-credits').textContent = diplomadoCredits + bachilleratoCredits;
}

function filterCourses() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const blockFilter = document.getElementById('block-filter').value;
    const rows = document.querySelectorAll('#courses-table tbody tr');
    
    rows.forEach(row => {
        const bloque = row.cells[0].textContent;
        const asignatura = row.cells[2].textContent.toLowerCase();
        const matchesSearch = asignatura.includes(searchText);
        const matchesBlock = !blockFilter || bloque === blockFilter;
        
        row.style.display = matchesSearch && matchesBlock ? '' : 'none';
    });
}

function showLevel(level) {
    const diagram = document.querySelector('.mermaid');
    let newDiagram = '';
    
    if (level === 'diplomado') {
        newDiagram = `
            flowchart TD
                A[Bloque A] --> B[Bloque B]
                B --> C[Bloque C]
                C --> D[Bloque D]
                D --> E[Bloque E]
                
                subgraph Diplomado
                A -->|Humanidades| A1[6 créditos]
                A --> A2[Lógica algorítmica\n4 créditos]
                A --> A3[Matemáticas I\n3 créditos]
                A --> A4[Inglés I\n3 créditos]
                B --> B1[Principios de administración\n3 créditos]
                B --> B2[Lógica para computación\n3 créditos\nReq: 03304]
                B --> B3[Matemáticas II\n3 créditos\nReq: 03068]
                B --> B4[Inglés II\n3 créditos\nReq: 00997]
                C --> C1[Introducción a programación\n4 créditos\nReq: 03069/03071/03072]
                C --> C2[Organización de computadoras\n4 créditos\nReq: 03071/03069]
                D --> D1[Programación intermedia\n4 créditos\nReq: 00831]
                D --> D2[Base de datos\n3 créditos\nReq: 00831]
                E --> E1[Ingeniería del software\n4 créditos\nReq: 00824/00826]
                E --> E2[Programación avanzada\n4 créditos\nReq: 00824/00826]
                end
        `;
    } else if (level === 'bachillerato') {
        newDiagram = `
            flowchart TD
                F[Bloque F] --> G[Bloque G]
                G --> H[Bloque H]
                H --> I[Bloque I]
                
                subgraph Bachillerato
                F --> F1[Análisis y diseño\n4 créditos\nReq: 03300/00830]
                F --> F2[Programación WEB\n3 créditos\nReq: 00830]
                G --> G1[Ingeniería de requerimientos\n4 créditos\nReq: 03301]
                G --> G2[Base de datos II\n3 créditos\nReq: 00826]
                I --> I1[Práctica profesional\n10 créditos]
                end
        `;
    } else {
        newDiagram = `
            flowchart TD
                A[Bloque A] --> B[Bloque B]
                B --> C[Bloque C]
                C --> D[Bloque D]
                D --> E[Bloque E]
                E --> F[Bloque F]
                F --> G[Bloque G]
                G --> H[Bloque H]
                H --> I[Bloque I]
                
                subgraph Diplomado
                A -->|Humanidades| A1[6 créditos]
                A --> A2[Lógica algorítmica\n4 créditos]
                A --> A3[Matemáticas I\n3 créditos]
                A --> A4[Inglés I\n3 créditos]
                B --> B1[Principios de administración\n3 créditos]
                B --> B2[Lógica para computación\n3 créditos\nReq: 03304]
                B --> B3[Matemáticas II\n3 créditos\nReq: 03068]
                B --> B4[Inglés II\n3 créditos\nReq: 00997]
                C --> C1[Introducción a programación\n4 créditos\nReq: 03069/03071/03072]
                C --> C2[Organización de computadoras\n4 créditos\nReq: 03071/03069]
                D --> D1[Programación intermedia\n4 créditos\nReq: 00831]
                D --> D2[Base de datos\n3 créditos\nReq: 00831]
                E --> E1[Ingeniería del software\n4 créditos\nReq: 00824/00826]
                E --> E2[Programación avanzada\n4 créditos\nReq: 00824/00826]
                end
                
                subgraph Bachillerato
                F --> F1[Análisis y diseño\n4 créditos\nReq: 03300/00830]
                F --> F2[Programación WEB\n3 créditos\nReq: 00830]
                G --> G1[Ingeniería de requerimientos\n4 créditos\nReq: 03301]
                G --> G2[Base de datos II\n3 créditos\nReq: 00826]
                I --> I1[Práctica profesional\n10 créditos]
                end
        `;
    }
    
    diagram.innerHTML = newDiagram;
    mermaid.init();
}
