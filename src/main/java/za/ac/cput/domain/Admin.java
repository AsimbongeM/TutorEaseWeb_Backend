package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Admin {
    //Okuhle
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;

  public Admin() {
    }
    private Admin(Builder builder) {
      this.id = builder.id;
      this.username = builder.username;
      this.password = builder.password;

    }
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Admin admin = (Admin) o;
        return Objects.equals(id, admin.id) && Objects.equals(username, admin.username) && Objects.equals(password, admin.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password);
    }

    @Override
    public String toString() {
        return "Admin{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }


    public static class Builder {
      private Long id;
      private String username;
      private String password;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder copy(Admin admin) {
            this.id = admin.id;
            this.username = admin.username;
            this.password = admin.password;
            return this;
        }
        public Admin build() {return new Admin(this);}
    }
}

