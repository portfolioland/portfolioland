
![PLICON](https://github.com/portfolioland/portfolioland/assets/174016628/542d533c-9b02-4f87-b0e0-da4278f87a0d)

## Disclaimer: The Repository is a Prototyp and does not scale infinitly.

Welcome to **Portfolioland**, a web application designed to empower students of the Kunsthochschule Kassel to independently present their works on a dedicated website.

## About Portfolioland

**Portfolioland** is a tool that enables art students to create and manage their online portfolios. This platform is designed to be user-friendly, allowing students to showcase their projects, artworks, and other creative outputs in a professional and visually appealing manner.

## Features

- **User-friendly Interface**: Easy-to-navigate interface for creating and managing portfolios.
- **Media Support**: Supports a wide range of media types, including images, videos, and audio files.
- **Secure and Private**: Options to control the privacy of your portfolio.

## Getting Started

### Prerequisites

To run Portfolioland locally, you'll need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) 

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/portfolioland/portfolioland.git
    cd portfolioland
    ```

2. **Install dependencies:**

    ```bash
    cd ./Frontend
    npm install
    ```
3. .env in Frontend
   ```bash
    touch .env
    nano .env
   ```
   ## .env-content
   ```JS
   PB_URL = "http://127.0.0.1:8090/"
   PUBLIC_PB_URL ="http://127.0.0.1:8090/"
   PUBLIC_TEST_ACCOUNT ="test@test.com"
   PUBLIC_TEST_ACCOUNT_PW ="4MPzan1N6PONYa0"
   REGISTERPW = "register"
   //! ADMIN ACCOUNT AND PW NEED TO BE CHANGED WHEN DEPLOYING
   PB_Admin_Account = "test@test.de"
   PB_Admin_PW = "LaI7eojY07bvQGeYhgazvQrKaHKcXVog"
   ```

1. **For Localfun Run the development server:**
   
   Run the Pocketbase instance via:
    ``` bash
    cd /Backend
    ./pocketbase serve
    ```
5. ensure Pocketbase is running. Pocketbase-Adminpanel should run on:  
   
    http://localhost:8090/_

6. Move to the Frontendfolder
    ```bash
    cd /Frontend
    npm run dev 
    ```

7. **Open your browser and navigate to:**
   
    http://localhost:5713


8. You should now see the Portfolioland application running locally.

## Usage

1. **Create an Account**: Sign up using your email or social media accounts.
2. **Set Up Your Profile**: Add personal details, a profile picture, and a bio.
3. **Add Projects**: Upload your artworks, projects, and other creative works. Provide descriptions, media files, and other relevant details.
4. **Publish and Share**: Once your portfolio is ready, publish it and share the link with others.

## License

This project is licensed under the CC0 1.0 Universal - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

The development of Portfolioland was conducted as part of a third-party funded project by the University of Kassel and the Kunsthochschule Kassel. The project, titled "Digitale Portfolio- und Ausstellungsformate," was supported by the "Innovation in der Hochschullehre" foundation.

For more information, visit [Portfolioland-Toolbase](https://toolbase.portfolioland.org).
