package dnhung.office.api;

import dnhung.office.Service.BaseService;
import dnhung.office.Service.NotificationService;
import dnhung.office.entity.NotificationEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/notification")
public class NotificationApi extends BaseApi<NotificationEntity> {
    private final NotificationService notificationService;

    public NotificationApi(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Override
    protected BaseService<NotificationEntity> getBaseService() {
        return notificationService;
    }
}
