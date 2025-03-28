**"Dan'$ €urrency €onverter" Overview**

A robust web-based currency converter that provides real-time exchange rates and comprehensive currency conversion services.

**Technology Used**
Frontend: HTML, CSS, JavaScript
Backend: Node.js with Express
External APIs:
       -Exchange Rates API
          Documentation: https://www.exchangerate-api.com/docs/overview
          Purpose: Primary source for real-time currency exchange rates

**Deployment Architecture**
  **Server Configuration**
Web Server 01: Primary application server
Web Server 02: Backup/load-balanced server
Load Balancer: HAProxy for traffic distribution          
          
**Local Development Setup**
Prerequisites:
-Node.js (v16+ recommended)
-npm (v8+)
-Git

**Installation Steps**
1. Clone the repository (Git clone https://github.com/Orrie-Dan/Api-Project.git)
2. Install dependencies (npm install)
3. Edit .env file with your API keys(nano .env)

   
**Required Environment Variables**
API_KEY:....
API_KEY_URL:`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

**Running the Application Locally**
npm run start:dev
Open http://localhost:3000 in your web browser

**Core Application Features**

Real-time currency conversion
Support for multiple currencies

**Challenges I encountered**
While setting up my web-01 & web-02 servers I encoutered some difficulties seeing my app on the browser but it was because I had cloned my Repo on the root instead of the /var/www/html directory which was causing me not to see it.
But with the help of one of my classmate who pointed it out I was able to rectify it.

**Future Improvements**
1.Create mobile application
2.Add cryptocurrency conversion

**Website**
🔗:https://www.orriedan.tech/Api-Project

**Demo video**

**Contact & Support**
Email:d.nkusi@alusttudent.com

&copy; 2025 Orrie Dan. All rights reserved
