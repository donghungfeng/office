package dnhung.office.Service.impl;

import dnhung.office.Service.UserService;
import dnhung.office.entity.UserEntity;
import dnhung.office.repository.BaseRepository;
import dnhung.office.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends BaseServiceImpl<UserEntity> implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    protected BaseRepository<UserEntity> getBaseRepository() {
        return userRepository;
    }
}
