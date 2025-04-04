import React, {Component} from 'react';
import io from 'socket.io-client';
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
            isMicMuted: true,
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
        this.muteMicrophone = this.muteMicrophone.bind(this);
        this.unmuteMicrophone = this.unmuteMicrophone.bind(this);
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

        this.createPeerConnection().then(() => {
            this.createAndSendOffer();
        });
    }
    createPeerConnection = async () => {
        const peerConnection = new RTCPeerConnection(ICE_SERVERS);

        // Set up event listeners for the peer connection
        peerConnection.onicecandidate = this.handleIceCandidate;
        peerConnection.ontrack = this.handleTrackEvent;

        // Store the peer connection in the state
        this.setState({ peerConnection });
    };
    createAndSendOffer = async () => {
        const { peerConnection, sessionId } = this.state;

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        // Emit the offer to the signaling server
        this.socket.emit('offer', { offer, sessionId });
    };


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

            // const peerConnection = new RTCPeerConnection(ICE_SERVERS);
            // this.setState({ peerConnection });
            // screenStream.getTracks().forEach(track => peerConnection.addTrack(track, screenStream));
            // peerConnection.onicecandidate = this.handleIceCandidate;
            // peerConnection.ontrack = this.handleTrackEvent;
            const { peerConnection } = this.state;
            screenStream.getTracks().forEach(track => peerConnection.addTrack(track, screenStream));
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

            const { peerConnection } = this.state;
            if (peerConnection) {
                stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            }

            document.getElementById('stopWebcam').onclick = () => {
                stream.getTracks().forEach((track) => track.stop());
                document.getElementById('webcam-video').srcObject = null;
                this.setState({ webcamActive: false });
                document.getElementById('startWebcam').style.display = 'inline';
                document.getElementById('stopWebcam').style.display = 'none';
                document.getElementById('webcam-container').style.display = 'none';

                if (peerConnection) {
                    peerConnection.getSenders().forEach(sender => {
                        if (sender.track && sender.track.kind === 'video') {
                            peerConnection.removeTrack(sender);
                        }
                    });
                }
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

    muteMicrophone = () => {
        const {micStream} = this.state;
        if (micStream) {
            micStream.getAudioTracks().forEach((track) => (track.enabled = false));
            this.setState({isMicMuted: true});
        }
    };

    unmuteMicrophone = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.setState({micStream: stream, isMicMuted: false});

            // Add microphone stream to the peer connection
            const { peerConnection } = this.state;
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        } catch (error) {
            console.error('Error unmuting microphone:', error);
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
        const {isMicMuted} = this.state;
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh', background: '#e6f2ff'}}>
                <div style={{position: 'relative', flexGrow: 1 }}>

                    {/*-------------------------------Chatbox Toggle Button-------------------------------------*/}
                    <button
                        className="btn"
                        onClick={this.toggleChatbox}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: '#00274d',
                            color: '#fff',
                            margin: '10px',
                            zIndex: 2
                        }}
                    >
                        <i className="fas fa-comments" style={{ marginLeft: '5px' }}></i>
                        {this.state.isChatboxVisible ? "Hide chat" : "Show chat"}
                    </button>
                </div>

                {/*-------------------------------Webcam and Shared Screen-------------------------------------*/}
                <div id="main-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div id="video-container" className="position-relative" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 150px)', width: '85%', margin: 'auto' }}>
                        <div id="webcam-container" className="rounded-circle border border-light" style={{
                            position: 'absolute',
                            top: '0px',
                            right: '85px',
                            width: '150px',
                            height: '150px',
                            display: 'none',
                            overflow: 'hidden',
                            zIndex: 2
                        }}>
                            <video id="webcam-video" autoPlay muted className="w-100 h-100" style={{ objectFit: 'cover' }}></video>
                        </div>
                        <video id="tutorSideVideo" autoPlay className="bg-dark border border-dark" style={{
                            width: '70%',
                            marginRight: '150px',
                            marginTop: '10px',
                            marginBottom: '110px',
                            position: 'relative'
                        }}></video>
                    </div>

                    {/*-------------------------------Chatbox-------------------------------------*/}
                    <div style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        width: '20%',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 2
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
                            <div style={{ display: 'flex' }}>
                                <input
                                    type="text"
                                    placeholder="Say something"
                                    value={this.state.messageInput}
                                    onChange={this.handleInputChange}
                                    onKeyPress={this.handleKeyPress}
                                    style={{ flexGrow: 1 }}
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
                <div className="position-fixed bottom-0 start-50 translate-middle-x d-flex justify-content-center mb-1" style={{ zIndex: 3 }}>
                    <button className="btn me-2 bottom-0 d-flex mb-3"
                            style={{backgroundColor: '#00274d', color: '#fff'}} onClick={this.toggleControls}>
                        <i className={`fas ${this.state.areControlsVisible ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
                    </button>
                    {this.state.areControlsVisible && (
                        <div id="controls" className="d-flex justify-content-center mb-3">
                            <button className="btn me-2" style={{backgroundColor: '#00274d', color: '#fff'}}
                                    id="startScreenShare" onClick={this.startScreenShare}>
                                <i className="fas fa-share-square"></i>
                            </button>
                            <button className="btn btn-danger me-2" id="stopScreenShare" onClick={this.stopScreenShare}
                                    style={{display: this.state.isScreenSharing ? 'block' : 'none'}}>
                                <i className="fas fa-ban"></i>
                            </button>
                            <button className="btn me-2" style={{backgroundColor: '#00274d', color: '#fff'}}
                                    id="startWebcam" onClick={this.startWebcam}>
                                <i className="fas fa-video"></i>
                            </button>
                            <button className="btn btn-danger me-2" id="stopWebcam" style={{display: 'none'}}>
                                <i className="fas fa-ban"></i>
                            </button>
                            {isMicMuted ? (
                                <button className="btn btn-danger me-2" id="mute-microphone"
                                        onClick={this.unmuteMicrophone}>
                                    <i className="fas fa-microphone-slash"></i>
                                </button>
                            ) : (
                                <button className="btn  me-2" style={{backgroundColor: '#00274d', color: '#fff'}}
                                        id="microphone" onClick={this.muteMicrophone}>
                                    <i className="fas fa-microphone"></i>
                                </button>
                            )}
                            <button className="btn  me-2" style={{backgroundColor: '#00274d', color: '#fff'}}
                                    id="startRecording" onClick={this.startRecording}>
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
