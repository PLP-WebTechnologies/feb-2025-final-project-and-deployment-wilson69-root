document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in effect when page loads
    document.body.classList.add('fade-in');

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Products page functionality
    const toggleButtons = document.querySelectorAll('.toggle-specs');
    if (toggleButtons.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-detail-card');
                const productDetails = productCard.querySelector('.product-details');
                const icon = this.querySelector('i');
                
                // Toggle the details visibility with animation
                if (productDetails.style.display === 'none' || !productDetails.style.display) {
                    productDetails.style.display = 'block';
                    this.classList.add('active');
                } else {
                    productDetails.style.display = 'none';
                    this.classList.remove('active');
                }
            });
        });
    }

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select, textarea');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });

            input.addEventListener('blur', function() {
                validateField(this);
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! We'll get back to you soon.</p>
                `;
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
});

// Form validation function
function validateField(field) {
    const errorMessage = field.nextElementSibling;
    let isValid = true;
    let message = '';

    // Reset error state
    field.classList.remove('error');
    errorMessage.textContent = '';

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }

    // Phone validation
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }

    // Message length validation
    if (field.id === 'message' && field.value) {
        if (field.value.length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters long';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        errorMessage.textContent = message;
    }

    return isValid;
}