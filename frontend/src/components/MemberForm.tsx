// src/components/MemberForm.tsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const MemberForm: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            nome: '',
            cognome: '',
            email: '',
            telefono: '',
            categoria: 'volontario',
        },
        validationSchema: Yup.object({
            nome: Yup.string().required('Il nome è obbligatorio'),
            cognome: Yup.string().required('Il cognome è obbligatorio'),
            email: Yup.string().email('Email non valida').required('L’email è obbligatoria'),
            telefono: Yup.string(),
            categoria: Yup.string().required('La categoria è obbligatoria'),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post('/api/membri', values);
                alert('Iscrizione completata con successo!');
            } catch (error) {
                console.error('Errore durante l’iscrizione:', error);
                alert('Si è verificato un errore.');
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.nome && formik.errors.nome && <div>{formik.errors.nome}</div>}
            </div>

            <div>
                <label>Cognome</label>
                <input
                    type="text"
                    name="cognome"
                    value={formik.values.cognome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.cognome && formik.errors.cognome && <div>{formik.errors.cognome}</div>}
            </div>

            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
            </div>

            <div>
                <label>Telefono</label>
                <input
                    type="text"
                    name="telefono"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>

            <div>
                <label>Categoria</label>
                <select
                    name="categoria"
                    value={formik.values.categoria}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="staff">Staff</option>
                    <option value="volontario">Volontario</option>
                    <option value="passivo">Passivo</option>
                </select>
            </div>

            <button type="submit">Iscriviti</button>
        </form>
    );
};

export default MemberForm;
