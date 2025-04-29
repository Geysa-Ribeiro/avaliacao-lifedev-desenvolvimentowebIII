import { useParams } from "react-router-dom";

function PostView() {
    const { id } = useParams();

    return (
        <div>
            <h1>Visualizando o post {id}</h1>
        </div>
    );
}

export default PostView;