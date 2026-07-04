import json

def handler(event, context):
    """Simple sanity‑check endpoint for Vercel.
    Returns a tiny JSON payload so we can confirm the Python function works.
    """
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message": "Vercel‑Python function is alive 👋"})
    }
