package com.unisp.gestioneunisp.service;

import com.unisp.gestioneunisp.exception.MissingDocumentException;
import com.unisp.gestioneunisp.model.Documenti;
import com.unisp.gestioneunisp.repository.DocumentiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentoService {
    private final DocumentiRepository documentiRepository;
    private static final String UPLOAD_DIR = "uploads/documenti/";

    @Transactional
    public Documenti caricaDocumento(Long membroId, String tipo, MultipartFile file) throws IOException {
        String fileName = String.format("%d_%s_%s", membroId, tipo, file.getOriginalFilename());
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        Documenti documento = Documenti.builder()
                .tipo(tipo)
                .filePath(fileName)
                .stato("pendente")
                .dataCaricamento(LocalDateTime.now())
                .build();

        return documentiRepository.save(documento);
    }

    public List<Documenti> getDocumentiMembro(Long membroId) {
        return documentiRepository.findByMembroIdAndIsDeletedFalse(membroId);
    }

    @Transactional
    public Documenti approvaDocumento(Long documentoId) {
        return documentiRepository.findById(documentoId)
                .map(doc -> {
                    doc.setStato("approvato");
                    return documentiRepository.save(doc);
                })
                .orElseThrow(() -> new MissingDocumentException("Documento non trovato"));
    }

    @Transactional
    public Documenti rifiutaDocumento(Long documentoId, String motivazione) {
        return documentiRepository.findById(documentoId)
                .map(doc -> {
                    doc.setStato("rifiutato");
                    doc.setNote(motivazione);
                    return documentiRepository.save(doc);
                })
                .orElseThrow(() -> new MissingDocumentException("Documento non trovato"));
    }
}