package dnhung.office.Service.impl;
import dnhung.office.Service.TypeService;
import dnhung.office.entity.TypeEntity;
import dnhung.office.repository.BaseRepository;
import dnhung.office.repository.TypeRepository;
import org.springframework.stereotype.Service;

@Service
public class TypeServiceImpl extends BaseServiceImpl<TypeEntity> implements TypeService {
    private final TypeRepository typeRepository;

    public TypeServiceImpl(TypeRepository typeRepository){
        this.typeRepository = typeRepository;
    }


    @Override
    protected BaseRepository<TypeEntity> getBaseRepository() {
        return typeRepository;
    }
}
