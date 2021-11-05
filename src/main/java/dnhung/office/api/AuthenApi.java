package dnhung.office.api;


import dnhung.office.Service.AuthenService;
import dnhung.office.model.Account;
import dnhung.office.model.AuthenReq;
import dnhung.office.model.BaseResponse;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/v1.0/public/authen")
public class AuthenApi {


    @RequestMapping(value = "/login", method = RequestMethod.POST)
	public Object sale(@RequestBody AuthenReq oAuthenReq, HttpServletRequest request) {
		String endpointUrl = "";

		try {
			Account oAccount = AuthenService.login(oAuthenReq.username, oAuthenReq.password);
            if (oAccount !=null) {
                return new BaseResponse("00","success",oAccount);
            }else{
                return new BaseResponse("01","Login failed",oAccount);
            }



		} catch (Exception e) {
			return new BaseResponse("99","Ex: " + e.getMessage(),null);
		}
    }
}
