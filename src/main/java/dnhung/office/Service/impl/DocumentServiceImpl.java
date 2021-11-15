package dnhung.office.Service.impl;
import dnhung.office.Service.DocumentService;
import dnhung.office.entity.DocumentEntity;
import dnhung.office.repository.BaseRepository;
import dnhung.office.repository.DocumentRepository;
import org.springframework.stereotype.Service;

@Service
public class DocumentServiceImpl extends BaseServiceImpl<DocumentEntity> implements DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository){
        this.documentRepository = documentRepository;
    }


    @Override
    protected BaseRepository<DocumentEntity> getBaseRepository() {
        return documentRepository;
    }
}
