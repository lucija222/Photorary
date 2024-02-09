This project is still in development.

## Run Photorary
`npm install` and `npm start`


## About app
### API
- **Unsplash API** used for data has a quota of 50 calls per hour. If you encounter any issues, it is likely due to hitting this quota. Please try again in the next hour. <br />

### Design
- The design and concept and implementation of the app are original. The intention was to create an environment reminiscent of photographs adorningv a wall in a cozy space. <br />
- The SVGS at the bottom of the page are custom made using Inkscape. <br />
- The lamp includes a toggle button to control the lighting. Future versions may extend this feature to include a dark mode option. <br />

### Layout
- The photo grid dynamically adjusts width and column count, ensuring the elegant display across various viewport sizes, starting from a minimum width of 223 pixels. Additionally, it can easily be further optimized to accomodate even smaller viewports. <br />
- Each column in the grid utilizes a flexbox container, ensuring images of all sizes and ratios fit seamlessly while preserving a cohesive layout without any unwanted gaps. <br />
- The fixed position of the header provides easy access and navigation throughout the app. <br />

### Functionalities
- Explore the feed to discover newly uploaded photographs. <br />
- Download your favorite photographs with a single click. <br />
- View photographer profiles to explore more of their work, connect with them on social media and view their portfolios. <br />
- Utilize the search feature to discover photographs and users based on your specific interests.  <br />