document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const guestBtn = document.getElementById('guestBtn');
    const usernameInput = document.getElementById('username');
    const googleBtn = document.getElementById('googleBtn');
    const phoneBtn = document.getElementById('phoneBtn');
    const iconFields = document.querySelectorAll('.icon-field');

    // 1. Mostrar/Ocultar contraseña
    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
        
        // Feedback visual
        togglePassword.style.transform = 'scale(1.2)';
        setTimeout(() => {
            togglePassword.style.transform = 'scale(1)';
        }, 200);
    });

    // 2. Validación y efecto de error
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = usernameInput.value.trim();
        const pass = passwordInput.value.trim();

        // Validar campos vacíos
        if (!user || !pass) {
            // Efecto de shake
            loginForm.classList.add('error-shake');
            setTimeout(() => loginForm.classList.remove('error-shake'), 400);
            
            // Resaltar campos vacíos
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    highlightError(input);
                }
            });
            
            // Mostrar mensaje de error
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Validación básica de longitud
        if (pass.length < 6) {
            highlightError(passwordInput);
            showMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
            return;
        }

        // Efecto de carga en el botón
        const btn = loginForm.querySelector('.btn-main-login');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ACCEDIENDO...';
        btn.disabled = true;
        
        // Simulación de petición al servidor
        setTimeout(() => {
            // Simular respuesta exitosa
            const loginSuccess = Math.random() > 0.2; // 80% de éxito
            
            if (loginSuccess) {
                showMessage(`¡Bienvenido a MotoPro 360, ${user}!`, 'success');
                
                // Animación de éxito
                btn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
                btn.innerHTML = '<i class="fas fa-check"></i> ACCESO CONCEDIDO';
                
                // Redirección simulada
                setTimeout(() => {
                    showMessage('Redirigiendo al panel de control...', 'info');
                    
                    // Por ahora, solo reseteamos el formulario
                    setTimeout(() => {
                        resetForm(btn, originalText);
                    }, 1500);
                }, 1000);
            } else {
                // Simular error de credenciales
                showMessage('Credenciales incorrectas. Inténtalo de nuevo.', 'error');
                highlightError(usernameInput);
                highlightError(passwordInput);
                resetForm(btn, originalText);
            }
        }, 1500);
    });

    // 3. Botón Google
    googleBtn.addEventListener('click', () => {
        const originalText = googleBtn.innerHTML;
        googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CONECTANDO...';
        googleBtn.disabled = true;
        
        // Efecto visual
        googleBtn.style.background = 'var(--google-blue)';
        googleBtn.style.color = 'white';
        googleBtn.style.borderColor = 'var(--google-dark-blue)';
        
        setTimeout(() => {
            showMessage('Redirigiendo a Google Authentication...', 'info');
            
            // Simulación de redirección a Google
            setTimeout(() => {
                showMessage('Por favor, autoriza el acceso con tu cuenta de Google.', 'info');
                
                // Restaurar botón después de un tiempo
                setTimeout(() => {
                    googleBtn.innerHTML = originalText;
                    googleBtn.disabled = false;
                    googleBtn.style.background = '';
                    googleBtn.style.color = '';
                    googleBtn.style.borderColor = '';
                }, 2000);
            }, 1000);
        }, 1200);
    });

    // 4. Botón Teléfono
    phoneBtn.addEventListener('click', () => {
        const originalText = phoneBtn.innerHTML;
        phoneBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESANDO...';
        phoneBtn.disabled = true;
        
        // Efecto visual
        phoneBtn.style.background = 'var(--phone-green)';
        phoneBtn.style.color = 'white';
        phoneBtn.style.borderColor = 'var(--phone-dark-green)';
        
        // Crear modal para ingresar número de teléfono
        const phoneNumber = prompt('Por favor, ingresa tu número de teléfono (incluye código de país):');
        
        if (phoneNumber) {
            // Validar número de teléfono básico
            if (phoneNumber.length >= 10) {
                showMessage(`Código de verificación enviado al ${phoneNumber}`, 'info');
                
                // Simular envío de código
                setTimeout(() => {
                    const verificationCode = prompt(`Ingresa el código de 6 dígitos enviado al ${phoneNumber}:`);
                    
                    if (verificationCode && verificationCode.length === 6) {
                        showMessage('✅ Teléfono verificado exitosamente', 'success');
                    } else {
                        showMessage('❌ Código inválido o expirado', 'error');
                    }
                }, 1000);
            } else {
                showMessage('❌ Número de teléfono inválido', 'error');
            }
        }
        
        // Restaurar botón
        setTimeout(() => {
            phoneBtn.innerHTML = originalText;
            phoneBtn.disabled = false;
            phoneBtn.style.background = '';
            phoneBtn.style.color = '';
            phoneBtn.style.borderColor = '';
        }, 1500);
    });

    // 5. Botón invitado
    guestBtn.addEventListener('click', () => {
        const originalText = guestBtn.innerHTML;
        guestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ACCEDIENDO...';
        guestBtn.disabled = true;
        
        setTimeout(() => {
            showMessage('Accediendo en modo invitado. Funcionalidades limitadas.', 'info');
            
            // Simular acceso como invitado
            guestBtn.style.background = 'var(--dark-gray)';
            guestBtn.style.color = 'var(--white)';
            guestBtn.innerHTML = '<i class="fas fa-user-secret"></i> MODO INVITADO ACTIVO';
            
            // Redirección simulada para invitado
            setTimeout(() => {
                showMessage('Redirigiendo al modo de vista...', 'info');
                
                // Restaurar botón después de un tiempo
                setTimeout(() => {
                    guestBtn.innerHTML = originalText;
                    guestBtn.disabled = false;
                    guestBtn.style.background = '';
                    guestBtn.style.color = '';
                }, 2000);
            }, 1000);
        }, 1200);
    });

    // 6. Efectos de focus en inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.addEventListener('focus', () => {
            iconFields[index].style.color = 'var(--dark-red)';
            input.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            iconFields[index].style.color = 'var(--primary-red)';
            input.parentElement.style.transform = 'translateY(0)';
        });
        
        // Limpiar error al empezar a escribir
        input.addEventListener('input', () => {
            if (input.style.borderColor === 'var(--primary-red)') {
                clearError(input);
            }
        });
    });

    // 7. Función para resaltar errores
    function highlightError(inputElement) {
        inputElement.style.borderColor = 'var(--primary-red)';
        inputElement.style.boxShadow = '0 0 0 3px rgba(230, 57, 70, 0.2)';
        inputElement.style.animation = 'pulseError 0.5s ease-in-out';
        
        // Agregar animación de pulso
        if (!document.querySelector('#pulseErrorKeyframes')) {
            const style = document.createElement('style');
            style.id = 'pulseErrorKeyframes';
            style.textContent = `
                @keyframes pulseError {
                    0%, 100% { box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.2); }
                    50% { box-shadow: 0 0 0 6px rgba(230, 57, 70, 0.1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 8. Función para limpiar errores
    function clearError(inputElement) {
        inputElement.style.borderColor = '';
        inputElement.style.boxShadow = '';
        inputElement.style.animation = '';
    }

    // 9. Función para mostrar mensajes
    function showMessage(message, type = 'info') {
        // Remover mensaje anterior si existe
        const oldMessage = document.querySelector('.message-popup');
        if (oldMessage) {
            oldMessage.remove();
        }
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-popup message-${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${getIconForType(type)}"></i>
            <span>${message}</span>
        `;
        
        // Estilos del mensaje
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getColorForType(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
            font-weight: 500;
        `;
        
        // Agregar animación de entrada
        if (!document.querySelector('#slideInKeyframes')) {
            const style = document.createElement('style');
            style.id = 'slideInKeyframes';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(messageDiv);
        
        // Auto-eliminar después de 4 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, 4000);
    }

    // 10. Función para obtener icono según tipo
    function getIconForType(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'info': return 'info-circle';
            default: return 'info-circle';
        }
    }

    // 11. Función para obtener color según tipo
    function getColorForType(type) {
        switch(type) {
            case 'success': return 'linear-gradient(135deg, #4CAF50, #2E7D32)';
            case 'error': return 'linear-gradient(135deg, var(--primary-red), var(--dark-red))';
            case 'info': return 'linear-gradient(135deg, #2196F3, #0D47A1)';
            default: return 'var(--dark-gray)';
        }
    }

    // 12. Función para resetear formulario
    function resetForm(button, originalText) {
        button.innerHTML = originalText;
        button.disabled = false;
        button.style.background = '';
        loginForm.reset();
        
        // Limpiar errores visuales
        inputs.forEach(input => clearError(input));
    }

    // 13. Efecto de carga inicial (opcional)
    window.addEventListener('load', () => {
        const glassCard = document.querySelector('.glass-card');
        glassCard.style.opacity = '0';
        glassCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            glassCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            glassCard.style.opacity = '1';
            glassCard.style.transform = 'translateY(0)';
        }, 100);
    });
});