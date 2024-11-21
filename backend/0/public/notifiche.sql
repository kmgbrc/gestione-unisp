create table notifiche
(
    id         serial
        primary key,
    membro_id  integer
        references membri
            on delete cascade,
    contenuto  text not null,
    data_invio timestamp default CURRENT_TIMESTAMP,
    letto      boolean   default false
);

alter table notifiche
    owner to postgres;

