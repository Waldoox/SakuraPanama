import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet("/SubirImagen")
public class SubirImagen extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Configuración de la base de datos PostgreSQL
        String URL = "jdbc:postgresql://monorail.proxy.rlwy.net_postgres:25736/luis";
        String dbUser = "postgres";
        String dbPassword = "14FDAgB*BaCADCDb*6*3ffgf4A2f4-ff";

        try {
            // Cargar el controlador JDBC
            Class.forName("org.postgresql.Driver");

            // Establecer conexión con la base de datos
            Connection connection = DriverManager.getConnection(URL, dbUser, dbPassword);

            // Obtener la imagen desde el formulario
            Part filePart = request.getPart("image");
            String fileName = filePart.getSubmittedFileName();
            InputStream inputStream = filePart.getInputStream();

            // Insertar la imagen en la base de datos
            String sql = "INSERT INTO imagenes (nombre, datos) VALUES (?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, fileName);
                statement.setBinaryStream(2, inputStream);
                statement.executeUpdate();
            }

            // Cerrar conexión
            connection.close();

            response.sendRedirect("index.html"); // Redirigir al formulario después de la carga exitosa
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al subir la imagen y guardar en la base de datos.");
        }
    }
}