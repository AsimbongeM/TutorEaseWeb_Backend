import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

class ClassSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenStream: null,
            mediaRecorder: null,
            recordedChunks: [],
            webcamActive: false,
            micStream: null,
        };
    }

    startScreenShare = async () => {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        this.setState({ screenStream });
        document.getElementById('tutorSideVideo').srcObject = screenStream;
        document.getElementById('startScreenShare').style.display = 'none';
        document.getElementById('stopScreenShare').style.display = 'inline';
    };

    stopScreenShare = () => {
        const { screenStream } = this.state;
        screenStream.getTracks().forEach((track) => track.stop());
        document.getElementById('startScreenShare').style.display = 'inline';
        document.getElementById('stopScreenShare').style.display = 'none';
    };

    startWebcam = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('webcam-video').srcObject = stream;
        this.setState({ webcamActive: true });
        document.getElementById('startWebcam').style.display = 'none';
        document.getElementById('stopWebcam').style.display = 'inline';
        document.getElementById('webcam-container').style.display = 'block';
        document.getElementById('stopWebcam').onclick = () => {
            stream.getTracks().forEach((track) => track.stop());
            document.getElementById('webcam-video').srcObject = null;
            this.setState({ webcamActive: false });
            document.getElementById('startWebcam').style.display = 'inline';
            document.getElementById('stopWebcam').style.display = 'none';
            document.getElementById('webcam-container').style.display = 'none';
        };
    };

    startRecording = () => {
        const { screenStream } = this.state;
        const mediaRecorder = new MediaRecorder(screenStream);
        mediaRecorder.ondataavailable = this.handleDataAvailable;
        mediaRecorder.start();
        this.setState({ mediaRecorder });
        document.getElementById('startRecording').style.display = 'none';
        document.getElementById('stopRecording').style.display = 'inline';
    };

    stopRecording = () => {
        const { mediaRecorder } = this.state;
        mediaRecorder.stop();
        document.getElementById('startRecording').style.display = 'inline';
        document.getElementById('stopRecording').style.display = 'none';
        document.getElementById('downloadIcon').style.display = 'inline';
    };

    handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            this.setState((prevState) => ({
                recordedChunks: [...prevState.recordedChunks, event.data],
            }));
        }
    };

    downloadRecording = () => {
        const { recordedChunks } = this.state;
        const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const recordedUrl = URL.createObjectURL(recordedBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = recordedUrl;
        downloadLink.download = 'class_recording.webm';
        downloadLink.click();
    };

    muteMicrophone = async () => {
        const { micStream } = this.state;
        micStream.getAudioTracks().forEach((track) => (track.enabled = false));
        document.getElementById('microphone').style.display = 'inline';
        document.getElementById('mute-microphone').style.display = 'none';
    };

    unmuteMicrophone = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.setState({ micStream: stream });
        const audioElement = document.createElement('audio');
        audioElement.srcObject = stream;
        audioElement.play();
        document.getElementById('microphone').style.display = 'none';
        document.getElementById('mute-microphone').style.display = 'inline';
        document.getElementById('mute-microphone').onclick = this.muteMicrophone;
    };

    render() {
        return (
            <div>
                <div id="video-container" className="d-flex justify-content-center align-items-end">
                    <div id="webcam-container" className="position-absolute" style={{ display: 'none' }}>
                        <video id="webcam-video" autoPlay muted></video>
                    </div>
                    <video id="tutorSideVideo" autoPlay className="bg-dark border border-dark" style={{ width: '80%' }}></video>
                </div>

                <div id="controls" className="position-absolute bottom-0 start-50 translate-middle-x d-flex justify-content-center">
                    <button className="btn btn-primary me-2" id="startScreenShare" onClick={this.startScreenShare}>
                        <i className="bi bi-tv"></i>
                    </button>
                    <button className="btn btn-danger me-2" id="stopScreenShare" onClick={this.stopScreenShare} style={{ display: 'none' }}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    <button className="btn btn-primary me-2" id="startWebcam" onClick={this.startWebcam}>
                        <i className="bi bi-camera-video"></i>
                    </button>
                    <button className="btn btn-danger me-2" id="stopWebcam" style={{ display: 'none' }}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    <button className="btn btn-primary me-2" id="microphone" onClick={this.unmuteMicrophone}>
                        <i className="bi bi-mic"></i>
                    </button>
                    <button className="btn btn-danger me-2" id="mute-microphone" style={{ display: 'none' }}>
                        <i className="bi bi-mic-mute"></i>
                    </button>
                    <button className="btn btn-primary me-2" id="startRecording" onClick={this.startRecording}>
                        <i className="bi bi-record-circle"></i>
                    </button>
                    <button className="btn btn-danger me-2" id="stopRecording" onClick={this.stopRecording} style={{ display: 'none' }}>
                        <i className="bi bi-stop-circle"></i>
                    </button>
                    <button className="btn btn-success" id="downloadIcon" onClick={this.downloadRecording} style={{ display: 'none' }}>
                        <i className="bi bi-download"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default ClassSession;
