package za.ac.cput.factory;

import za.ac.cput.domain.Voucher;

import java.time.LocalDateTime;

public class VoucherFactory {

    // Factory method to create a voucher with a unique code
    public static Voucher createVoucher(String code) {
        return new Voucher.Builder()
                .setCode(code)
                .setExpiryDate(LocalDateTime.now().plusDays(30)) // Set default expiry to 30 days from now
                .build();
    }

    // Factory method to create a voucher with custom created and expiry dates
    public static Voucher createCustomVoucher(String code, LocalDateTime createdAt, LocalDateTime expiryDate) {
        return new Voucher.Builder()
                .setCode(code)
                .setCreatedAt(createdAt)
                .setExpiryDate(expiryDate)
                .build();
    }

    // Factory method to create a voucher that is already redeemed
    public static Voucher createRedeemedVoucher(String code, LocalDateTime redeemedAt) {
        return new Voucher.Builder()
                .setCode(code)
                .setIsRedeemed(true)
                .setRedeemedAt(redeemedAt)
                .setExpiryDate(redeemedAt.plusDays(30)) // Expiry date is 30 days after being redeemed
                .build();
    }
}
