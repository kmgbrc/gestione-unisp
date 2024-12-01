package com.unisp.gestioneunisp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PrenotazioneDTO {
    private Long id;
    private Integer numero;
    private Long membroId;
    private Long attivitaId;
    private String stato;
    private String qrCode;
    private LocalDateTime oraPrenotazione;
}