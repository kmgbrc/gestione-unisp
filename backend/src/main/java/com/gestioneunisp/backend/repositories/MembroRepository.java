package com.gestioneunisp.backend.repositories;

import com.gestioneunisp.backend.models.Membro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembroRepository extends JpaRepository<Membro, Long> {
    // Trova tutti i membri non eliminati
    @Query("SELECT m FROM Membro m WHERE m.isDeleted = false")
    List<Membro> findAllNonDeleted();
}

