create table pagamenti
(
    id             serial
        primary key,
    membro_id      integer
        references membri
            on delete cascade,
    tipo_pagamento varchar(20)
        constraint pagamenti_tipo_pagamento_check
            check ((tipo_pagamento)::text = ANY
                   ((ARRAY ['iscrizione'::character varying, 'donazione'::character varying])::text[])),
    importo        numeric(10, 2) not null,
    data_pagamento timestamp default CURRENT_TIMESTAMP,
    transazione_id varchar(100)   not null
        unique
);

alter table pagamenti
    owner to postgres;

