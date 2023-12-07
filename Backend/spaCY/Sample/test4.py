import pdfplumber
import os

pdf_directory = r"C:\Desktop\Projects\SIH-2023\Backend\spaCY\Sample"  # Replace with the correct directory
os.chdir(pdf_directory)

pdf_files = [
    r"DJS22 SY B. Tech Scheme and Syllabus _compressed.pdf",
    r"SY IT Syllabus-11-41.pdf"
]
subject_syllabus = {}

# Define common elements or keywords that indicate syllabus sections
common_elements = ["Subject:", "Course Code:", "Credits:", "Syllabus:"]

for pdf_file in pdf_files:
    if os.path.exists(pdf_file):
        with pdfplumber.open(pdf_file) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()

            # Split text into sections using common elements
            sections = []
            for element in common_elements:
                sections.extend(text.split(element)[1:])

            # Extract syllabus information for each subject
            subject = None
            for section in sections:
                lines = section.split('\n')
                if "Subject:" in lines[0]:
                    subject = lines[0].strip()
                    subject_syllabus[subject] = "\n".join(lines[1:])
    else:
        print(f"File not found: {pdf_file}")

# Print the extracted syllabus information
for subject, syllabus in subject_syllabus.items():
    print(f"Subject: {subject}")
    print(syllabus)
    print("-" * 50)  # Adding a separator for clarity



# Add this before the for loop
print(f"PDF File: {pdf_file}")

# Add this after extracting text from the PDF
print("Extracted Text:")
print(text)
