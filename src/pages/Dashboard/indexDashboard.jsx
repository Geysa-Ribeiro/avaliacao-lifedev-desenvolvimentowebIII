import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

function Dashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const mockPosts = [
            { id: 1, title: "Primeira postagem", content: "Conteúdo da primeira postagem", author:"Geysa" },
            { id: 2, title: "Segunda postagem", content: "Conteúdo da segunda postagem", author:"João" },
            { id: 3, title: "Terceira postagem", content: "Conteúdo da terceira postagem", author:"Maria" },
            { id: 4, title: "Quarta postagem", content: "Conteúdo da quarta postagem", author:"Carlos" }
        ];
        setPosts(mockPosts);
    }, []);

    return (
        <div className="{styles.dashboard">
            <h1>Painel de Postagens</h1>
            {posts.length === 0 ? (
                <p>Nenhum post encontrado.</p>
            ) : (
                <ul className={styles.postList}>
                    {posts.map((post) => (
                        <li key={post.id} className={styles.postItem}>
                            <Link to={`/posts/${post.id}`}>
                            <h3>{post.title}</h3>
                            </Link>
                            <p>{post.content}</p>
                            <p><strong>Autor:</strong> {post.author}</p>
    
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;