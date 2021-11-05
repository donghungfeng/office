package dnhung.office.Service;

import dnhung.office.model.Account;
import org.springframework.stereotype.Service;

@Service
public class AuthenService {
    

    public static Account login(String user, String pass){

        if(user.toLowerCase().equals("admin") && pass.equals("Su@2021#")){
            return new Account(user,"Quản trị Payment","");
        }else{
            return null;
        }

    }
}
