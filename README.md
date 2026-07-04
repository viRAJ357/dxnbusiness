# DXN Business Dashboard

A premium Streamlit dashboard showcasing real‑time metrics with a glass‑morphism UI.

## Features
- Modern dark theme with custom colors (see `.streamlit/config.toml`).
- Metric cards for Revenue, Active Users, Conversion Rate.
- Sample line chart of monthly sales.
- Smooth hover animations and subtle footer animation.

## Quick start (local)
```bash
# Clone the repo (if you haven't already)
git clone https://github.com/viRAJ357/dxnbusiness.git
cd dxnbusiness

# Create a virtual environment (optional but recommended)
python -m venv .venv
.venv\Scripts\activate   # PowerShell: .venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the app
streamlit run app.py
```

## Deploy to **Streamlit Community Cloud**
1. Go to <https://share.streamlit.io> and sign in with your GitHub account.
2. Click **“New app”**.
3. Choose the repository **`viRAJ357/dxnbusiness`** and the branch you want to deploy (e.g., `master`).
4. Set **Main file path** to `app.py` (the default). The install command `pip install -r requirements.txt` will be detected automatically.
5. Click **Deploy**.
6. After a successful build you’ll get a live URL like `https://your‑username‑dxnbusiness.streamlit.app` – share this link with anyone.

## Custom domain (optional)
If you have a custom domain, you can map it in the *Settings → Domains* section of your Streamlit Cloud app.

## Screenshots
![Dashboard preview](https://github.com/viRAJ357/dxnbusiness/raw/master/app.png)

---
*Built with love by Antigravity, the advanced agentic coding assistant.*
