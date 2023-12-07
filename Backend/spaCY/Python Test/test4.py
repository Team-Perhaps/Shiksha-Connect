import pdfplumber
import re

def find_module(pdf_path, keyword):
    # Open the PDF file
    with pdfplumber.open(pdf_path) as pdf:
        # Initialize an empty list to store the modules
        modules = []

        # Iterate over each page in the PDF
        for page in pdf.pages:
            # Extract tables from the page
            tables = page.extract_tables()

            # Iterate over each table
            for table in tables:
                # Iterate over each row in the table
                for row in table:
                    # Iterate over each cell in the row
                    for cell in row:
                        # If the cell contains the keyword
                        if keyword in str(cell):
                            # clean_text = text.filter(lambda obj: obj["object_type"] == "char" and "Bold" in obj["fontname"])
                            # Use a regular expression to find the module
                            bold_pattern = r'\*([^*]+)\*'
                            match = re.search(bold_pattern, str(cell))
                            module = re.search(r'\b[A-Z]+\b', str(cell))
                            if module:
                                # Add the module to the list
                                modules.append(module.group())
                            if match:
                                bold_text = match.group(1)
                                print("Found bold text:", bold_text)
                            else:
                                print("No bold text found.")
        # Return the list of modules
        return modules

# Test the function
print(find_module('D:\SIH-2023\Backend\spaCY\Sample\SY IT Syllabus-11-41.pdf', 'Data Structures'))
