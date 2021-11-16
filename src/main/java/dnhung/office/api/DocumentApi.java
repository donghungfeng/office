package dnhung.office.api;

import dnhung.office.Service.BaseService;
import dnhung.office.Service.DocumentService;
import dnhung.office.entity.DocumentEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/document")
public class DocumentApi extends BaseApi<DocumentEntity> {
    private final DocumentService documentService;

    public DocumentApi(DocumentService documentService) {
        this.documentService = documentService;
    }

    @Override
    protected BaseService<DocumentEntity> getBaseService() {
        return documentService;
    }
}
