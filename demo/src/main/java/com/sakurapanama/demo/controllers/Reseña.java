import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sakurapanama.demo.services.resena;

import java.io.IOException;
import java.util.Date;

@RestController
public class Reseña {

    @Autowired
    private resena resenaService;

    @PostMapping("/api/resenas")
    public ResponseEntity<String> insertarResena(@RequestBody resena resenaDTO) {
        try {
            resenaService.agregarResena(resenaDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Reseña agregada exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar la reseña");
        }
    }

    @PostMapping("/api/subir-imagen")
    public ResponseEntity<String> subirImagen(@RequestParam("file") MultipartFile file) {
        try {
            // Procesar y guardar la imagen, aquí un ejemplo básico
            // Debes adaptar este código para que maneje correctamente el almacenamiento de la imagen
            String nombreArchivo = "imagen_" + new Date().getTime() + ".jpg";
            // Aquí deberías guardar el archivo, por ejemplo, en un directorio en tu servidor o en un servicio de almacenamiento en la nube
            // En este ejemplo, solo estamos devolviendo el nombre del archivo
            return ResponseEntity.status(HttpStatus.OK).body(nombreArchivo);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar la imagen");
        }
    }
}