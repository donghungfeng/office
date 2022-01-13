package dnhung.office;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

@SpringBootApplication
public class OfficeApplication {

	public static void main(String[] args) throws IOException {

		SpringApplication.run(OfficeApplication.class, args);

		ServerSocket serverSocket = new ServerSocket(1234);
		while (true) {
			try {
				Socket socket = serverSocket.accept();
				DataInputStream dataInputStream = new DataInputStream(socket.getInputStream());
				int fileNameLength = dataInputStream.readInt();
				if (fileNameLength > 0) {
					byte[] fileNameBytes = new byte[fileNameLength];
					dataInputStream.readFully(fileNameBytes, 0, fileNameBytes.length);
					String fileName = new String(fileNameBytes);
					int fileContentLength = dataInputStream.readInt();
					if (fileContentLength > 0) {
						byte[] fileContentBytes = new byte[fileContentLength];
						dataInputStream.readFully(fileContentBytes, 0, fileContentBytes.length);
						System.out.println(fileName);
						File fileToDownload = new File(fileName);
						try {
							FileOutputStream fileOutputStream = new FileOutputStream(fileToDownload);
							fileOutputStream.write(fileContentBytes);
							fileOutputStream.close();
						} catch (IOException ex) {
							ex.printStackTrace();
						}
					}
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

}
