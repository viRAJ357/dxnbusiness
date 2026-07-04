import os
import sys
import subprocess

def handler(event, context):
    """Vercel entry point.
    Starts Streamlit on the port Vercel provides (via the PORT env var).
    """
    port = os.getenv("PORT", "8501")
    # Build the command; disable CORS because Vercel proxies the request.
    cmd = [
        sys.executable, "-m", "streamlit", "run",
        "app.py",
        f"--server.port={port}",
        "--server.enableCORS=false",
        "--server.enableXsrfProtection=false"
    ]
    # Run Streamlit as a subprocess; inherit stdout/stderr so Vercel logs appear.
    process = subprocess.Popen(cmd)
    try:
        process.wait()
    finally:
        process.kill()
    return {"statusCode": 200, "body": "Streamlit terminated."}
