package za.ac.cput.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code; // Code for the voucher
    private LocalDateTime createdAt; // Date when the voucher was created
    private LocalDateTime expiryDate; // Date when the voucher expires
    private boolean isRedeemed; // Flag to indicate if the voucher has been redeemed
    private LocalDateTime redeemedAt; // Date when the voucher was redeemed

    public Voucher() {}

    public Voucher(Builder builder) {
        this.id = builder.id;
        this.code = builder.code;
        this.createdAt = builder.createdAt;
        this.expiryDate = builder.expiryDate;
        this.isRedeemed = builder.isRedeemed;
        this.redeemedAt = builder.redeemedAt;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public boolean isRedeemed() {
        return isRedeemed;
    }

    public LocalDateTime getRedeemedAt() {
        return redeemedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Voucher that = (Voucher) o;
        return isRedeemed == that.isRedeemed && Objects.equals(id, that.id) && Objects.equals(code, that.code) &&
                Objects.equals(createdAt, that.createdAt) && Objects.equals(expiryDate, that.expiryDate) &&
                Objects.equals(redeemedAt, that.redeemedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, createdAt, expiryDate, isRedeemed, redeemedAt);
    }

    @Override
    public String toString() {
        return "Voucher{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", createdAt=" + createdAt +
                ", expiryDate=" + expiryDate +
                ", isRedeemed=" + isRedeemed +
                ", redeemedAt=" + redeemedAt +
                '}';
    }

    public static class Builder {
        private Long id;
        private String code;
        private LocalDateTime createdAt;
        private LocalDateTime expiryDate;
        private boolean isRedeemed = false; // Default value
        private LocalDateTime redeemedAt;

        public Builder setCode(String code) {
            this.code = code;
            return this;
        }

        public Builder setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder setExpiryDate(LocalDateTime expiryDate) {
            this.expiryDate = expiryDate;
            return this;
        }

        public Builder setIsRedeemed(boolean isRedeemed) {
            this.isRedeemed = isRedeemed;
            return this;
        }

        public Builder setRedeemedAt(LocalDateTime redeemedAt) {
            this.redeemedAt = redeemedAt;
            return this;
        }

        public Builder copy(Voucher voucher) {
            this.id = voucher.id;
            this.code = voucher.code;
            this.createdAt = voucher.createdAt;
            this.expiryDate = voucher.expiryDate;
            this.isRedeemed = voucher.isRedeemed;
            this.redeemedAt = voucher.redeemedAt;
            return this;
        }

        public Voucher build() {
            // Automatically set the creation time during voucher building
            this.createdAt = LocalDateTime.now();
            return new Voucher(this);
        }
    }
}
