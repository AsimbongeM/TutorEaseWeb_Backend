import React, {Component} from 'react';
import io from 'socket.io-client';
// import '../styles/ClassSession.css'
import 'react-calendar/dist/Calendar.css';


const SIGNALING_SERVER_URL = 'http://localhost:3000';
const ICE_SERVERS = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
    ],
};

class ClassSession extends Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('sessionId') || this.generateSessionId();

        this.state = {
            screenStream: null,
            mediaRecorder: null,
            recordedChunks: [],
            webcamActive: false,
            micStream: null,
            peerConnection: null,
            remoteStream: null,
            messages: [],
            messageInput: '',
            isChatboxVisible: false,
            isMenuVisible: false,
            areControlsVisible: true,
            isCalendarVisible: false,
            sessionId,
        };
        this.socket = io(SIGNALING_SERVER_URL);

        // Binding methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.toggleChatbox = this.toggleChatbox.bind(this);
        this.toggleControls = this.toggleControls.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
    }

    generateSessionId() {
        return Math.random().toString(36).substr(2, 9);
    }
    /*-------------------------------P2P Connection-------------------------------------*/
    componentDidMount() {
        const {sessionId} = this.state;
        this.socket.emit('join', sessionId);
        this.socket.on('offer', this.handleReceiveOffer);
        this.socket.on('answer', this.handleReceiveAnswer);
        this.socket.on('candidate', this.handleReceiveCandidate);
        this.socket.on('chat message', this.handleReceiveMessage);
    }

    handleReceiveOffer = async (offer) => {
        const peerConnection = new RTCPeerConnection(ICE_SERVERS);
        this.setState({ peerConnection });
        peerConnection.onicecandidate = this.handleIceCandidate;
        peerConnection.ontrack = this.handleTrackEvent;

        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        this.socket.emit('answer', {answer, sessionId: this.state.sessionId});
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
            this.socket.emit('candidate', {candidate, sessionId: this.state.sessionId});
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
        const {messageInput, sessionId} = this.state;
        if (messageInput.trim()) {
            this.socket.emit('chat message', {message: messageInput, sessionId});
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

    /*-------------------------------Toggle Functions-------------------------------------*/
    toggleChatbox() {
        this.setState(prevState => ({
            isChatboxVisible: !prevState.isChatboxVisible
        }));
    }


    toggleControls() {
        this.setState(prevState => ({
            areControlsVisible: !prevState.areControlsVisible
        }));
    }

    toggleCalendar() {
        this.setState({isCalendarVisible: !this.state.isCalendarVisible});
    }

    componentDidUpdate() {
        const chatbox = document.getElementById('chatbox');
        if (chatbox) {
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }
    /*-------------------------------Containers-------------------------------------*/

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {/*-------------------------------Menu-------------------------------------*/}
                    <div className="dropdown" style={{marginLeft: '5px'}}>
                    <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <i className="fas fa-bars" style={{marginRight: '5px'}}></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="profile">
                                <i className="fas fa-user"></i> Profile
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="portal">
                                <i className="fas fa-door-open"></i> Portal
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="calendar">
                                <i className="fas fa-calendar-alt"></i> Calendar
                            </a>
                        </li>
                    </ul>
                </div>
                    {/*-------------------------------Chatbox Toggle Button-------------------------------------*/}
                    <button
                        className="btn btn-info"
                        onClick={this.toggleChatbox}
                        style={{width: '130px', marginTop: '5px', marginRight: '5px'}}
                    >
                        <i className="fas fa-comments" style={{marginRight: '5px'}}></i>
                        {this.state.isChatboxVisible ? "Hide chat" : "Show chat"}
                    </button>
                </div>

                {/*-------------------------------Webcam-------------------------------------*/}
                <div id="main-content" style={{flexGrow: 1, display: 'flex'}}>
                    <div id="video-container"
                         className="position-relative"
                         style={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div id="webcam-container" className="rounded-circle border border-light" style={{
                            position: 'absolute',
                            top: '10px',
                            right: '-130px',
                            width: '150px',
                            height: '150px',
                            display: 'none',
                            overflow: 'hidden',
                            zIndex: 2
                        }}>
                            <video id="webcam-video" autoPlay muted className="w-100 h-100"
                                   style={{objectFit: 'cover'}}></video>
                        </div>
                        {/*-------------------------------Shared screen-------------------------------------*/}
                        <video id="tutorSideVideo" autoPlay className="bg-dark border border-dark"
                               style={{
                                   width: this.state.isChatboxVisible ? '85%' : '100%',
                                   marginTop: '10px',
                                   display: 'block',
                                   marginLeft: '115px',
                                   marginRight: '5px',
                                   position: 'static'
                               }}
                        ></video>
                    </div>

                    {/*-------------------------------Chatbox-------------------------------------*/}
                    <div style={{
                        position: 'relative',
                        width: '20%',
                        marginTop: '20px',
                        marginRight: '10px',
                        marginLeft: '20px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {this.state.isChatboxVisible && (
                            <div id="chatbox" style={{
                                flexGrow: 1,
                                height: '300px',
                                overflowY: 'scroll',
                                border: '1px solid #ccc',
                                padding: '10px'
                            }}>
                                {this.state.messages.map((msg, index) => (
                                    <div key={index}>{msg}</div>
                                ))}
                            </div>
                        )}
                        {this.state.isChatboxVisible && (
                            <div style={{display: 'flex'}}>
                                <input
                                    type="text"
                                    placeholder="Say something"
                                    value={this.state.messageInput}
                                    onChange={this.handleInputChange}
                                    onKeyPress={this.handleKeyPress}
                                    style={{flexGrow: 1}}
                                />
                                <button onClick={this.handleSendMessage} style={{
                                    width: '25%',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    backgroundColor: 'green'
                                }}>Send
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/*-------------------------------Controls and Toggle Buttons-------------------------------------*/}
                <div
                    className="position-absolute bottom-0 start-50 translate-middle-x d-flex justify-content-center mb-1">
                    <button className="btn btn-info me-2  bottom-0  d-flex  mb-3"
                            onClick={this.toggleControls}>
                        <i className={`fas ${this.state.areControlsVisible ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
                    </button>
                    {this.state.areControlsVisible && (
                        <div id="controls" className="d-flex justify-content-center mb-3">
                            <button className="btn btn-primary me-2" id="startScreenShare"
                                    onClick={this.startScreenShare}>
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
                            <button className="btn btn-danger me-2" id="mute-microphone"
                                    onClick={this.unmuteMicrophone}>
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
                    )}
                </div>
            </div>
        );
    }
}

export default ClassSession;
