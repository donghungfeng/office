package dnhung.office.entity;

import javax.persistence.*;

@Entity
@Table(name = "notification", schema = "main", catalog = "")
public class NotificationEntity {
    private Long id;
    private UserEntity toId;
    private String from;
    private String content;
    private Double time;
    private Short status;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "to_id", referencedColumnName = "id")
    public UserEntity getToId() {
        return toId;
    }
    public void setToId(UserEntity toId){this.toId=toId;}

    @Basic
    @Column(name = "from")
    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    @Basic
    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "time")
    public Double getTime() {
        return time;
    }

    public void setTime(Double time) {
        this.time = time;
    }

    @Basic
    @Column(name = "status")
    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

}
