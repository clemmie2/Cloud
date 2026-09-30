# CloudDroid — GitHub Pages Frontend

A static frontend for a cloud Android service. It is intentionally original and does not copy Redfinger branding, assets, or source code.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload this project.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save.
7. GitHub will provide your Pages URL.

No Node.js server is required for the frontend.

## Connect your backend

Edit:

`js/config.js`

```js
window.CLOUDDROID_CONFIG = {
  API_URL: "https://api.example.com",
  DEMO_MODE: false
};
```

Your API must support CORS for your GitHub Pages origin and should use HTTPS.

Suggested API:

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `GET /api/v1/user`
- `GET /api/v1/user/devices`
- `POST /api/v1/devices`
- `POST /api/v1/devices/:id/start`
- `POST /api/v1/devices/:id/stop`
- `POST /api/v1/devices/:id/restart`
- `POST /api/v1/devices/:id/session`
- `POST /api/v1/devices/:id/files/upload`

## Important architecture note

GitHub Pages is static hosting. It cannot:

- run your API server
- run PostgreSQL
- run Android virtual machines
- run WebRTC media infrastructure by itself
- keep a cloud Android device alive

A production cloud-phone service therefore needs separate infrastructure for the API, database, device workers, and real-time streaming.

## Demo mode

The included frontend runs without a backend. Buttons show demo notifications and the remote-device page displays a clearly labeled mock Android screen.

It does **not** pretend that a real Android VM is running.

## Suggested production architecture

```text
GitHub Pages
    |
    v
Web/API server
    |
    +--> PostgreSQL
    |
    +--> Redis / Queue
    |
    +--> Device Manager
              |
              v
       Android VM workers
              |
              v
       WebRTC / streaming
              |
              v
        User's browser
```

## Security

Never put database passwords, private keys, API secrets, or payment secrets in this repository. Anything shipped to GitHub Pages is public.

Use a backend to protect secrets and enforce authorization.
