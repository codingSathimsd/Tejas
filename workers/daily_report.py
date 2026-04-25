import os
import datetime
from supabase import create_client
import google.generativeai as genai

# Load Secrets from Environment
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
GEMINI_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Clients
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
genai.configure(api_key=GEMINI_KEY)

def generate_report():
    # 1. Fetch yesterday's data
    yesterday = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()
    
    # Query attendance for all organizations
    response = supabase.table("attendance").select("*, profiles(full_name)").eq("date", yesterday).execute()
    data = response.data

    if not data:
        print("No attendance data found for yesterday.")
        return

    # 2. Process with Gemini
    model = genai.GenerativeModel('gemini-pro')
    prompt = f"Analyze this attendance data and provide a concise summary of who was present, who was late, and any trends: {data}"
    
    summary = model.generate_content(prompt)
    print(f"Daily Summary Generated:\n{summary.text}")
    
    # 3. (Optional) Save summary back to Supabase or send via Email/Blogger
    # ... logic here ...

if __name__ == "__main__":
    generate_report()
  
