from PyPDF2 import PdfReader
import re

# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    pdf_reader = PdfReader(pdf_path)

    for page in pdf_reader.pages:
        text += page.extract_text()

    return text

# Function to extract subtopics based on the provided structure
def extract_subtopics(text):
    subtopics = []
    
    # Split the text by lines
    lines = text.split('\n')
    
    # Initialize variable to track the current subtopic
    current_subtopic = ""

    for line in lines:
        # Check if the line starts with "1.1" or similar (indicating a subtopic)
        if re.match(r'\d+\.\d+', line):
            current_subtopic = line.strip()
        else:
            current_subtopic += " " + line.strip()  # Append to the current subtopic
            if current_subtopic:
                subtopics.append(current_subtopic)

    return subtopics

# Path to the PDF file
pdf_path = 'D:\SIH-2023\Backend\spaCY\Sample\SY IT Syllabus-11-41.pdf'

# Extract text from the PDF
pdf_text = extract_text_from_pdf(pdf_path)

# Extract subtopics based on the provided structure
subtopics = extract_subtopics(pdf_text)

# Print extracted subtopics
for subtopic in subtopics:
    print(f"Subtopic: {subtopic}")
