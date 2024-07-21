import React, {Component} from 'react';
import io from 'socket.io-client';

const SIGNALING_SERVER_URL = 'http://localhost:3000';
const ICE_SERVERS = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
    ],
};
class ClassSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenStream: null,
            mediaRecorder: null,
            recordedChunks: [],
            webcamActive: false,
            micStream: null,
            peerConnection: null,
            remoteStream: null,
        };
        this.socket = io(SIGNALING_SERVER_URL);
    }

    /*-------------------------------P2P Connection-------------------------------------*/
    componentDidMount() {
        this.socket.on('offer', this.handleReceiveOffer);
        this.socket.on('answer', this.handleReceiveAnswer);
        this.socket.on('candidate', this.handleReceiveCandidate);
    }

    handleReceiveOffer = async (offer) => {
        const peerConnection = new RTCPeerConnection(ICE_SERVERS);
        this.setState({ peerConnection });
        peerConnection.onicecandidate = this.handleIceCandidate;
        peerConnection.ontrack = this.handleTrackEvent;

        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        this.socket.emit('answer', answer);
    };

    handleReceiveAnswer = async (answer) => {
        const { peerConnection } = this.state;
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    };

    handleReceiveCandidate = async (candidate) => {
        const { peerConnection } = this.state;
        if (peerConnection) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
    };

    handleIceCandidate = ({ candidate }) => {
        if (candidate) {
            this.socket.emit('candidate', candidate);
        }
    };

    handleTrackEvent = (event) => {
        const remoteStream = new MediaStream();
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
        this.setState({ remoteStream });
        document.getElementById('remote-video').srcObject = remoteStream;
    };

    /*-------------------------------Chat-------------------------------------*/
    handleReceiveMessage = (message) => {
        this.setState((prevState) => ({
            messages: [...prevState.messages, message],
        }));
    };

    handleInputChange = (event) => {
        this.setState({messageInput: event.target.value});
    };

    handleSendMessage = () => {
        const {messageInput} = this.state;
        if (messageInput.trim()) {
            this.socket.emit('chat message', messageInput);
            this.setState((prevState) => ({
                messages: [...prevState.messages, messageInput],
                messageInput: '',
            }));
        }
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSendMessage();
        }
    };
    /*-------------------------------Controls' Functionality-------------------------------------*/
    startScreenShare = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            this.setState({ screenStream });
            document.getElementById('tutorSideVideo').srcObject = screenStream;
            document.getElementById('startScreenShare').style.display = 'none';
            document.getElementById('stopScreenShare').style.display = 'inline';

            const peerConnection = new RTCPeerConnection(ICE_SERVERS);
            this.setState({ peerConnection });
            screenStream.getTracks().forEach(track => peerConnection.addTrack(track, screenStream));
            peerConnection.onicecandidate = this.handleIceCandidate;
            peerConnection.ontrack = this.handleTrackEvent;

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            this.socket.emit('offer', offer);
        } catch (error) {
            console.error('Error starting screen share:', error);
        }
    };

    stopScreenShare = () => {
        const { screenStream, peerConnection } = this.state;
        if (screenStream) {
            screenStream.getTracks().forEach((track) => track.stop());
            this.setState({ screenStream: null });
        }
        if (peerConnection) {
            peerConnection.close();
            this.setState({ peerConnection: null });
        }
        document.getElementById('startScreenShare').style.display = 'inline';
        document.getElementById('stopScreenShare').style.display = 'none';
    };

    startWebcam = async () => {
        try {
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
        } catch (error) {
            console.error('Error starting webcam:', error);
        }
    };

    startRecording = () => {
        const { screenStream } = this.state;
        if (screenStream) {
            const mediaRecorder = new MediaRecorder(screenStream);
            mediaRecorder.ondataavailable = this.handleDataAvailable;
            mediaRecorder.start();
            this.setState({ mediaRecorder });
            document.getElementById('startRecording').style.display = 'none';
            document.getElementById('stopRecording').style.display = 'inline';
        } else {
            console.error('No screen stream available for recording');
        }
    };

    stopRecording = () => {
        const { mediaRecorder } = this.state;
        if (mediaRecorder) {
            mediaRecorder.stop();
            this.setState({ mediaRecorder: null });
            document.getElementById('startRecording').style.display = 'inline';
            document.getElementById('stopRecording').style.display = 'none';
            document.getElementById('downloadIcon').style.display = 'inline';
        }
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
        const { micStream, audioElement } = this.state;
        if (micStream) {
            micStream.getAudioTracks().forEach((track) => (track.enabled = false));
            audioElement.pause();
            document.getElementById('microphone').style.display = 'none';
            document.getElementById('mute-microphone').style.display = 'inline';
        }
    };

    unmuteMicrophone = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioElement = document.createElement('audio');
            audioElement.srcObject = stream;
            audioElement.play();
            this.setState({ micStream: stream, audioElement: audioElement });
            document.getElementById('mute-microphone').style.display = 'none';
            document.getElementById('microphone').style.display = 'inline';
            document.getElementById('microphone').onclick = this.muteMicrophone;
        } catch (error) {
            console.error('Error muting microphone:', error);
        }
    };

    /*-------------------------------Containers-------------------------------------*/

    render() {
        return (
            /*-------------------------------Menu-------------------------------------*/
            <div style={{display: 'flex'}}>
                <div className="menu-bar" style={{width: '200px', backgroundColor: '#f8f9fa', padding: '15px'}}>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="profile"
                               style={{color: '#333', display: 'flex', alignItems: 'center'}}>
                                <i className="fas fa-user" style={{marginRight: '5px'}}></i> Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="portal"
                               style={{color: '#333', display: 'flex', alignItems: 'center'}}>
                                <i className="fas fa-door-open" style={{marginRight: '5px'}}></i> Portal
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="calender"
                               style={{color: '#333', display: 'flex', alignItems: 'center'}}>
                                <i className="fas fa-calendar-alt" style={{marginRight: '5px'}}></i> Calendar
                            </a>
                        </li>
                    </ul>
                </div>
                {/*-------------------------------Webcam-------------------------------------*/}
                <div id="main-content" style={{flexGrow: 1}}>
                    <div id="video-container"
                         className="d-flex justify-content-center align-items-end position-relative">
                        <div id="webcam-container" className="rounded-circle border border-light" style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '150px',
                            height: '150px',
                            display: 'none',
                            overflow: 'hidden'
                        }}>
                            <video id="webcam-video" autoPlay muted className="w-100 h-100"
                                   style={{objectFit: 'cover'}}></video>
                        </div>
                        {/*-------------------------------Shared screen-------------------------------------*/}
                        <video id="tutorSideVideo" autoPlay className="bg-dark border border-dark"
                               style={{width: '80%', marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}></video>
                    </div>
                    {/*-------------------------------controls icons-------------------------------------*/}
                    <div id="controls"
                         className="position-absolute bottom-0 start-50 translate-middle-x d-flex justify-content-center mb-3">
                        <button className="btn btn-primary me-2" id="startScreenShare" onClick={this.startScreenShare}>
                            <i className="fas fa-share-square"></i>
                        </button>
                        <button className="btn btn-danger me-2" id="stopScreenShare" onClick={this.stopScreenShare}
                                style={{display: 'none'}}>
                            <i className="fas fa-ban"></i>
                        </button>
                        <button className="btn btn-primary me-2" id="startWebcam" onClick={this.startWebcam}>
                            <i className="fas fa-video"></i>
                        </button>
                        <button className="btn btn-danger me-2" id="stopWebcam" style={{display: 'none'}}>
                            <i className="fas fa-ban"></i>
                        </button>
                        <button className="btn btn-primary me-2" id="microphone" style={{display: 'none'}}>
                            <i className="fas fa-microphone"></i>
                        </button>
                        <button className="btn btn-danger me-2" id="mute-microphone" onClick={this.unmuteMicrophone}>
                            <i className="fas fa-microphone-slash"></i>
                        </button>
                        <button className="btn btn-primary me-2" id="startRecording" onClick={this.startRecording}>
                            <i className="fas fa-circle"></i>
                        </button>
                        <button className="btn btn-danger me-2" id="stopRecording" onClick={this.stopRecording}
                                style={{display: 'none'}}>
                            <i className="fas fa-stop"></i>
                        </button>
                        <button className="btn btn-success" id="downloadIcon" onClick={this.downloadRecording}
                                style={{display: 'none'}}>
                            <i className="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


export default ClassSession;
