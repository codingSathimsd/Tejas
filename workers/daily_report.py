from blogger_service import post_to_blogger
import datetime

def run_automation():
    # ... (Your existing Supabase & Gemini logic here) ...
    
    report_text = model.generate_content(prompt).text
    
    # Format for Blogger (convert markdown-style to HTML)
    html_report = report_text.replace("\n", "<br>")
    date_str = datetime.date.today().strftime("%B %d, %Y")
    
    # Publish
    post_to_blogger(
        title=f"Attendance Insight Report - {date_str}",
        html_content=f"<h2>Daily Summary</h2><p>{html_report}</p>"
    )

if __name__ == "__main__":
    run_automation()
    
