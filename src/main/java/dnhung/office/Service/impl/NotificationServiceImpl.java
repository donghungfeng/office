package dnhung.office.Service.impl;
import dnhung.office.Service.NotificationService;
import dnhung.office.entity.NotificationEntity;
import dnhung.office.repository.BaseRepository;
import dnhung.office.repository.NotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl extends BaseServiceImpl<NotificationEntity> implements NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }


    @Override
    protected BaseRepository<NotificationEntity> getBaseRepository() {
        return notificationRepository;
    }
}
