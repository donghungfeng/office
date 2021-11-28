package dnhung.office.api;

import dnhung.office.Service.BaseService;
import dnhung.office.Service.UserService;
import dnhung.office.entity.UserEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserApi extends BaseApi<UserEntity> {
    private final UserService userService;

    public UserApi(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected BaseService<UserEntity> getBaseService() {
        return userService;
    }
}
