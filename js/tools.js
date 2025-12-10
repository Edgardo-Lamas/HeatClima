/**
 * Heat&Clima - Tools Page JavaScript
 * Handles tool interactions and early access form
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tool buttons
    const toolButtons = document.querySelectorAll('.tool-btn');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tool = this.getAttribute('data-tool');
            const status = this.closest('.tool-card').querySelector('.badge');
            
            if (status && status.classList.contains('badge-development')) {
                alert('Esta herramienta está actualmente en desarrollo.\n\n' +
                      'Regístrese en la sección de "Acceso Anticipado" para recibir ' +
                      'notificaciones cuando esté disponible.');
            } else if (status && status.classList.contains('badge-planned')) {
                alert('Esta funcionalidad está planificada para futuras versiones.\n\n' +
                      'Regístrese para recibir actualizaciones sobre su desarrollo.');
            }
            
            // Scroll to early access form
            const earlyAccessSection = document.querySelector('.early-access-section');
            if (earlyAccessSection) {
                earlyAccessSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Early Access Form
    const earlyAccessForm = document.getElementById('earlyAccessForm');
    
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would normally send this to a backend
            // For now, we'll just show a success message
            alert('¡Gracias por su interés!\n\n' +
                  `Se ha registrado exitosamente con el email: ${email}\n\n` +
                  'Le notificaremos cuando nuestras herramientas estén disponibles.');
            
            emailInput.value = '';
        });
    }

    // Smooth scroll to preview sections
    const previewLinks = document.querySelectorAll('[href^="#"][href$="-preview"]');
    previewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
