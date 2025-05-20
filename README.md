#  Lens Capital

**Open Source Lens Protocol Web 3 Blockchain Social Media**
A leaderboard using 100% public data to rank notable profiles on the Lens Protocol.
Lens Capital is a dynamic leaderboard application that leverages the Lens Protocol API to track, analyze, and display
the most notable and influential profiles within the Lens ecosystem. This tool provides valuable insights into the
Web3 social landscape by ranking profiles based on engagement metrics, following counts, and other relevant data
points.

## ⭐ Features

```
Comprehensive profile rankings based on multiple metrics
Real-time data fetching from Lens Protocol API
Customizable filtering and sorting options
Detailed profile analytics and statistics
Historical trend tracking for profile growth
User-friendly interface with responsive design
Open and transparent ranking methodology
```
##  Technologies Used

Frontend
React.js - UI framework
Next.js - React framework with SSR
Tailwind CSS - Styling
Chart.js - Data visualization
Apollo Client - GraphQL integration
Backend
Node.js - Runtime environment
GraphQL - API queries
Lens Protocol API - Data source
Ethereum/Polygon - Blockchain integration
Web3.js - Blockchain interaction

##  Installation and Setup

Prerequisites
Node.js (v16.x or higher)
npm or yarn
Git
Clone the Repository
git clone https://github.com/sparkidea25/lens-capital.git
cd lens-capital
Install Dependencies
npm install
# or
yarn install
Environment Setup
Create a .env.local file in the root directory with the following variables:
NEXT_PUBLIC_LENS_API_URL=https://api.lens.dev
# Add any other required environment variables
Run Development Server
npm run dev
# or
yarn dev
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

##  Usage Instructions

Viewing the Leaderboard

1. Navigate to the main dashboard to see the current rankings
2. Use the filter options to refine the displayed profiles
3. Sort by different metrics (followers, engagement, etc.)
4. Click on any profile to view detailed statistics
Customizing Views
Toggle between different time frames (daily, weekly, monthly)
Adjust the number of displayed profiles
Save custom views for quick access
Export data in various formats (CSV, JSON)

##  API Integration Details

Lens Capital leverages the Lens Protocol API to fetch comprehensive profile data. The application uses GraphQL
queries to efficiently retrieve only the necessary information.
Key API Endpoints Used
profiles - Fetches profile metadata and statistics
followers - Retrieves follower information
publications - Gets content published by profiles
stats - Collects engagement metrics
Sample GraphQL Query
query ExploreProfiles {
exploreProfiles(request: {
sortCriteria: MOST_FOLLOWERS,
limit: 50
}) {
items {
id
name
handle
bio
stats {
totalFollowers
totalFollowing
totalPosts
totalComments
totalMirrors
}
picture {
... on MediaSet {
original {
url
} } } } } }

##  How it Works

Data Collection Process

1. **API Fetching** : The application queries the Lens Protocol API at regular intervals
2. **Data Processing** : Raw profile data is processed and normalized
3. **Metrics Calculation** : Various ranking metrics are calculated based on the collected data
4. **Ranking Algorithm** : Profiles are ranked using a weighted algorithm that considers multiple factors
5. **Display** : Results are rendered in the user interface with visualization components
Ranking Methodology
Profiles are ranked based on a composite score that takes into account:
Follower count and growth rate
Engagement metrics (comments, mirrors, collects)
Content production frequency and quality
Network influence and connection value
Profile activity consistency

##  Contributing

Contributions to Lens Capital are welcome! Follow these steps to contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature/amazing-feature)
3. Make your changes
4. Commit your changes (git commit -m 'Add some amazing feature')
5. Push to the branch (git push origin feature/amazing-feature)
6. Open a Pull Request
Please ensure your code follows the project's style guidelines and includes appropriate tests.

## ⚖ License

This project is open-source and licensed under the MIT License. For more details, see the LICENSE file.

## ✉ Contact & Support

```
GitHub Issues: Report bugs or request features
Twitter: @sparkidea
Email: contact@example.com
© 2024 Lens Capital | Built with ❤ for the Lens Protocol community
GitHub • Lens Protocol • API Docs
Hecho con Genspark
```

