import { useParams } from 'react-router-dom';
import './Trailer.css';

const Trailer = () => {
    const { ytTrailerId } = useParams();
    console.log(ytTrailerId);

    return (
        <div className="react-player-container">
            {/* <ReactPlayer controls={true} playing={true} url={`https://www.youtube.com/watch?v=${ytTrailerId}`} width='100%' height='100%' /> */}
        </div>
    )
}

export default Trailer;
