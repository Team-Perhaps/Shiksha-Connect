import requests
from bs4 import BeautifulSoup
import pdfplumber

pdf_url = "https://www.ugc.gov.in/oldpdf/Consolidated%20list%20of%20All%20Universities.pdf"  # Replace with the actual URL.

def extract_text_from_pdf(url):
    try:
        with pdfplumber.open(url) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return None

def find_btech_universities(text):
    # Implement your scraping logic here.
    # Search for universities and B.Tech programs information in the extracted text.

    # Example:
    # if "B.Tech" in text:
    #     # Extract and print relevant information.
    #     print("B.Tech program found in the text.")

    # You'll need to analyze the PDF content structure and adapt the logic accordingly.

# Start the scraping process.
if __name__ == "__main__":
    pdf_text = extract_text_from_pdf(pdf_url)
    find_btech_universities(pdf_text)
