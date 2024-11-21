package com.gestioneunisp.backend.utils;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.ByteArrayOutputStream;

public class PDFGenerator {
    public static byte[] generateCartaFedelta(String nome, String cognome, String codiceFiscale) throws Exception {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 18);
                contentStream.setLeading(14.5f);
                contentStream.newLineAtOffset(50, 700);

                contentStream.showText("Carta di Fedeltà");
                contentStream.newLine();
                contentStream.showText("Nome: " + nome);
                contentStream.newLine();
                contentStream.showText("Cognome: " + cognome);
                contentStream.newLine();
                contentStream.showText("Codice Fiscale: " + codiceFiscale);
                contentStream.endText();
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            return outputStream.toByteArray();
        }
    }
}
