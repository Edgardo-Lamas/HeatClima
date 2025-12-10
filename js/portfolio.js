/**
 * Heat&Clima - Portfolio Page JavaScript
 * Handles portfolio filtering and project modals
 */

document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project Modal
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.btn-view');

    // Project details data
    const projectDetails = {
        '1': {
            title: 'Torre Residencial Premium',
            location: 'Palermo, CABA',
            year: '2023',
            type: 'Residencial',
            area: '5,000 m²',
            description: 'Sistema de calefacción centralizado para torre de 20 pisos con calderas de condensación de alta eficiencia.',
            features: [
                'Calderas de condensación modulares',
                'Sistema de contadores individuales',
                'Control automático por temperatura',
                'Radiadores de aluminio en todas las unidades',
                'Eficiencia energética clase A'
            ]
        },
        '2': {
            title: 'Oficinas Corporativas',
            location: 'Puerto Madero, CABA',
            year: '2023',
            type: 'Comercial',
            area: '1,500 m²',
            description: 'Instalación de piso radiante con control por zonas para oficinas de última generación.',
            features: [
                'Piso radiante en toda la superficie',
                'Control por zonas independientes',
                'Sistema de gestión BMS',
                'Bomba de calor de alta eficiencia',
                'Ahorro energético del 25%'
            ]
        },
        '3': {
            title: 'Casa Unifamiliar',
            location: 'Nordelta, Tigre',
            year: '2022',
            type: 'Residencial',
            area: '350 m²',
            description: 'Sistema mixto con piso radiante en planta baja y radiadores en planta alta.',
            features: [
                'Piso radiante en áreas comunes',
                'Radiadores en dormitorios',
                'Caldera de condensación',
                'Control WiFi desde smartphone',
                'Integración con energía solar térmica'
            ]
        },
        '4': {
            title: 'Centro Educativo',
            location: 'Belgrano, CABA',
            year: '2022',
            type: 'Comercial',
            area: '3,000 m²',
            description: 'Sistema de calefacción eficiente para 15 aulas y espacios comunes.',
            features: [
                'Radiadores de bajo consumo',
                'Programación horaria automática',
                'Termostatos digitales por aula',
                'Sistema de recuperación de calor',
                'Reducción de costos del 30%'
            ]
        },
        '5': {
            title: 'Planta Industrial',
            location: 'Pacheco, Buenos Aires',
            year: '2021',
            type: 'Industrial',
            area: '8,000 m²',
            description: 'Sistema de climatización para nave industrial con alta demanda térmica.',
            features: [
                'Calderas industriales de alto rendimiento',
                'Radiadores de gran capacidad',
                'Sistema de distribución optimizado',
                'Mantenimiento predictivo',
                'Operación 24/7'
            ]
        },
        '6': {
            title: 'Complejo de Departamentos',
            location: 'Recoleta, CABA',
            year: '2021',
            type: 'Residencial',
            area: '4,500 m²',
            description: 'Instalación de calderas individuales de condensación en cada unidad.',
            features: [
                'Calderas de condensación individuales',
                'Sistema de evacuación colectivo',
                'Radiadores de aluminio',
                'Termostatos inteligentes',
                'Eficiencia energética superior'
            ]
        }
    };

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];

            if (project) {
                modalBody.innerHTML = `
                    <h2>${project.title}</h2>
                    <div class="project-meta" style="display: flex; gap: 2rem; margin: 1rem 0; color: #666;">
                        <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                        <span><i class="fas fa-calendar"></i> ${project.year}</span>
                        <span><i class="fas fa-building"></i> ${project.type}</span>
                        <span><i class="fas fa-ruler-combined"></i> ${project.area}</span>
                    </div>
                    <p style="margin: 1.5rem 0; line-height: 1.8;">${project.description}</p>
                    <h3 style="margin: 1.5rem 0 1rem;">Características Destacadas</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${project.features.map(feature => `
                            <li style="padding: 0.5rem 0; display: flex; align-items: center; gap: 0.75rem;">
                                <i class="fas fa-check-circle" style="color: #27ae60;"></i>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                `;
                modal.style.display = 'block';
            }
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
