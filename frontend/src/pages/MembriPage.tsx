// src/pages/MembriPage.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Table,
    Button,
    Modal,
    Form,
    Alert,
} from "react-bootstrap";

interface Membro {
    id?: number;
    nome: string;
    cognome: string;
    email: string;
    telefono?: string;
    categoria: "staff" | "volontario" | "passivo";
    stato: "attivo" | "inattivo" | "escluso";
    codiceFiscale: string;
    permessoSoggiorno: boolean;
    passaporto: boolean;
    certificatoStudente?: boolean;
    dichiarazioneIsee?: boolean;
    dataIscrizione?: string;
    dataUltimoRinnovo?: string;
}

const MembriPage: React.FC = () => {
    const [membri, setMembri] = useState<Membro[]>([]);
    const [selectedMembro, setSelectedMembro] = useState<Membro | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState<string | null>(null);

    const fetchMembri = async () => {
        try {
            const response = await axios.get("/api/membri");
            setMembri(response.data); // La lista avrà solo membri con isDeleted = false
        } catch (error) {
            console.error("Errore durante il caricamento dei membri:", error);
        }
    };

    useEffect(() => {
        fetchMembri();
    }, []);

    const handleSave = async (membro: Membro) => {
        try {
            if (typeof membro.id === "number") {
                // Update membro
                await axios.put(`/api/membri/${membro.id}`, membro);
                setAlert("Membro aggiornato con successo!");
            } else {
                // Create membro
                await axios.post("/api/membri", membro);
                setAlert("Membro creato con successo!");
            }
            setShowModal(false);
            fetchMembri();
        } catch (error) {
            console.error("Errore durante il salvataggio del membro:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Sei sicuro di voler cancellare questo membro?")) return;
        try {
            // Richiama l'endpoint DELETE
            await axios.delete(`/api/membri/${id}`);
            setAlert("Membro cancellato con successo!");
            fetchMembri(); // Aggiorna la lista
        } catch (error) {
            console.error("Errore durante la cancellazione del membro:", error);
        }
    };


    const handleEdit = (membro: Membro) => {
        setSelectedMembro(membro);
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedMembro(null);
        setShowModal(true);
    };

    return (
        <Container className="mt-5">
            <h1>Membri</h1>
            {alert && <Alert variant="success">{alert}</Alert>}
            <Button onClick={handleCreate} className="mb-3">
                Crea Nuovo Membro
            </Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Cognome</th>
                    <th>Email</th>
                    <th>Categoria</th>
                    <th>Stato</th>
                    <th>Azioni</th>
                </tr>
                </thead>
                <tbody>
                {membri.map((membro) => (
                    <tr key={membro.id || "new"}>
                        <td>{membro.nome}</td>
                        <td>{membro.cognome}</td>
                        <td>{membro.email}</td>
                        <td>{membro.categoria}</td>
                        <td>{membro.stato}</td>
                        <td>
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEdit(membro)}
                                className="me-2"
                            >
                                Modifica
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(membro.id!)}
                            >
                                Elimina
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedMembro ? "Modifica Membro" : "Crea Nuovo Membro"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MembroForm
                        membro={selectedMembro}
                        onSave={(membro) => handleSave(membro)}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

interface MembroFormProps {
    membro: Membro | null;
    onSave: (membro: Membro) => void;
}

const MembroForm: React.FC<MembroFormProps> = ({ membro, onSave }) => {
    const [formData, setFormData] = useState<Membro>(
        membro || {
            nome: "",
            cognome: "",
            email: "",
            telefono: "",
            categoria: "passivo",
            stato: "attivo",
            codiceFiscale: "", // Obbligatorio durante la creazione
            permessoSoggiorno: false,
            passaporto: false,
            certificatoStudente: false,
            dichiarazioneIsee: false,
        }
    );

    const isEditing = !!membro; // Determina se il form è in modalità modifica

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="cognome" className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="telefono" className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                    type="text"
                    name="telefono"
                    value={formData.telefono || ""}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="categoria" className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                >
                    <option value="staff">Staff</option>
                    <option value="volontario">Volontario</option>
                    <option value="passivo">Passivo</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="stato" className="mb-3">
                <Form.Label>Stato</Form.Label>
                <Form.Select
                    name="stato"
                    value={formData.stato}
                    onChange={handleChange}
                >
                    <option value="attivo">Attivo</option>
                    <option value="inattivo">Inattivo</option>
                    <option value="escluso">Escluso</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="codiceFiscale" className="mb-3">
                <Form.Label>Codice Fiscale</Form.Label>
                <Form.Control
                    type="text"
                    name="codiceFiscale"
                    value={formData.codiceFiscale}
                    onChange={handleChange}
                    required
                    disabled={isEditing} // Modificabile solo durante la creazione
                />
            </Form.Group>

            <Form.Group controlId="permessoSoggiorno" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Permesso di Soggiorno"
                    name="permessoSoggiorno"
                    checked={formData.permessoSoggiorno}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="passaporto" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Passaporto"
                    name="passaporto"
                    checked={formData.passaporto}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="certificatoStudente" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Certificato Studente"
                    name="certificatoStudente"
                    checked={formData.certificatoStudente || false}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="dichiarazioneIsee" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Dichiarazione ISEE"
                    name="dichiarazioneIsee"
                    checked={formData.dichiarazioneIsee || false}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button type="submit" variant="primary">
                Salva
            </Button>
        </Form>
    );
};

export default MembriPage;
