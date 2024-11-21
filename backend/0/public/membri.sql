create table membri
(
    id                   bigserial
        primary key,
    nome                 varchar(50)               not null,
    cognome              varchar(50)               not null,
    email                varchar(100)              not null
        unique,
    telefono             varchar(20),
    categoria            varchar(20)
        constraint membri_categoria_check
            check ((categoria)::text = ANY
                   ((ARRAY ['staff'::character varying, 'volontario'::character varying, 'passivo'::character varying])::text[])),
    stato                varchar(20) default 'attivo'::character varying
        constraint membri_stato_check
            check ((stato)::text = ANY
                   ((ARRAY ['attivo'::character varying, 'inattivo'::character varying, 'escluso'::character varying])::text[])),
    codice_fiscale       varchar(16)               not null,
    permesso_soggiorno   boolean     default false not null,
    passaporto           boolean     default false not null,
    certificato_studente boolean     default false,
    dichiarazione_isee   boolean     default false,
    data_iscrizione      date        default CURRENT_DATE,
    data_ultimo_rinnovo  date,
    is_deleted           boolean     default false
);

alter table membri
    owner to postgres;

