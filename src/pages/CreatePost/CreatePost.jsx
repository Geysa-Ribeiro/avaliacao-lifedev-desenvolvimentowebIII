import { useState } from "react";
import styles from "./CreatePost.module.css";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Novo post criado:", { title, content });

        alert("Post criado com sucesso!");

        setTitle("");
        setContent("");
    };

    return (
        <div className={styles.createPost}>
            <h1>Criar novo Post</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Título:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Conteúdo:</label><br />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit">Publicar</button>
            </form>
        </div>
    );
}
export default CreatePost;