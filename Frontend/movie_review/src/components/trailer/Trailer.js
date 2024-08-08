import React from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import './Trailer.css';

const Trailer = () => {
    const { ytTrailerId } = useParams();

    return (
        <div className="react-player-container">
            {ytTrailerId ? (
                <ReactPlayer
                    controls
                    playing
                    url={`https://www.youtube.com/watch?v=${ytTrailerId}`}
                    width='100%'
                    height='100%'
                />
            ) : (
                <p>No trailer available</p>
            )}
        </div>
    );
};

export default Trailer;
