"use client"

import React from 'react';
import ReactPlayer from 'react-player';

const BackgroundVideo = () => {
    return (
        <div style={styles.container}>
            <ReactPlayer
                url="/bg-video.mp4" // Replace with your video file path
                playing
                loop
                muted
                width="100%"
                height="100%"
                style={styles.video}
            />
            <div style={styles.overlay}>
                <h1 style={styles.text}>Your Content Here</h1>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1, // Push video behind content
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
        color: 'white',
        zIndex: 1,
    },
    text: {
        fontSize: '3rem',
        textAlign: 'center',
    },
};

export default BackgroundVideo;
