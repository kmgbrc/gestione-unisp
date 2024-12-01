package com.unisp.gestioneunisp.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PagamentoDTO {
    private Long id;
    private Long membroId;
    private String tipoPagamento;
    private BigDecimal importo;
    private LocalDateTime dataPagamento;
    private String transazioneId;
}