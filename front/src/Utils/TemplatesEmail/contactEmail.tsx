export const getContactEmailTemplate = (name: any, email: any, message: any) => {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Mensaje de Contacto</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { background: #222; color: #fff; text-align: center; padding: 10px; font-size: 24px; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; font-size: 16px; color: #333; }
          .footer { text-align: center; font-size: 14px; color: #777; padding: 10px; border-top: 1px solid #ddd; }
          .highlight { color: #d35400; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">GymFlow - Nuevo Mensaje de Contacto</div>
          <div class="content">
            <p><strong>Nombre:</strong> <span class="highlight">${name}</span></p>
            <p><strong>Email:</strong> <span class="highlight">${email}</span></p>
            <p><strong>Mensaje:</strong></p>
            <p>"${message}"</p>
          </div>
          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de GymFlow.</p>
            <p>Si necesitas más información, responde a este correo.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  