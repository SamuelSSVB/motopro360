document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const registroForm = document.getElementById('registroForm');
    const roleUsuario = document.getElementById('roleUsuario');
    const roleComercio = document.getElementById('roleComercio');
    const seccionUsuario = document.getElementById('seccionUsuario');
    const seccionComercio = document.getElementById('seccionComercio');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Campos de Comercio
    const camposComercio = [
        'nombreComercio', 'rfc', 'razonSocial', 'direccion', 
        'ciudad', 'codigoPostal', 'tipoComercio', 'descripcion'
    ];
    
    // Campos de Usuario
    const camposUsuario = [
        'marcaMoto', 'modeloMoto', 'anioMoto', 'cilindraje'
    ];

    // Estado inicial
    let rolSeleccionado = 'usuario'; // Valor por defecto

    // 1. Selección de Rol
    roleUsuario.addEventListener('click', () => {
        seleccionarRol('usuario');
    });

    roleComercio.addEventListener('click', () => {
        seleccionarRol('comercio');
    });

    function seleccionarRol(rol) {
        rolSeleccionado = rol;
        
        // Remover clase active de ambos roles
        roleUsuario.classList.remove('active');
        roleComercio.classList.remove('active');
        
        // Añadir clase active al rol seleccionado
        if (rol === 'usuario') {
            roleUsuario.classList.add('active');
            seccionUsuario.style.display = 'block';
            seccionComercio.style.display = 'none';
            
            // Hacer campos de usuario opcionales
            camposUsuario.forEach(campoId => {
                const campo = document.getElementById(campoId);
                campo.required = false;
                campo.closest('.input-group').classList.remove('required');
            });
            
            // Hacer campos de comercio no obligatorios
            camposComercio.forEach(campoId => {
                const campo = document.getElementById(campoId);
                campo.required = false;
                campo.closest('.input-group').classList.remove('required');
            });
            
        } else {
            roleComercio.classList.add('active');
            seccionUsuario.style.display = 'none';
            seccionComercio.style.display = 'block';
            
            // Hacer campos de comercio obligatorios
            camposComercio.forEach(campoId => {
                const campo = document.getElementById(campoId);
                campo.required = true;
                campo.closest('.input-group').classList.add('required');
            });
            
            // Hacer campos de usuario opcionales
            camposUsuario.forEach(campoId => {
                const campo = document.getElementById(campoId);
                campo.required = false;
                campo.closest('.input-group').classList.remove('required');
            });
        }
    }

    // 2. Validación de contraseña en tiempo real
    confirmPasswordInput.addEventListener('input', () => {
        validarCoincidenciaPassword();
    });

    passwordInput.addEventListener('input', () => {
        validarCoincidenciaPassword();
    });

    function validarCoincidenciaPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.style.borderColor = 'var(--primary-red)';
            confirmPasswordInput.style.boxShadow = '0 0 0 3px rgba(230, 57, 70, 0.1)';
        } else if (confirmPassword) {
            confirmPasswordInput.style.borderColor = '#34A853';
            confirmPasswordInput.style.boxShadow = '0 0 0 3px rgba(52, 168, 83, 0.1)';
        } else {
            confirmPasswordInput.style.borderColor = '';
            confirmPasswordInput.style.boxShadow = '';
        }
    }

    // 3. Validación del formulario
    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validar contraseñas coincidan
        if (passwordInput.value !== confirmPasswordInput.value) {
            showMessage('Las contraseñas no coinciden', 'error');
            confirmPasswordInput.focus();
            return;
        }
        
        // Validar longitud mínima de contraseña
        if (passwordInput.value.length < 6) {
            showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
            passwordInput.focus();
            return;
        }
        
        // Validar campos obligatorios según rol
        if (rolSeleccionado === 'comercio') {
            const camposFaltantes = [];
            camposComercio.forEach(campoId => {
                const campo = document.getElementById(campoId);
                if (!campo.value.trim()) {
                    camposFaltantes.push(campo.placeholder);
                    highlightError(campo);
                }
            });
            
            if (camposFaltantes.length > 0) {
                showMessage(`Complete los campos obligatorios del comercio`, 'error');
                return;
            }
        }
        
        // Validar términos y condiciones
        const terminosCheckbox = document.getElementById('terminos');
        if (!terminosCheckbox.checked) {
            showMessage('Debe aceptar los términos y condiciones', 'error');
            return;
        }

        // Simular envío del formulario
        const btn = registroForm.querySelector('.btn-main-login');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> REGISTRANDO...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Simular respuesta exitosa
            showMessage(`¡Registro exitoso como ${rolSeleccionado.toUpperCase()}!`, 'success');
            
            // Animación de éxito
            btn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
            btn.innerHTML = '<i class="fas fa-check"></i> REGISTRO COMPLETADO';
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        }, 1500);
    });

    // 4. Función para mostrar mensajes
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
        
        document.body.appendChild(messageDiv);
        
        // Auto-eliminar después de 4 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, 4000);
    }

    // 5. Función para resaltar errores
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

    // 6. Función para obtener icono según tipo
    function getIconForType(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'info': return 'info-circle';
            default: return 'info-circle';
        }
    }

    // 7. Función para obtener color según tipo
    function getColorForType(type) {
        switch(type) {
            case 'success': return 'linear-gradient(135deg, #4CAF50, #2E7D32)';
            case 'error': return 'linear-gradient(135deg, var(--primary-red), var(--dark-red))';
            case 'info': return 'linear-gradient(135deg, #2196F3, #0D47A1)';
            default: return 'var(--dark-gray)';
        }
    }

    // 8. Inicializar selección de rol por defecto
    seleccionarRol('usuario');
    
    // 9. Añadir animación de entrada
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