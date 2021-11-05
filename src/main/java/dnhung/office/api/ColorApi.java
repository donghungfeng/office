package dnhung.office.api;

import dnhung.office.Service.BaseService;
import dnhung.office.Service.ColorService;
import dnhung.office.entity.ColorEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/color")
public class ColorApi extends BaseApi<ColorEntity> {
    private final ColorService colorService;

    public ColorApi(ColorService colorService) {
        this.colorService = colorService;
    }

    @Override
    protected BaseService<ColorEntity> getBaseService() {
        return colorService;
    }
}
