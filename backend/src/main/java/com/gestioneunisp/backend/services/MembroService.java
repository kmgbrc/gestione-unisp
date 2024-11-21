package com.gestioneunisp.backend.services;

import com.gestioneunisp.backend.models.Membro;
import com.gestioneunisp.backend.repositories.MembroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembroService {
    @Autowired
    private MembroRepository membroRepository;


    public List<Membro> getAllMembri() {
        return membroRepository.findAllNonDeleted();
    }

    public Membro createMembro(Membro membro) {
        return membroRepository.save(membro);
    }

    public Membro updateMembro(Long id, Membro updatedMembro) {
        return membroRepository.findById(id).map(membro -> {
            membro.setNome(updatedMembro.getNome());
            membro.setCognome(updatedMembro.getCognome());
            membro.setEmail(updatedMembro.getEmail());
            membro.setTelefono(updatedMembro.getTelefono());
            membro.setCategoria(updatedMembro.getCategoria());
            membro.setStato(updatedMembro.getStato());
            membro.setCodiceFiscale(updatedMembro.getCodiceFiscale());
            membro.setPermessoSoggiorno(updatedMembro.getPermessoSoggiorno());
            membro.setPassaporto(updatedMembro.getPassaporto());
            membro.setCertificatoStudente(updatedMembro.getCertificatoStudente());
            membro.setDichiarazioneIsee(updatedMembro.getDichiarazioneIsee());
            membro.setDataUltimoRinnovo(updatedMembro.getDataUltimoRinnovo());
            return membroRepository.save(membro);
        }).orElseThrow(() -> new RuntimeException("Membro non trovato con ID: " + id));
    }

    public void deleteMembro(Long id) {
        membroRepository.deleteById(id);
    }

    // Cancella logicamente un membro
    public void softDeleteMembro(Long id) {
        Membro membro = membroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membro non trovato con ID: " + id));
        membro.setIsDeleted(true); // Imposta isDeleted a true
        membroRepository.save(membro);
    }

    public Optional<Membro> getMembroById(Long id) {
        return membroRepository.findById(id);
    }
}
