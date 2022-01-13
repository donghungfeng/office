package dnhung.office.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.Socket;

@RestController
@CrossOrigin
public class FileUploadApi {

	@Value("${file.upload-dir}")
	String FILE_DIRECTORY;
	
	@PostMapping("/uploadFile")
	public ResponseEntity<Object> fileUpload(@RequestParam("file") MultipartFile file) throws IOException{
		try {
			Socket socket = new Socket("127.0.0.1", 1234);
			DataOutputStream dataOutputStream = new DataOutputStream(socket.getOutputStream());
			String fileName = "D:\\SaveNew\\" + file.getOriginalFilename();
			byte[] fileNameBytes = fileName.getBytes();
			dataOutputStream.writeInt(fileNameBytes.length);
			dataOutputStream.write(fileNameBytes);
			dataOutputStream.writeInt(file.getBytes().length);
			dataOutputStream.write(file.getBytes());
		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return new ResponseEntity<Object>("The File Uploaded Successfully", HttpStatus.OK);
	}
}
