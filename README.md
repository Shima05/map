# Interactive Elevation Map

Welcome to the Interactive Elevation Map project! This web application allows users to explore elevation data for specific locations around the world. By interacting with an intuitive map interface, users can input latitude and longitude coordinates (or click directly on the map) to retrieve real-time elevation information.

The app pulls elevation data from the OpenTopoData API, and uses OpenStreetMap tiles to provide a seamless, interactive experience.

## Features

- **Interactive Map**: Click anywhere on the map to place a marker and retrieve elevation data.
- **Latitude & Longitude Input**: Enter coordinates manually with built-in validation.
- **Elevation Data Fetching**: Elevation information is pulled from the OpenTopoData API.
- **Smooth Map Animations**: The map responds dynamically to user interactions with smooth transitions.
- **Error Handling**: Friendly error messages guide users in case something goes wrong.

## Technologies Used

- **React**: The core framework for building the user interface using reusable components.
- **React-Leaflet**: To easily embed an interactive map with Leaflet.
- **Vite**: A lightning-fast build tool, providing fast hot module replacement and optimized production builds.
- **TypeScript**: Used for type safety to reduce runtime errors and improve developer experience.
- **Leaflet**: A popular JavaScript library for embedding interactive maps.
- **Vitest**: A unit testing framework that ensures our app works as expected.

### Why Vite Over Create React App?

Vite was chosen over Create React App (CRA) for several key reasons:

1. **Faster Development**: Vite provides instant server start times and fast hot module replacement (HMR), which results in a more responsive development process.
2. **Optimized Bundling**: Vite uses **esbuild**, a bundler written in Go, which is significantly faster than the Webpack bundler CRA uses.
3. **Smaller Build Sizes**: Vite produces more efficient production builds with smaller bundle sizes.
4. **Seamless TypeScript Support**: Vite offers built-in TypeScript support, making it easier to set up and maintain the project.

## Components

### 1. `App.tsx`

This is the main entry point for the app. It controls the overall state and renders both the `ElevationForm` and `MapView` components. It coordinates the interaction between the two parts of the app.

### 2. `ElevationForm`

This component allows users to input latitude and longitude coordinates. It ensures the input is valid and triggers the API call to fetch the elevation data when the form is submitted.

### 3. `MapView`

The map interface where users can click to select a location, which updates the latitude and longitude fields automatically. It shows a marker at the selected coordinates and interacts seamlessly with the form.

## Installation and Setup

To get started with the project on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Shima05/map.git
   cd map
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open the App**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app running locally.

## Available Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the app for production.
- **`npm run preview`**: Previews the production build locally.
- **`npm run test`**: Runs the unit tests.
- **`npm run lint`**: Lints the code with ESLint to ensure code quality.

## Deployment

### CI/CD with GitHub Actions

This project includes a CI/CD pipeline powered by GitHub Actions. It runs every time there is a push to the `main` or `develop` branches. The workflow includes:

1. Checking out the code.
2. Installing Node.js and project dependencies.
3. Running lint checks and unit tests.
4. Building the project for production.

The GitHub Action configuration is located in `.github/workflows/github-ci.yml`.

### Vercel Deployment

The project is automatically deployed to **Vercel** every time there is a push to the `main` branch. You can view the live version of the app here: [https://map-flax-six.vercel.app/](https://map-flax-six.vercel.app/)

## Testing

Unit tests are written using **Vitest** to ensure the app functions correctly. To run tests locally:

1. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

2. Run the tests:
   ```bash
   npm run test
   ```

The tests include checks for:

- Validating the latitude and longitude input.
- Ensuring the map updates correctly when coordinates change.
- Confirming that the elevation data is fetched and displayed properly.

## Future Enhancements

Here are a few ideas for how the project can be improved:

- **Multiple Markers**: Allow users to place multiple markers on the map and retrieve elevation data for each one.
- **UI Enhancements**: Make the user interface more engaging with interactive features and custom styles.
- **Caching**: Cache elevation data for frequently requested locations to speed up subsequent requests.
- **Offline Support**: Add offline capabilities using service workers so users can still interact with the map and view previously loaded data without an internet connection.

## License

This project is licensed under the **MIT License**. Please see the [LICENSE](LICENSE) file for more information.

## Contact

If you have any questions or need support, feel free to reach out to me at [shima.bayatifar@gmail.com](mailto:shima.bayatifar@gmail.com). I'm always happy to help!