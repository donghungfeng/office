package dnhung.office;

import java.io.*;
import java.net.Socket;

public class Client {

    public static void main(String[] args) {
        try {
            File file = new File("D:\\Jenkins.docx");
            System.out.println(file.getAbsolutePath());
            // Create an input stream into the file you want to send.
            FileInputStream fileInputStream = new FileInputStream(file.getAbsolutePath());
            // Create a socket connection to connect with the server.
            Socket socket = new Socket("192.168.3.108", 1234);
            // Create an output stream to write to write to the server over the socket connection.
            DataOutputStream dataOutputStream = new DataOutputStream(socket.getOutputStream());
            // Get the name of the file you want to send and store it in filename.
            String fileName = "D:\\SaveNew\\" + file.getName();
            // Convert the name of the file into an array of bytes to be sent to the server.
            byte[] fileNameBytes = fileName.getBytes();
            // Create a byte array the size of the file so don't send too little or too much data to the server.
            byte[] fileBytes = new byte[(int)file.length()];
            // Put the contents of the file into the array of bytes to be sent so these bytes can be sent to the server.
            fileInputStream.read(fileBytes);
            // Send the length of the name of the file so server knows when to stop reading.
            dataOutputStream.writeInt(fileNameBytes.length);
            // Send the file name.
            dataOutputStream.write(fileNameBytes);
            // Send the length of the byte array so the server knows when to stop reading.
            dataOutputStream.writeInt(fileBytes.length);
            // Send the actual file.
            dataOutputStream.write(fileBytes);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
