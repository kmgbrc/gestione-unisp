package com.gestioneunisp.backend.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "membri")
public class Membro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nome;

    @Column(nullable = false, length = 50)
    private String cognome;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 20)
    private String telefono;

    @Column(nullable = false, length = 20)
    private String categoria;

    @Column(nullable = false, length = 20)
    private String stato;

    @Column(name = "codice_fiscale", nullable = false, length = 16, updatable = false)
    private String codiceFiscale;

    @Column(name = "permesso_soggiorno")
    private Boolean permessoSoggiorno;

    @Column(name = "passaporto")
    private Boolean passaporto;

    @Column(name = "certificato_studente")
    private Boolean certificatoStudente;

    @Column(name = "dichiarazione_isee")
    private Boolean dichiarazioneIsee;

    @Column(name = "data_iscrizione", nullable = false, updatable = false)
    private LocalDate dataIscrizione;

    @Column(name = "data_ultimo_rinnovo")
    private LocalDate dataUltimoRinnovo;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false; // Nuovo attributo per cancellazione logica

    // Costruttore predefinito
    public Membro() {
        this.dataIscrizione = LocalDate.now(); // Imposta automaticamente la data di iscrizione
    }

    // Getters e Setters...


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getStato() {
        return stato;
    }

    public void setStato(String stato) {
        this.stato = stato;
    }

    public String getCodiceFiscale() {
        return codiceFiscale;
    }

    public void setCodiceFiscale(String codiceFiscale) {
        this.codiceFiscale = codiceFiscale;
    }

    public Boolean getPermessoSoggiorno() {
        return permessoSoggiorno;
    }

    public void setPermessoSoggiorno(Boolean permessoSoggiorno) {
        this.permessoSoggiorno = permessoSoggiorno;
    }

    public Boolean getPassaporto() {
        return passaporto;
    }

    public void setPassaporto(Boolean passaporto) {
        this.passaporto = passaporto;
    }

    public Boolean getCertificatoStudente() {
        return certificatoStudente;
    }

    public void setCertificatoStudente(Boolean certificatoStudente) {
        this.certificatoStudente = certificatoStudente;
    }

    public Boolean getDichiarazioneIsee() {
        return dichiarazioneIsee;
    }

    public void setDichiarazioneIsee(Boolean dichiarazioneIsee) {
        this.dichiarazioneIsee = dichiarazioneIsee;
    }

    public LocalDate getDataIscrizione() {
        return dataIscrizione;
    }

    public void setDataIscrizione(LocalDate dataIscrizione) {
        this.dataIscrizione = dataIscrizione;
    }

    public LocalDate getDataUltimoRinnovo() {
        return dataUltimoRinnovo;
    }

    public void setDataUltimoRinnovo(LocalDate dataUltimoRinnovo) {
        this.dataUltimoRinnovo = dataUltimoRinnovo;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}

