package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Resources {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName; // Field for file name
    private String fileType; // Field for file type

    @Lob
    @Column(length = 10000000)
    private byte[] document;

    @Lob
    @Column(length = 10000000)
    private byte[] recordings;

    @ManyToOne
    @JoinColumn(name = "tutor_email", nullable = false)
    private Tutor tutor;

    // Default constructor
    public Resources() {
    }

    private Resources(Builder builder) {
        this.id = builder.id;
        this.fileName = builder.fileName;
        this.fileType = builder.fileType;
        this.document = builder.document;
        this.recordings = builder.recordings;
        this.tutor = builder.tutor;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public byte[] getDocument() {
        return document;
    }

    public void setDocument(byte[] document) {
        this.document = document;
    }

    public byte[] getRecordings() {
        return recordings;
    }

    public void setRecordings(byte[] recordings) {
        this.recordings = recordings;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Resources resources = (Resources) o;
        return Objects.equals(id, resources.id) &&
                Objects.equals(fileName, resources.fileName) &&
                Objects.equals(fileType, resources.fileType) &&
                Objects.equals(document, resources.document) &&
                Objects.equals(recordings, resources.recordings) &&
                Objects.equals(tutor, resources.tutor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fileName, fileType, document, recordings, tutor);
    }

    @Override
    public String toString() {
        return "Resources{" +
                "id=" + id +
                ", fileName='" + fileName + '\'' +
                ", fileType='" + fileType + '\'' +
                ", document=" + (document != null ? document.length : 0) + " bytes" +
                ", recordings=" + (recordings != null ? recordings.length : 0) + " bytes" +
                ", tutor=" + tutor +
                '}';
    }

    public static class Builder {
        private Long id;
        private String fileName;
        private String fileType;
        private byte[] document;
        private byte[] recordings;
        private Tutor tutor;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setFileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public Builder setFileType(String fileType) {
            this.fileType = fileType;
            return this;
        }

        public Builder setDocument(byte[] document) {
            this.document = document;
            return this;
        }

        public Builder setRecordings(byte[] recordings) {
            this.recordings = recordings;
            return this;
        }

        public Builder setTutor(Tutor tutor) {
            this.tutor = tutor;
            return this;
        }

        public Builder copy(Resources resources) {
            this.id = resources.id;
            this.fileName = resources.fileName;
            this.fileType = resources.fileType;
            this.document = resources.document;
            this.recordings = resources.recordings;
            this.tutor = resources.tutor;
            return this;
        }

        public Resources build() {
            return new Resources(this);
        }
    }
}
