import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DocumentUpload: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

    const formik = useFormik({
        initialValues: {
            permessoSoggiorno: null,
            passaporto: null,
        },
        validationSchema: Yup.object({
            permessoSoggiorno: Yup.string()
                .required('Permesso di soggiorno obbligatorio')
                .test('fileType', 'Le fichiers doivent être au format PDF', (value) => {
                    // Vérifiez ici le type de fichier ou d'autres conditions
                    return value && value instanceof File; // Assurez-vous que c'est un fichier
                }),
            passaporto: Yup.string()
                .required('Passaporto obbligatorio')
                .test('fileType', 'Le fichier doit être au format PDF', (value) => {
                    return value && value instanceof File; // Assurez-vous que c'est un fichier
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
