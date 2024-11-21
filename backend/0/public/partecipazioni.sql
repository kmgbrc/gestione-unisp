create table partecipazioni
(
    id          serial
        primary key,
    membro_id   integer
        references membri
            on delete cascade,
    attivita_id integer
        references attivita
            on delete cascade,
    presente    boolean default false,
    num_assenze integer default 0,
    num_deleghe integer default 0
);

alter table partecipazioni
    owner to postgres;

