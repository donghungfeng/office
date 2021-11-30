package dnhung.office;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

public class ServerGui {

    // Array list to hold information about the files received.
    static ArrayList<MyFile> myFiles = new ArrayList<>();

    public static void main(String[] args) throws IOException {

        // Used to track the file (jpanel that has the file name in it on a label).
        int fileId = 0;

        // Main container, set the name.
        JFrame jFrame = new JFrame("Office's Server");
        // Set the size of the frame.
        jFrame.setSize(400, 400);
        // Give the frame a box layout that stacks its children on top of each other.
        jFrame.setLayout(new BoxLayout(jFrame.getContentPane(), BoxLayout.Y_AXIS));
        // When closing the frame also close the program.
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Panel that will hold the title label and the other jpanels.
        JPanel jPanel = new JPanel();
        // Make the panel that contains everything to stack its child elements on top of eachother.
        jPanel.setLayout(new BoxLayout(jPanel, BoxLayout.Y_AXIS));

        // Make it scrollable when the data gets in jpanel.
        JScrollPane jScrollPane = new JScrollPane(jPanel);
        // Make it so there is always a vertical scrollbar.
        jScrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);

        // Title above panel.
        JLabel jlTitle = new JLabel("Tiếp nhận File");
        // Change the font of the title.
        jlTitle.setFont(new Font("Arial", Font.BOLD, 25));
        // Add a border around the title for spacing.
        jlTitle.setBorder(new EmptyBorder(20,0,10,0));
        // Center the title horizontally in the middle of the frame.
        jlTitle.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Add everything to the main GUI.
        jFrame.add(jlTitle);
        jFrame.add(jScrollPane);
        // Make the GUI show up.
        jFrame.setVisible(true);

        // Create a server socket that the server will be listening with.
        ServerSocket serverSocket = new ServerSocket(12345);

        // This while loop will run forever so the server will never stop unless the application is closed.
        while (true) {

            try {
                // Wait for a client to connect and when they do create a socket to communicate with them.
                Socket socket = serverSocket.accept();

                // Stream to receive data from the client through the socket.
                DataInputStream dataInputStream = new DataInputStream(socket.getInputStream());

                // Read the size of the file name so know when to stop reading.
                int fileNameLength = dataInputStream.readInt();
                // If the file exists
                if (fileNameLength > 0) {
                    // Byte array to hold name of file.
                    byte[] fileNameBytes = new byte[fileNameLength];
                    // Read from the input stream into the byte array.
                    dataInputStream.readFully(fileNameBytes, 0, fileNameBytes.length);
                    // Create the file name from the byte array.
                    String fileName = new String(fileNameBytes);
                    // Read how much data to expect for the actual content of the file.
                    int fileContentLength = dataInputStream.readInt();
                    // If the file exists.
                    if (fileContentLength > 0) {
                        // Array to hold the file data.
                        byte[] fileContentBytes = new byte[fileContentLength];
                        // Read from the input stream into the fileContentBytes array.
                        dataInputStream.readFully(fileContentBytes, 0, fileContentBytes.length);
                        // Panel to hold the picture and file name.
                        JPanel jpFileRow = new JPanel();
                        jpFileRow.setLayout(new BoxLayout(jpFileRow, BoxLayout.X_AXIS));
                        // Set the file name.
                        JLabel jlFileName = new JLabel(fileName);
                        jlFileName.setFont(new Font("Arial", Font.BOLD, 20));
                        jlFileName.setBorder(new EmptyBorder(10,0, 10,0));
                        if (getFileExtension(fileName).equalsIgnoreCase("txt")) {
                            // Set the name to be the fileId so you can get the correct file from the panel.
                            jpFileRow.setName((String.valueOf(fileId)));
                            jpFileRow.addMouseListener(getMyMouseListener());
                            // Add everything.
                            jpFileRow.add(jlFileName);
                            jPanel.add(jpFileRow);
                            jFrame.validate();
                        } else {
                            // Set the name to be the fileId so you can get the correct file from the panel.
                            jpFileRow.setName((String.valueOf(fileId)));
                            // Add a mouse listener so when it is clicked the popup appears.
                            jpFileRow.addMouseListener(getMyMouseListener());
                            // Add the file name and pic type to the panel and then add panel to parent panel.
                            jpFileRow.add(jlFileName);
                            jPanel.add(jpFileRow);
                            // Perform a relayout.
                            jFrame.validate();
                        }

                        // Add the new file to the array list which holds all our data.
                        myFiles.add(new MyFile(fileId, fileName, fileContentBytes, getFileExtension(fileName)));
                        // Increment the fileId for the next file to be received.
                        fileId++;
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * @param fileName
     * @return The extension type of the file.
     */
    public static String getFileExtension(String fileName) {
        // Get the file type by using the last occurence of . (for example aboutMe.txt returns txt).
        // Will have issues with files like myFile.tar.gz.
        int i = fileName.lastIndexOf('.');
        // If there is an extension.
        if (i > 0) {
            // Set the extension to the extension of the filename.
            return fileName.substring(i + 1);
        } else {
            return "No extension found.";
        }
    }

    public static MouseListener getMyMouseListener() {
        return new MouseListener() {
            @Override
            public void mouseClicked(MouseEvent e) {
                // Get the source of the click which is the JPanel.
                JPanel jPanel = (JPanel) e.getSource();
                // Get the ID of the file.
                int fileId = Integer.parseInt(jPanel.getName());
                // Loop through the file storage and see which file is the selected one.
                for (MyFile myFile : myFiles) {
                    if (myFile.getId() == fileId) {
                        // Create a file chooser to open the dialog to choose a file.
                        JFileChooser jFileChooser = new JFileChooser();
                        // Set the title of the dialog.
                        jFileChooser.setDialogTitle("Chọn thư mục lưu");
                        jFileChooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
                        if (jFileChooser.showOpenDialog(null)  == JFileChooser.APPROVE_OPTION) {
                            System.out.println(jFileChooser.getSelectedFile().getAbsolutePath());
                            // Create the file with its name.
                            File fileToDownload = new File(jFileChooser.getSelectedFile().getAbsolutePath()+"\\"+myFile.getName());
                            try {
                                // Create a stream to write data to the file.
                                FileOutputStream fileOutputStream = new FileOutputStream(fileToDownload);
                                // Write the actual file data to the file.
                                fileOutputStream.write(myFile.getData());
                                // Close the stream.
                                fileOutputStream.close();

                                JOptionPane.showMessageDialog(null,"Đã lưu file vào "+jFileChooser.getSelectedFile().getAbsolutePath());
                            } catch (IOException ex) {
                                ex.printStackTrace();
                            }
                        }
                    }
                }
            }

            @Override
            public void mousePressed(MouseEvent e) {

            }

            @Override
            public void mouseReleased(MouseEvent e) {

            }

            @Override
            public void mouseEntered(MouseEvent e) {

            }

            @Override
            public void mouseExited(MouseEvent e) {

            }
        };
    }

}
