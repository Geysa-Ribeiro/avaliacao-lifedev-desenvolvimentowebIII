import { useParams } from "react-router-dom";

function PostView() {
    const { id } = useParams();

    const mockPosts = [
        { id: 1, title: "Primeira postagem", content: "Conteúdo da primeira postagem" },
        { id: 2, title: "Segunda postagem", content: "Conteúdo da segunda postagem" },
        { id: 3, title: "Terceira postagem", content: "Conteúdo da terceira postagem" },
        { id: 4, title: "Quarta postagem", content: "Conteúdo da quarta postagem" },
    ];

    const postId = parseInt(id);
    const post = mockPosts.find((p) => p.id === postId);

    if (!post || isNaN(postId)) {
        return <h1>Post não encontrado</h1>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}

export default PostView;