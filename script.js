// Datos de los cursos por semestre
const coursesData = {
    2: [
        {
            title: "Salud Comunitaria I",
            type: "Asignatura básica",
            credits: 4,
            category: "core"
        },
        {
            title: "Bioquímica",
            type: "Asignatura básica",
            credits: 4,
            category: "core"
        },
        {
            title: "Biología del Desarrollo y Embriología Humana",
            type: "Asignatura básica",
            credits: 3,
            category: "core"
        },
        {
            title: "Fisiología General",
            type: "Asignatura básica",
            credits: 4,
            category: "core"
        },
        {
            title: "Anatomía",
            type: "Asignatura básica",
            credits: 5,
            category: "core"
        },
        {
            title: "Histología",
            type: "Asignatura básica",
            credits: 3,
            category: "core"
        },
        {
            title: "Integración al Desempeño Profesional I",
            type: "Formación general",
            credits: 2,
            category: "general"
        },
        {
            title: "Curso de Formación General II",
            type: "Formación general",
            credits: 3,
            category: "general"
        },
        {
            title: "Inglés II",
            type: "Idiomas",
            credits: 3,
            category: "general"
        }
    ],
    3: [
        {
            title: "Fundamentos de Enfermería II",
            type: "Asignatura profesional",
            credits: 5,
            category: "professional"
        },
        {
            title: "Obstetricia Fisiológica I",
            type: "Asignatura profesional",
            credits: 4,
            category: "professional"
        },
        {
            title: "Neonatología I",
            type: "Asignatura profesional",
            credits: 3,
            category: "professional"
        },
        {
            title: "Fisiología de Sistemas",
            type: "Asignatura básica",
            credits: 4,
            category: "core"
        },
        {
            title: "Inmunología",
            type: "Asignatura básica",
            credits: 3,
            category: "core"
        },
        {
            title: "Virología",
            type: "Asignatura básica",
            credits: 3,
            category: "core"
        },
        {
            title: "Ciencias Sociales y Salud II",
            type: "Formación general",
            credits: 3,
            category: "general"
        },
        {
            title: "Inglés III",
            type: "Idiomas",
            credits: 3,
            category: "general"
        }
    ],
    4: [
        {
            title: "Neonatología II",
            type: "Asignatura profesional",
            credits: 4,
            category: "professional"
        },
        {
            title: "Obstetricia Fisiológica II",
            type: "Asignatura profesional",
            credits: 4,
            category: "professional"
        },
        {
            title: "Ginecología Fisiológica",
            type: "Asignatura profesional",
            credits: 4,
            category: "professional"
        },
        {
            title: "Fisiopatología",
            type: "Asignatura básica",
            credits: 5,
            category: "core"
        },
        {
            title: "Infectología",
            type: "Asignatura profesional",
            credits: 4,
            category: "professional"
        },
        {
            title: "Farmacología",
            type: "Asignatura básica",
            credits: 4,
            category: "core"
        },
        {
            title: "Integración al Desempeño Profesional II",
            type: "Formación general",
            credits: 2,
            category: "general"
        },
        {
            title: "Investigación en Salud I",
            type: "Investigación",
            credits: 3,
            category: "research"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Generar las tarjetas de cursos para cada semestre
    for (const semester in coursesData) {
        const semesterElement = document.querySelector(`.semester[data-semester="${semester}"] .courses-container`);
        let totalCredits = 0;
        
        coursesData[semester].forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.category}`;
            courseCard.innerHTML = `
                <div class="course-title">${course.title}</div>
                <div class="course-type">${course.type}</div>
                <span class="course-credits">${course.credits} créditos</span>
            `;
            
            semesterElement.appendChild(courseCard);
            totalCredits += course.credits;
            
            // Agregar evento de clic a cada tarjeta
            courseCard.addEventListener('click', function() {
                showCourseDetails(course);
            });
        });
        
        // Actualizar el total de créditos del semestre
        document.querySelector(`.semester[data-semester="${semester}"] .total-credits`).textContent = totalCredits;
    }
});

function showCourseDetails(course) {
    // Aquí puedes implementar lo que sucede al hacer clic en un curso
    console.log('Curso seleccionado:', course.title);
    alert(`Información del curso:\n\n${course.title}\nTipo: ${course.type}\nCréditos: ${course.credits}`);
}
