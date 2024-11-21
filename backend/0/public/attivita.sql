create table attivita
(
    id                   serial
        primary key,
    titolo               varchar(100) not null,
    descrizione          text,
    data_ora             timestamp    not null,
    luogo                varchar(100),
    num_max_partecipanti integer default 300
);

alter table attivita
    owner to postgres;

