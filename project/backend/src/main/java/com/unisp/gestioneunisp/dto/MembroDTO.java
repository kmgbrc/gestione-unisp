package com.unisp.gestioneunisp.dto;

import com.unisp.gestioneunisp.model.CategoriaMembro;
import com.unisp.gestioneunisp.model.StatoMembro;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MembroDTO {
    private Long id;
    private String nome;
    private String cognome;
    private String email;
    private String telefono;
    private CategoriaMembro categoria;
    private StatoMembro stato;
    private String codiceFiscale;
    private boolean permessoSoggiorno;
    private boolean passaporto;
    private boolean certificatoStudente;
    private boolean dichiarazioneIsee;
    private LocalDate dataIscrizione;
    private LocalDate dataUltimoRinnovo;
}