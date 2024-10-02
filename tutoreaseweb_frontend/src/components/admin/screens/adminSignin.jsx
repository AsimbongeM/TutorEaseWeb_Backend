// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../AuthContext.jsx';
// import { signInAdmin } from '../../services/AdminServices.js';
// import './adminSignin.css';
//
// function AdminSignIn() {
//     const navigate = useNavigate();
//     const { setAuth } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//
//     const handleLogin = async () => { //function to handle login
//         if (!email || !password) {
//             setError('Please enter both email and password');
//             return;
//         }
//
//         try {
//             const response = await signInAdmin(email, password);
//             if (response.status === 200 && response.data) {
//                 setAuth({ ...response.data, role: 'admin' }); // Set authentication data
//                 console.log(response.data)
//                 setError('');
//                 navigate('/Admin-dashboard'); // Navigate to the dashboard
//             } else {
//                 setError('Invalid email or password');
//             }
//         } catch (error) {
//             console.error('Error during sign in:', error);
//             setError('Invalid email or password');
//         }
//     };
//
//     return (
//         <div className="signInContainer">
//             <div className="signInBox">
//                 <h2 className="signInHeading">Admin Portal</h2>
//                 {error && <p className="errorMessage">{error}</p>}
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     className="signInInput"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="signInInput"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                     className="signInButton"
//                     onClick={handleLogin}
//                 >
//                     Sign In
//                 </button>
//             </div>
//         </div>
//     );
// }
//
// export default AdminSignIn;
