import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { db } from "../../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
                author: doc.data().authorEmail,
                createdAt: doc.data().createdAt?.toDate()
            }));
            setPosts(postsData);
            console.log("Posts carregados:", postsData);
        });

        return () => unsubscribe();
    }, []);

    return (
            <div className={styles.dashboard}>
                <h1>Painel de Postagens</h1>
                {posts.length === 0 ? (
                    <p>Nenhum post encontrado.</p>
                ) : (
                    <ul className={styles.postList}>
                        {posts.map((post) => (
                            <li key={post.id} className={styles.postItem}>
                                <Link to={`/post/${post.id}`}>
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
