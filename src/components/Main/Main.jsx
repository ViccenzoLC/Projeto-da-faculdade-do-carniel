import { useState, useRef } from "react";
import styles from "./Main.module.css";

const initialForm = { nome: "", email: "", telefone: "", texto: "" };

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Main() {
    const [form, setForm] = useState(initialForm);
    const [files, setFiles] = useState([]);
    const [items, setItems] = useState([]);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function addFiles(fileList) {
        const novos = Array.from(fileList);
        setFiles((prev) => [...prev, ...novos]);
    }

    function removeFile(index) {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);
        addFiles(e.dataTransfer.files);
    }

    function handleDragOver(e) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setDragging(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setItems((prev) => [...prev, { id: Date.now(), ...form, files }]);
        setForm(initialForm);
        setFiles([]);
        if (inputRef.current) inputRef.current.value = "";
    }

    function removeItem(id) {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Denuncia</h2>

                <label className={styles.label}>
                    Nome
                    <input
                        className={styles.input}
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Digite seu nome"
                        required
                    />
                </label>

                <label className={styles.label}>
                    E-mail
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="exemplo@email.com"
                        required
                    />
                </label>

                <label className={styles.label}>
                    Telefone
                    <input
                        className={styles.input}
                        type="tel"
                        name="telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        placeholder="(45) 99999-9999"
                        required
                    />
                </label>

                <label className={styles.label}>
                    Texto
                    <textarea
                        className={styles.textarea}
                        name="texto"
                        value={form.texto}
                        onChange={handleChange}
                        placeholder="Escreva sua mensagem..."
                        rows={5}
                    />
                </label>

                <div
                    className={`${styles.dropzone} ${dragging ? styles.dragging : ""}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => inputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
                    }}
                >
                    <p className={styles.dropText}>
                        Arraste arquivos aqui ou <span>clique para selecionar</span>
                    </p>
                    <input
                        ref={inputRef}
                        className={styles.fileInput}
                        type="file"
                        multiple
                        onChange={(e) => addFiles(e.target.files)}
                    />
                </div>

                {files.length > 0 && (
                    <ul className={styles.fileList}>
                        {files.map((file, index) => (
                            <li key={`${file.name}-${index}`} className={styles.fileItem}>
                                <span className={styles.fileName}>{file.name}</span>
                                <span className={styles.fileSize}>{formatSize(file.size)}</span>
                                <button
                                    type="button"
                                    className={styles.removeBtn}
                                    onClick={() => removeFile(index)}
                                    aria-label={`Remover ${file.name}`}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <button className={styles.submitBtn} type="submit">
                    Adicionar à lista
                </button>
            </form>

            {items.length > 0 && (
                <section className={styles.list}>
                    <h2 className={styles.title}>Lista</h2>
                    {items.map((item) => (
                        <article key={item.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <strong>{item.nome}</strong>
                                <button
                                    type="button"
                                    className={styles.removeBtn}
                                    onClick={() => removeItem(item.id)}
                                    aria-label="Remover item"
                                >
                                    ×
                                </button>
                            </div>
                            <p>{item.email}</p>
                            <p>{item.telefone}</p>
                            {item.texto && <p className={styles.cardText}>{item.texto}</p>}
                            {item.files.length > 0 && (
                                <ul className={styles.cardFiles}>
                                    {item.files.map((file, i) => (
                                        <li key={i}>
                                            {file.name} ({formatSize(file.size)})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}

export default Main;