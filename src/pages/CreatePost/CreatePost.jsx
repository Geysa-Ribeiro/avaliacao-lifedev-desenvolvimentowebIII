import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {currentUser}= useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError("Você precisa estar logado para criar um post.");
            return;
        }
        setError(null);
        setIsSubmitting(true);
        try {
            await addDoc(collection(db,'posts'), {
                title,
                content,
                createdAt: serverTimestamp(),
                authorId: currentUser.uid,
                authorEmail: currentUser.email,
            });
        navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao salvar post:', error);
            setError("Erro ao salvar o post. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }    
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