/**
 * Heat&Clima - Contact Page JavaScript
 * Handles contact form submission and validation
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                projectTypes: []
            };
            
            // Get selected project types
            const projectCheckboxes = this.querySelectorAll('input[type="checkbox"]:not([name="privacy"])');
            projectCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    data.projectTypes.push(checkbox.value);
                }
            });
            
            // Validate privacy checkbox
            const privacyCheckbox = formData.get('privacy');
            if (!privacyCheckbox) {
                alert('Debe aceptar la política de privacidad para continuar.');
                return;
            }
            
            // Here you would normally send this to a backend
            // For now, we'll show a success message
            showSuccessMessage(data);
            
            // Reset form
            this.reset();
        });
    }
    
    function showSuccessMessage(data) {
        const subjectText = {
            'cotizacion': 'Solicitud de Cotización',
            'consulta-tecnica': 'Consulta Técnica',
            'nuevo-proyecto': 'Nuevo Proyecto',
            'mantenimiento': 'Mantenimiento',
            'otro': 'Otro'
        };
        
        let message = '¡Gracias por contactarnos!\n\n';
        message += `Hemos recibido su mensaje sobre: ${subjectText[data.subject]}\n\n`;
        
        if (data.projectTypes.length > 0) {
            message += `Servicios de interés: ${data.projectTypes.join(', ')}\n\n`;
        }
        
        message += 'Nos pondremos en contacto con usted en breve.\n';
        message += `Email de confirmación enviado a: ${data.email}`;
        
        alert(message);
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                // Format as Argentine phone number
                if (value.startsWith('54')) {
                    value = '+' + value;
                } else if (!value.startsWith('+')) {
                    value = '+54 ' + value;
                }
            }
            // Don't update if it would interfere with typing
        });
    }
    
    // Real-time form validation
    const requiredInputs = contactForm.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#ddd';
        });
    });
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.style.borderColor = '#e74c3c';
                this.setCustomValidity('Por favor ingrese un email válido');
            } else {
                this.style.borderColor = '#27ae60';
                this.setCustomValidity('');
            }
        });
    }
});
