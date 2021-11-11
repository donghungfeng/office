package dnhung.office.api;

import dnhung.office.Service.BaseService;
import dnhung.office.Service.TypeService;
import dnhung.office.entity.TypeEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/type")
public class TypeApi extends BaseApi<TypeEntity> {
    private final TypeService typeService;

    public TypeApi(TypeService typeService) {
        this.typeService = typeService;
    }

    @Override
    protected BaseService<TypeEntity> getBaseService() {
        return typeService;
    }
}
