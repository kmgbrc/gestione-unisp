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
CREATE TABLE attivita (
                          id SERIAL PRIMARY KEY,
                          titolo VARCHAR(100) NOT NULL,
                          descrizione TEXT,
                          data_ora TIMESTAMP NOT NULL,
                          luogo VARCHAR(100),
                          num_max_partecipanti INT DEFAULT 300
);
CREATE TABLE partecipazioni (
                                id SERIAL PRIMARY KEY,
                                membro_id INT REFERENCES membri(id) ON DELETE CASCADE,
                                attivita_id INT REFERENCES attivita(id) ON DELETE CASCADE,
                                presente BOOLEAN DEFAULT FALSE,
                                num_assenze INT DEFAULT 0,
                                num_deleghe INT DEFAULT 0
);
CREATE TABLE pagamenti (
                           id SERIAL PRIMARY KEY,
                           membro_id INT REFERENCES membri(id) ON DELETE CASCADE,
                           tipo_pagamento VARCHAR(20) CHECK (tipo_pagamento IN ('iscrizione', 'donazione')),
                           importo NUMERIC(10, 2) NOT NULL,
                           data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           transazione_id VARCHAR(100) UNIQUE NOT NULL
);
CREATE TABLE notifiche (
                           id SERIAL PRIMARY KEY,
                           membro_id INT REFERENCES membri(id) ON DELETE CASCADE,
                           contenuto TEXT NOT NULL,
                           data_invio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           letto BOOLEAN DEFAULT FALSE
);
CREATE TABLE sessioni (
                          id SERIAL PRIMARY KEY,
                          membro_id INT REFERENCES membri(id) ON DELETE CASCADE,
                          token VARCHAR(255) NOT NULL,
                          data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          data_scadenza TIMESTAMP
);
INSERT INTO membri (
    nome, cognome, email, telefono, categoria, stato, codice_fiscale,
    permesso_soggiorno, passaporto, certificato_studente,
    dichiarazione_isee, data_iscrizione, data_ultimo_rinnovo, is_deleted
)
VALUES
-- Membres de catégorie 'staff'
('Giulia', 'Rossi', 'giulia.rossi@example.com', '3912345678', 'staff', 'attivo', 'RSSGLI85M41H501Z', true, false, false, true, '2023-01-15', '2023-01-15', false),
('Marco', 'Bianchi', 'marco.bianchi@example.com', '3912345679', 'staff', 'attivo', 'BNCMRC75T10A001Z', true, true, false, false, '2022-09-10', '2023-09-10', false),
('Lucia', 'Verdi', 'lucia.verdi@example.com', '3912345680', 'staff', 'inattivo', 'VRDLCA90M25C351Z', false, true, true, true, '2021-03-20', '2022-03-20', false),
('Antonio', 'Esposito', 'antonio.esposito@example.com', '3912345681', 'staff', 'attivo', 'SPSANT95L18A501Z', true, false, false, false, '2023-05-12', '2023-05-12', false),

-- Membres de catégorie 'volontario'
('Francesca', 'Conti', 'francesca.conti@example.com', '3912345682', 'volontario', 'attivo', 'CNTFNC82R10H501Z', true, true, false, true, '2020-07-01', '2022-07-01', false),
('Davide', 'Romano', 'davide.romano@example.com', '3912345683', 'volontario', 'attivo', 'RMNDVD87P05H501Z', false, false, true, true, '2022-04-18', '2023-04-18', false),
('Elisa', 'Ricci', 'elisa.ricci@example.com', '3912345684', 'volontario', 'inattivo', 'RCCELS79T20A001Z', false, true, true, false, '2021-12-25', '2022-12-25', false),
('Matteo', 'Marini', 'matteo.marini@example.com', '3912345685', 'volontario', 'attivo', 'MRNMTO99C15A001Z', true, false, false, true, '2023-06-05', '2023-06-05', false),

-- Membres de catégorie 'passivo'
('Silvia', 'Gallo', 'silvia.gallo@example.com', '3912345686', 'passivo', 'inattivo', 'GLLSLV80L20A001Z', false, false, false, false, '2021-05-01', '2022-05-01', false),
('Lorenzo', 'Ferri', 'lorenzo.ferri@example.com', '3912345687', 'passivo', 'escluso', 'FRRLNZ93M10H501Z', false, true, true, false, '2019-11-11', NULL, false),
('Valeria', 'Santoro', 'valeria.santoro@example.com', '3912345688', 'passivo', 'attivo', 'SNTVLR77R15H501Z', true, false, false, false, '2022-08-15', '2023-08-15', false),
('Federico', 'Russo', 'federico.russo@example.com', '3912345689', 'passivo', 'attivo', 'RSSFRC81M30A001Z', false, true, true, false, '2023-03-12', NULL, false),

-- Autres membres avec des valeurs variées
('Sara', 'Barbieri', 'sara.barbieri@example.com', '3912345690', 'volontario', 'attivo', 'BRBSRA95S15C351Z', true, true, false, true, '2023-07-18', '2023-07-18', false),
('Alessandro', 'Fontana', 'alessandro.fontana@example.com', '3912345691', 'staff', 'attivo', 'FNTALS87P25H501Z', false, false, true, false, '2021-10-30', '2022-10-30', false),
('Chiara', 'De Luca', 'chiara.deluca@example.com', '3912345692', 'staff', 'inattivo', 'DLCCHR78S15A001Z', true, false, false, false, '2020-02-20', NULL, false),
('Marta', 'Parisi', 'marta.parisi@example.com', '3912345693', 'volontario', 'escluso', 'PRSMRT93T30C351Z', false, true, true, false, '2018-01-10', '2019-01-10', true),
('Nicola', 'Ferrari', 'nicola.ferrari@example.com', '3912345694', 'passivo', 'attivo', 'FRRNCL76R20H501Z', true, false, false, true, '2022-09-05', '2023-09-05', false),
('Emma', 'Leone', 'emma.leone@example.com', '3912345695', 'staff', 'attivo', 'LNEMMA88L25A001Z', false, false, false, false, '2023-04-04', NULL, false),
('Tommaso', 'Vitali', 'tommaso.vitali@example.com', '3912345696', 'volontario', 'attivo', 'VTTLMT99C30H501Z', true, true, true, false, '2023-02-28', '2023-02-28', false),
('Angela', 'Greco', 'angela.greco@example.com', '3912345697', 'passivo', 'attivo', 'GRCANL85P15A001Z', false, true, false, true, '2022-11-15', '2023-11-15', false);

