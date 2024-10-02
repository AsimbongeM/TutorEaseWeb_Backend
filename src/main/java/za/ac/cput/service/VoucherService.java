package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Voucher;
import za.ac.cput.repository.VoucherRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VoucherService implements IVoucherService {
    private final VoucherRepository voucherRepository;

    @Autowired
    public VoucherService(VoucherRepository voucherRepository) {
        this.voucherRepository = voucherRepository;
    }

    @Override
    public Voucher createVoucher(String code) {
        Voucher voucher = new Voucher.Builder()
                .setCode(code)
                .setExpiryDate(LocalDateTime.now().plusDays(30)) // Set expiration date to 30 days from now
                .build();
        return voucherRepository.save(voucher);
    }

    @Override
    public Optional<Voucher> getVoucherById(Long id) {
        return voucherRepository.findById(id);
    }

    @Override
    public Optional<Voucher> getVoucherByCode(String code) {
        return voucherRepository.findByCode(code);
    }

    @Override
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    @Override
    public Voucher redeemVoucher(String code) {
        Optional<Voucher> optionalVoucher = voucherRepository.findByCode(code);
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            if (!voucher.isRedeemed() && voucher.getExpiryDate().isAfter(LocalDateTime.now())) {
                // Mark the voucher as redeemed and set the redemption time
                Voucher updatedVoucher = new Voucher.Builder()
                        .copy(voucher)
                        .setIsRedeemed(true)
                        .setRedeemedAt(LocalDateTime.now())
                        .build();
                return voucherRepository.save(updatedVoucher);
            } else {
                throw new IllegalArgumentException("Voucher is either already redeemed or expired.");
            }
        } else {
            throw new IllegalArgumentException("Voucher with code " + code + " not found.");
        }
    }

    @Override
    public void deleteVoucher(Long id) {
        voucherRepository.deleteById(id);
    }
}
