import os
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

# Constants from Secrets
BLOG_ID = os.getenv("BLOGGER_BLOG_ID")
CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REFRESH_TOKEN = os.getenv("GOOGLE_REFRESH_TOKEN")

def post_to_blogger(title, html_content):
    """Posts the AI summary to Blogger."""
    creds = Credentials(
        token=None,
        refresh_token=REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
    )

    # Refresh the access token automatically
    creds.refresh(Request())

    service = build('blogger', 'v3', credentials=creds)
    
    body = {
        "kind": "blogger#post",
        "title": title,
        "content": html_content
    }

    try:
        posts = service.posts()
        result = posts.insert(blogId=BLOG_ID, body=body).execute()
        print(f"Successfully posted to Blogger: {result.get('url')}")
        return result.get('url')
    except Exception as e:
        print(f"Blogger API Error: {e}")
        return None
      
