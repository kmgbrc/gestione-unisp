package com.unisp.gestioneunisp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AttivitaDTO {
    private Long id;
    private String titolo;
    private String descrizione;
    private LocalDateTime dataOra;
    private String luogo;
    private Integer numMaxPartecipanti;
}