export const getWelcomeEmailTemplate = (name: string) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>¡Bienvenido a GymFlow!</title>
    </head>
    <body style="background-color: #f4f4f4; font-family: 'Arial', sans-serif; margin: 0; padding: 0; text-align: center;">
        <div style="max-width: 600px; margin: 40px auto; background: white; padding: 24px; border-radius: 12px; 
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); text-align: center;">
            <!-- Encabezado -->
            <div style="background-color: #FF7700; color: white; font-size: 24px; font-weight: bold; 
                        padding: 20px; border-radius: 12px 12px 0 0;">
                🌟 ¡Bienvenido a GymFlow!
            </div>

            <!-- Contenido -->
            <div style="padding: 20px; color: #333;">
                <p style="font-size: 18px;">Hola <strong>${name}</strong>,</p>
                <p style="font-size: 16px;">Nos alegra mucho tenerte con nosotros. 🎉</p>
                <p style="font-size: 16px;">¡Empieza a entrenar con GymFlow hoy mismo!</p>

                <!-- Botón -->
                <a href="https://gym-flow-front.vercel.app"
                    style="display: inline-block; background: #333333; color: white; padding: 14px 24px; 
                            text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;
                            transition: background 0.3s ease-in-out; margin-top: 20px;">
                    Explorar GymFlow
                </a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 15px; font-size: 12px; color: #888; border-top: 1px solid #ddd; margin-top: 20px;">
                <p>Si no solicitaste este correo, puedes ignorarlo.</p>
                <p>© 2025 GymFlow - Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
