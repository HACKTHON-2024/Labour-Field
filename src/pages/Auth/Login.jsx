import React, { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        // Add network status monitoring
        window.addEventListener('online', handleNetworkChange);
        window.addEventListener('offline', handleNetworkChange);

        const loginContainer = document.getElementById('login-container');
        const passwordContainer = document.getElementById('password-container');
        const otpContainer = document.getElementById('otp-container');

        const continueButton = document.getElementById('continue-button');
        const passwordContinueButton = document.getElementById('password-continue');
        const otpButton = document.getElementById('otp-button');
        const otpLoginButton = document.getElementById('otp-login');
        const resendButton = document.getElementById('resend1');
        const goBackLink = document.getElementById('go-back-link');
        const goBackPasswordLink = document.getElementById('go-back-password');

        let isEmail = false; // This will store whether the input is email or mobile number

        // Event listener for Continue button
        continueButton.addEventListener('click', function () {
            const identifier = document.getElementById('email-input').value;

            // Simple validation
            if (!identifier) {
                showMessage('error', 'Input Required', 'Please enter email or mobile number');
                return;
            }

            // Check if input is an email or mobile number
            isEmail = identifier.includes('@');

            // Show password screen
            loginContainer.classList.add('hidden');
            passwordContainer.classList.remove('hidden');
        });

        // Event listener for Password Continue button
        passwordContinueButton.addEventListener('click', async function () {
            const password = document.getElementById('password-input').value;
            const identifier = document.getElementById('email-input').value;

            if (!password) {
                showMessage('error', 'Input Required', 'Please enter your password');
                return;
            }

            // Send login request
            try {
                const response = await fetch('https://labourfieldtest.onrender.com/landowner/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier, password })
                });

                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem('jwt', result.token);
                    showMessage('success', 'Success!', 'Logged in successfully');
                    
                    // Redirect after message is shown
                    setTimeout(() => {
                        window.location.href = "../job_listing/index.html";
                    }, 2000);
                } else {
                    showMessage('error', 'Login Failed', result.message || "Invalid credentials");
                }
            } catch (error) {
                showMessage('error', 'Error', 'Error logging in. Please try again.');
            }
        });

        // Event listener for OTP button (Get OTP)
        otpButton.addEventListener('click', async function () {
            const identifier = document.getElementById('email-input').value;

            if (!identifier) {
                showMessage('error', 'Input Required', 'Please enter email or mobile number');
                return;
            }

            try {
                // Validate if the user exists (email or mobile number)
                const validateResponse = await fetch('https://labourfieldtest.onrender.com/landowner/validate-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier })
                });

                const validateResult = await validateResponse.json();

                if (!validateResponse.ok) {
                    // User does not exist, show an error message
                    showMessage('error', 'User Not Found', validateResult.message || 'User does not exist in the system');
                    return;
                }

                // User exists, now send OTP
                const route = isEmail ? 'https://labourfieldtest.onrender.com/mail_otp/send-otp' : 'https://labourfieldtest.onrender.com/otp/send-otp';
                const response = await fetch(route, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier })
                });

                const result = await response.json();

                if (response.ok) {
                    // Show OTP container
                    passwordContainer.classList.add('hidden');
                    otpContainer.classList.remove('hidden');
                    showMessage('success', 'OTP Sent', 'OTP has been sent successfully');
                } else {
                    showMessage('error', 'Failed', result.message || "Failed to send OTP");
                }
            } catch (error) {
                showMessage('error', 'Error', 'Error sending OTP');
            }
        });

        // Event listener for OTP Login button (Verify OTP)
        otpLoginButton.addEventListener('click', async function () {
            const otp = document.getElementById('otp-input').value;
            const identifier = document.getElementById('email-input').value;

            if (!otp) {
                showMessage('error', 'Input Required', 'Please enter the OTP');
                return;
            }

            try {
                const route = isEmail ? 'https://labourfieldtest.onrender.com/mail_otp/verify-otp' : 'https://labourfieldtest.onrender.com/otp/verify-otp';
                const response = await fetch(route, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier, otp })
                });

                const result = await response.json();
                if (response.ok) {
                    const loginResponse = await fetch('https://labourfieldtest.onrender.com/landowner/signin_by_otp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ identifier })
                    });

                    const loginResult = await loginResponse.json();
                    if (loginResponse.ok) {
                        localStorage.setItem('jwt', loginResult.token);
                        showMessage('success', 'Success!', 'Logged in successfully');
                        
                        // Redirect after message is shown
                        setTimeout(() => {
                            window.location.href = "../job_listing/index.html";
                        }, 2000);
                    } else {
                        showMessage('error', 'Login Failed', loginResult.message || "Login failed");
                    }
                } else {
                    showMessage('error', 'Verification Failed', result.message || "OTP verification failed");
                }
            } catch (error) {
                showMessage('error', 'Error', 'Error verifying OTP. Please try again.');
            }
        });

        // Event listener for Resend OTP
        resendButton.addEventListener('click', async function () {
            const identifier = document.getElementById('email-input').value;

            try {
                const route = isEmail ? 'https://labourfieldtest.onrender.com/mail_otp/send-otp' : 'https://labourfieldtest.onrender.com/otp/send-otp';
                const response = await fetch(route, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier })
                });

                if (response.ok) {
                    showMessage('success', 'OTP Resent', 'OTP has been resent successfully');
                } else {
                    showMessage('error', 'Failed', 'Failed to resend OTP');
                }
            } catch (error) {
                showMessage('error', 'Error', 'Error resending OTP. Please try again.');
            }
        });

        // Go back links
        goBackLink.addEventListener('click', function () {
            passwordContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
        });

        goBackPasswordLink.addEventListener('click', function () {
            otpContainer.classList.add('hidden');
            passwordContainer.classList.remove('hidden');
        });

        // Add event listener for Enter key on email input
        document.getElementById('email-input').addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                continueButton.click(); // Simulate a click on the continue button
            }
        });

        // Add event listener for Enter key on password input
        document.getElementById('password-input').addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                passwordContinueButton.click(); // Simulate a click on the password continue button
            }
        });

        // Add event listener for Enter key on OTP input
        document.getElementById('otp-input').addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                otpLoginButton.click(); // Simulate a click on the OTP login button
            }
        });

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('online', handleNetworkChange);
            window.removeEventListener('offline', handleNetworkChange);
        };
    }, []);

    // Function to handle network changes
    function handleNetworkChange(event) {
        // You can add any specific actions you want to take on network change here
    }

    function showMessage(type, title, message) {
        const overlay = document.getElementById('messageOverlay');
        const messageBox = overlay.querySelector('.message-content');
        const icon = overlay.querySelector('.message-content i');
        const titleElement = overlay.querySelector('h3');
        const messageElement = overlay.querySelector('p');

        // Set message type (success or error)
        icon.className = type === 'success' 
            ? 'fas fa-check-circle success-icon'
            : 'fas fa-exclamation-circle error-icon';

        // Set content
        titleElement.textContent = title;
        messageElement.textContent = message;

        // Show overlay
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('show'), 10);

        // Auto hide after 3 seconds
        setTimeout(() => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }, 3000);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center" style={{
            fontFamily: 'Roboto, sans-serif',
            background: `linear-gradient(rgba(148, 231, 145, 0.5), rgba(255, 255, 255, 0.6)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399') center/cover no-repeat fixed`
        }}>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>LabourField Profile</title>
            <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            
            <main className="p-4 w-full">
                <div className="max-w-md mx-auto my-6" id="login-container" style={{ marginTop: '80px', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden">
                        <h2 className="text-green-700 font-serif text-3xl mb-6 relative">LandOwner Log In</h2>
                        <div className="mb-4">
                            <input type="text" placeholder="Email or Mobile phone number" id="email-input" className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-200" />
                        </div>
                        <button id="continue-button" className="w-full py-3 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">Continue</button>
                        <div className="mt-4 text-center">
                            <p>Don't have an account? <a href="#" className="text-green-700 font-medium">Sign up</a></p>
                        </div>
                    </div>
                </div>
                <div className="hidden" id="password-container">
                    <div className="max-w-md mx-auto my-4">
                        <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden">
                            <h2 className="text-green-700 font-serif text-3xl mb-6 relative">Enter Password</h2>
                            <div className="mb-4">
                                <input type="password" placeholder="Password" id="password-input" className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-200" />
                            </div>
                            <button id="password-continue" className="w-full py-3 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">Continue</button>
                            <div className="text-center my-4">
                                <span className="text-gray-600">OR</span>
                            </div>
                            <button id="otp-button" className="w-full py-3 bg-white text-green-700 border-2 border-green-700 rounded-lg font-medium shadow-md hover:bg-green-100 transition-all duration-300">Get an OTP</button>
                            <div className="mt-4 text-center">
                                <a href="#" className="text-green-700 font-medium" id="go-back-link">Go Back</a>
                                <p>Don't have an account? <a href="#" className="text-green-700 font-medium">Sign up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden" id="otp-container">
                    <div className="max-w-md mx-auto my-4">
                        <div className="bg-white bg-opacity-95 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden">
                            <h2 className="text-green-700 font-serif text-3xl mb-6 relative">Verify and log in</h2>
                            <p className="text-center text-gray-600 mb-4">Enter the OTP sent to your mobile 90031XXXXX</p>
                            <div className="mb-4">
                                <input type="text" maxLength={4} placeholder="Enter 4 digit PIN" id="otp-input" className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-200" />
                            </div>
                            <button id="otp-login" className="w-full py-3 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">Login</button>
                            <div className="mt-4 text-center">
                                <a href="#" className="text-green-700 font-medium" id="resend1">Resend OTP</a>
                                <a href="#" className="text-green-700 font-medium" id="go-back-password">Go Back</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50 hidden" id="messageOverlay">
                <div className="bg-white p-8 rounded-lg shadow-lg flex items-center gap-4 max-w-md">
                    <div className="text-3xl text-green-700">
                        <i className="fas fa-check-circle" />
                    </div>
                    <div className="message-content">
                        <h3 className="text-lg font-bold text-gray-800"></h3>
                        <p className="text-gray-600"></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;