package com.gestioneunisp.backend.controllers;

import com.gestioneunisp.backend.models.Membro;
import com.gestioneunisp.backend.services.MembroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/membri")
public class MembroController {
    @Autowired
    private MembroService membroService;

    @GetMapping
    public ResponseEntity<List<Membro>> getAllMembri() {
        List<Membro> membri = membroService.getAllMembri();
        return ResponseEntity.ok(membri);
    }

    @PostMapping
    public ResponseEntity<Membro> createMembro(@RequestBody Membro membro) {
        return ResponseEntity.ok(membroService.createMembro(membro));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Membro> getMembroById(@PathVariable Long id) {
        Optional<Membro> membro = membroService.getMembroById(id);
        return membro.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Membro> updateMembro(@PathVariable Long id, @RequestBody Membro updatedMembro) {
        return ResponseEntity.ok(membroService.updateMembro(id, updatedMembro));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMembro(@PathVariable Long id) {
        membroService.softDeleteMembro(id);
        return ResponseEntity.noContent().build();
    }
}
