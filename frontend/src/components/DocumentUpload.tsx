import { useState } from 'react';
import { useFormik } from 'formik';
import { mixed, object } from 'yup';


const DocumentUpload: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

    const formik = useFormik({
        initialValues: {
            permessoSoggiorno: null,
            passaporto: null,
        },
        validationSchema: object({
            permessoSoggiorno: mixed()
                .required('Permesso di soggiorno obbligatorio')
                .test('fileType', 'Il file doit être un PDF', (value) => {
                    if (!value) return false; // Pas de fichier fourni
                    if (!(value instanceof File)) return false; // Vérifie que c'est un fichier
                    return value.type === "application/pdf"; // Vérifie le type MIME
                }),
            passaporto: mixed()
                .required('Passaporto obbligatorio')
                .test('fileType', 'Il file doit être un PDF', (value) => {
                    if (!value) return false;
                    if (!(value instanceof File)) return false;
                    return value.type === "application/pdf";
                }),
        }),
        onSubmit: (values) => {
            console.log('Documenti caricati:', values);
        },
    });


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFiles([...files, file]);
            formik.setFieldValue(e.target.name, file);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Permesso di Soggiorno</label>
                <input
                    type="file"
                    name="permessoSoggiorno"
                    onChange={handleFileChange}
                />
                {formik.errors.permessoSoggiorno && <div>{formik.errors.permessoSoggiorno}</div>}
            </div>

            <div>
                <label>Passaporto</label>
                <input
                    type="file"
                    name="passaporto"
                    onChange={handleFileChange}
                />
                {formik.errors.passaporto && <div>{formik.errors.passaporto}</div>}
            </div>

            <button type="submit">Carica Documenti</button>
        </form>
    );
};

export default DocumentUpload;
