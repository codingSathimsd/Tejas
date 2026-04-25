from google_auth_oauthlib.flow import InstalledAppFlow

# The scope for Blogger access
SCOPES = ['https://www.googleapis.com/auth/blogger']

def get_refresh_token():
    # Replace these with your actual ID and Secret from Step 3
    client_id = "YOUR_CLIENT_ID.apps.googleusercontent.com"
    client_secret = "YOUR_CLIENT_SECRET"
    
    flow = InstalledAppFlow.from_client_config(
        {
            "installed": {
                "client_id": client_id,
                "client_secret": client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SCOPES
    )
    
    # This will open a browser window to log in
    credentials = flow.run_local_server(port=0)
    print(f"\nYOUR REFRESH TOKEN: {credentials.refresh_token}")

if __name__ == "__main__":
    get_refresh_token()
  
