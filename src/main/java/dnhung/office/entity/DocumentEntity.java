package dnhung.office.entity;

import javax.persistence.*;

@Entity
@Table(name = "document", schema = "main", catalog = "")
public class DocumentEntity {
    private Long id;
    private Double dateDone;
    private Double dateExpiration;
    private Double dateAssign;
    private Double dateReceive;
    private Double dateOut;
    private String fileName;
    private String filePath;
    private String location;
    private String num;
    private String organOut;
    private String quote;
    private Short status;
    private Short priority;
    private String comment;
    private String description;
    private String note;
    private UserEntity assgineeId;
    private UserEntity reporterId;
    private TypeEntity typeId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "date_done")
    public Double getDateDone() {
        return dateDone;
    }

    public void setDateDone(Double dateDone) {
        this.dateDone = dateDone;
    }

    @Basic
    @Column(name = "date_expiration")
    public Double getDateExpiration() {
        return dateExpiration;
    }

    public void setDateExpiration(Double dateExpiration) {
        this.dateExpiration = dateExpiration;
    }

    @Basic
    @Column(name = "date_assign")
    public Double getDateAssign() {
        return dateAssign;
    }

    public void setDateAssign(Double dateAssign) {
        this.dateAssign = dateAssign;
    }

    @Basic
    @Column(name = "date_receive")
    public Double getDateReceive() {
        return dateReceive;
    }

    public void setDateReceive(Double dateReceive) {
        this.dateReceive = dateReceive;
    }

    @Basic
    @Column(name = "date_out")
    public Double getDateOut() {
        return dateOut;
    }

    public void setDateOut(Double dateOut) {
        this.dateOut = dateOut;
    }

    @Basic
    @Column(name = "file_name")
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @Basic
    @Column(name = "file_path")
    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    @Basic
    @Column(name = "location")
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Basic
    @Column(name = "num")
    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    @Basic
    @Column(name = "organ_out")
    public String getOrganOut() {
        return organOut;
    }

    public void setOrganOut(String organOut) {
        this.organOut = organOut;
    }

    @Basic
    @Column(name = "quote")
    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    @Basic
    @Column(name = "status")
    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    @Basic
    @Column(name = "priority")
    public Short getPriority() {
        return priority;
    }

    public void setPriority(Short priority) {
        this.priority = priority;
    }

    @Basic
    @Column(name = "comment")
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "note")
    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @ManyToOne
    @JoinColumn(name = "assginee_id", referencedColumnName = "id")
    public UserEntity getAssgineeId() {
        return assgineeId;
    }
    public void setAssgineeId(UserEntity assgineeId){this.assgineeId=assgineeId;}

    @ManyToOne
    @JoinColumn(name = "reporter_id", referencedColumnName = "id")
    public UserEntity getReporterId() {
        return reporterId;
    }
    public void setReporterId(UserEntity reporterId){this.reporterId=reporterId;}

    @ManyToOne
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    public TypeEntity getTypeId() {
        return typeId;
    }
    public void setTypeId(TypeEntity typeId){this.typeId=typeId;}

}
