package dnhung.office.Service.impl;

import dnhung.office.Service.ColorService;
import dnhung.office.entity.ColorEntity;
import dnhung.office.repository.BaseRepository;
import dnhung.office.repository.ColorRepository;
import org.springframework.stereotype.Service;

@Service
public class ColorServiceImpl extends BaseServiceImpl<ColorEntity> implements ColorService {
    private final ColorRepository colorRepository;

    public ColorServiceImpl(ColorRepository colorRepository){
        this.colorRepository = colorRepository;
    }


    @Override
    protected BaseRepository<ColorEntity> getBaseRepository() {
        return colorRepository;
    }
}
