create table sessioni
(
    id             serial
        primary key,
    membro_id      integer
        references membri
            on delete cascade,
    token          varchar(255) not null,
    data_creazione timestamp default CURRENT_TIMESTAMP,
    data_scadenza  timestamp
);

alter table sessioni
    owner to postgres;

