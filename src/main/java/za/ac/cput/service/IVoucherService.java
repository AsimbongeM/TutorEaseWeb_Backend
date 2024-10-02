package za.ac.cput.service;

import za.ac.cput.domain.Voucher;

import java.util.List;
import java.util.Optional;

public interface IVoucherService {
    Voucher createVoucher(String code);

    Optional<Voucher> getVoucherById(Long id);

    Optional<Voucher> getVoucherByCode(String code);

    List<Voucher> getAllVouchers();

    Voucher redeemVoucher(String code);

    void deleteVoucher(Long id);
}
