import pdfplumber
import os

pdf_directory = r"C:\Desktop\Projects\SIH-2023\Backend\spaCY\Sample"  # Replace with the correct directory
os.chdir(pdf_directory)

pdf_files = [
    r"DJS22 SY B. Tech Scheme and Syllabus _compressed.pdf",
    r"SY IT Syllabus-42-63.pdf"
]

# Create a list to store table headings
table_headings = []

for pdf_file in pdf_files:
    if os.path.exists(pdf_file):
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                # Extract the text from the current page
                text = page.extract_text()
                
                # Split text into lines
                lines = text.split("\n")
                
                # Iterate through lines to find table headings
                for line in lines:
                    if line.strip().endswith(":"):
                        table_headings.append(line.strip())
    else:
        print(f"File not found: {pdf_file}")

# Print the extracted table headings
for heading in table_headings:
    print(heading)
