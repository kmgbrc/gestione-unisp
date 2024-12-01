package com.unisp.gestioneunisp.task;

import com.unisp.gestioneunisp.model.Attivita;
import com.unisp.gestioneunisp.model.Membri;
import com.unisp.gestioneunisp.repository.AttivitaRepository;
import com.unisp.gestioneunisp.repository.MembriRepository;
import com.unisp.gestioneunisp.service.NotificaService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NotificationTask {
    private final AttivitaRepository attivitaRepository;
    private final MembriRepository membriRepository;
    private final NotificaService notificaService;

    @Scheduled(cron = "0 30 17 * * *") // Ogni giorno alle 17:30
    public void inviaNotifichePrenotazioni() {
        // Trova attività per oggi
        LocalDateTime oggi = LocalDateTime.now();
        List<Attivita> attivitaOggi = attivitaRepository.findByDataOraBetweenAndIsDeletedFalse(
                oggi.withHour(0).withMinute(0),
                oggi.withHour(23).withMinute(59)
        );

        if (!attivitaOggi.isEmpty()) {
            List<Membri> membri = membriRepository.findAll();
            for (Membri membro : membri) {
                for (Attivita attivita : attivitaOggi) {
                    notificaService.inviaNotificaDistribuzione(membro,
                            String.format("La distribuzione inizierà alle %s presso %s",
                                    attivita.getDataOra().toLocalTime(),
                                    attivita.getLuogo()));
                }
            }
        }
    }
}