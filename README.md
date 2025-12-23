<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Charity Management System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        header {
            text-align: center;
            padding: 60px 20px;
            color: white;
            animation: fadeInDown 1s ease-out;
        }

        .logo {
            font-size: 80px;
            animation: bounce 2s infinite;
            display: inline-block;
        }

        h1 {
            font-size: 3em;
            margin: 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .tagline {
            font-size: 1.3em;
            opacity: 0.95;
            max-width: 800px;
            margin: 0 auto;
        }

        .content {
            background: white;
            border-radius: 20px;
            padding: 40px;
            margin: 20px 0;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            animation: fadeInUp 1s ease-out;
        }

        .section {
            margin: 50px 0;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
        }

        .section:nth-child(1) { animation-delay: 0.1s; }
        .section:nth-child(2) { animation-delay: 0.2s; }
        .section:nth-child(3) { animation-delay: 0.3s; }
        .section:nth-child(4) { animation-delay: 0.4s; }
        .section:nth-child(5) { animation-delay: 0.5s; }

        h2 {
            font-size: 2em;
            color: #667eea;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        h2::before {
            content: attr(data-icon);
            font-size: 1.2em;
            animation: pulse 2s infinite;
        }

        h3 {
            font-size: 1.5em;
            color: #764ba2;
            margin: 25px 0 15px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }

        .feature-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            border-radius: 15px;
            color: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }

        .feature-icon {
            font-size: 3em;
            margin-bottom: 15px;
            display: block;
            animation: float 3s ease-in-out infinite;
        }

        .feature-card:nth-child(2) .feature-icon { animation-delay: 0.5s; }
        .feature-card:nth-child(3) .feature-icon { animation-delay: 1s; }
        .feature-card:nth-child(4) .feature-icon { animation-delay: 1.5s; }

        .objectives-list {
            list-style: none;
            padding: 0;
        }

        .objectives-list li {
            padding: 15px;
            margin: 10px 0;
            background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
            border-radius: 10px;
            color: white;
            transform: translateX(-20px);
            opacity: 0;
            animation: slideInLeft 0.5s ease-out forwards;
        }

        .objectives-list li:nth-child(1) { animation-delay: 0.1s; }
        .objectives-list li:nth-child(2) { animation-delay: 0.2s; }
        .objectives-list li:nth-child(3) { animation-delay: 0.3s; }
        .objectives-list li:nth-child(4) { animation-delay: 0.4s; }
        .objectives-list li:nth-child(5) { animation-delay: 0.5s; }

        .objectives-list li::before {
            content: "✓ ";
            font-weight: bold;
            margin-right: 10px;
        }

        .tech-badge {
            display: inline-block;
            padding: 8px 16px;
            margin: 5px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 20px;
            font-size: 0.9em;
            transition: transform 0.3s ease;
        }

        .tech-badge:hover {
            transform: scale(1.1);
        }

        .divider {
            height: 3px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            margin: 40px 0;
            border-radius: 2px;
            animation: expandWidth 1s ease-out;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }

        @keyframes expandWidth {
            from { width: 0; }
            to { width: 100%; }
        }

        .info-box {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            padding: 25px;
            border-radius: 15px;
            color: white;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .architecture-box {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 15px;
            border-left: 5px solid #667eea;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }

        .security-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        .security-item {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            border-radius: 10px;
            color: white;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .security-item:hover {
            transform: scale(1.05);
        }

        .security-icon {
            font-size: 2.5em;
            margin-bottom: 10px;
            display: block;
        }

        footer {
            text-align: center;
            padding: 40px 20px;
            color: white;
            font-size: 0.9em;
        }

        @media (max-width: 768px) {
            h1 { font-size: 2em; }
            .logo { font-size: 50px; }
            .content { padding: 20px; }
        }
    </style>
</head>
<body>
    <header>
        <div class="logo">🌱</div>
        <h1>Charity Management System</h1>
        <p class="tagline">Streamline charity operations, donation handling, and user management with transparency between donors, administrators, and beneficiaries</p>
    </header>

    <div class="container">
        <div class="content">
            <div class="section">
                <h2 data-icon="📖">About the Project</h2>
                <p>The <strong>Charity Management System</strong> is a web-based application developed to support charities in managing donations, campaigns, users, and administrative tasks through a centralized platform.</p>
                <p>Traditional charity operations often rely on manual tracking and fragmented systems. This project digitizes those processes, ensuring <strong>transparency, scalability, and ease of use</strong>.</p>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2 data-icon="🎯">Project Objectives</h2>
                <ul class="objectives-list">
                    <li>Digitize charity and donation management</li>
                    <li>Provide a transparent system for donors</li>
                    <li>Simplify administrative workflows</li>
                    <li>Improve trust and accountability</li>
                    <li>Ensure secure handling of user and donation data</li>
                </ul>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2 data-icon="✨">Key Features</h2>
                
                <div class="features-grid">
                    <div class="feature-card">
                        <span class="feature-icon">👥</span>
                        <h3 style="color: white;">User Management</h3>
                        <ul>
                            <li>User registration and authentication</li>
                            <li>Role-based access control</li>
                            <li>Secure login & session handling</li>
                        </ul>
                    </div>

                    <div class="feature-card">
                        <span class="feature-icon">💰</span>
                        <h3 style="color: white;">Donation Management</h3>
                        <ul>
                            <li>Record and track donations</li>
                            <li>Donation history for donors</li>
                            <li>Campaign-wise donation tracking</li>
                        </ul>
                    </div>

                    <div class="feature-card">
                        <span class="feature-icon">📢</span>
                        <h3 style="color: white;">Campaign Management</h3>
                        <ul>
                            <li>Create, update, and manage charity campaigns</li>
                            <li>Campaign status monitoring</li>
                            <li>Goal tracking and progress visibility</li>
                        </ul>
                    </div>

                    <div class="feature-card">
                        <span class="feature-icon">🛠</span>
                        <h3 style="color: white;">Admin Dashboard</h3>
                        <ul>
                            <li>Manage users and charities</li>
                            <li>View analytics and reports</li>
                            <li>Approve or monitor activities</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2 data-icon="🔒">Security Features</h2>
                <div class="security-grid">
                    <div class="security-item">
                        <span class="security-icon">🔐</span>
                        <strong>Encrypted Authentication</strong>
                    </div>
                    <div class="security-item">
                        <span class="security-icon">🛡️</span>
                        <strong>Secure API Endpoints</strong>
                    </div>
                    <div class="security-item">
                        <span class="security-icon">✅</span>
                        <strong>Input Validation</strong>
                    </div>
                </div>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2 data-icon="🏗">System Architecture</h2>
                <div class="info-box">
                    <strong>Client–Server Architecture</strong>
                    <p>The project follows a modern client-server architecture ensuring scalability and maintainability.</p>
                </div>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2 data-icon="💻">Technology Stack</h2>
                <p><strong>Frontend:</strong></p>
                <div>
                    <span class="tech-badge">React</span>
                    <span class="tech-badge">HTML5</span>
                    <span class="tech-badge">CSS3</span>
                    <span class="tech-badge">JavaScript</span>
                </div>
                <p style="margin-top: 20px;"><strong>Backend:</strong></p>
                <div>
                    <span class="tech-badge">Node.js</span>
                    <span class="tech-badge">Express</span>
                    <span class="tech-badge">MongoDB</span>
                </div>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2 data-icon="📚">Getting Started</h2>
                <div class="architecture-box">
                    <p><strong>Installation Steps:</strong></p>
                    <p>1. Clone the repository</p>
                    <p>2. Install dependencies: npm install</p>
                    <p>3. Configure environment variables</p>
                    <p>4. Run the application: npm start</p>
                </div>
            </div>

            <div class="divider"></div>

            <div class="section">
                <h2 data-icon="🚀">Future Enhancements</h2>
                <div class="info-box">
                    <p>🔹 Mobile application development</p>
                    <p>🔹 Advanced analytics and reporting</p>
                    <p>🔹 Integration with payment gateways</p>
                    <p>🔹 Multi-language support</p>
                    <p>🔹 AI-powered donation recommendations</p>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p>Made with ❤️ for making a difference in the world</p>
        <p>© 2024 Charity Management System. All rights reserved.</p>
    </footer>
</body>
</html>
