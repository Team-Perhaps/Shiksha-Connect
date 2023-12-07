import PyPDF2

# Function to extract all occurrences of a keyword from a PDF
def extract_all_occurrences_from_pdf(pdf_file_path, keyword):
    # Open the PDF file
    pdf_file = open(pdf_file_path, 'rb')

    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)

    # Initialize a list to store the occurrences of the keyword
    keyword_occurrences = []

    # Loop through each page in the PDF
    for page_num in range(pdf_reader.numPages):
        page = pdf_reader.getPage(page_num)
        extracted_text = page.extractText()
        
        # Find all occurrences of the keyword in the extracted text
        occurrences_in_page = [i for i in range(len(extracted_text)) if extracted_text.startswith(keyword, i)]
        keyword_occurrences.extend([(page_num + 1, pos) for pos in occurrences_in_page])

    # Close the PDF file
    pdf_file.close()

    return keyword_occurrences

# Example usage
pdf_file_path = 'D:\SIH-2023\Backend\spaCY\Sample\SY IT Syllabus-11-41.pdf'
keyword_to_search = 'Data Structures'
occurrences = extract_all_occurrences_from_pdf(pdf_file_path, keyword_to_search)

if occurrences:
    print(f"The keyword '{keyword_to_search}' was found at the following page and character positions:")
    for page_num, char_pos in occurrences:
        print(f"Page {page_num}, Character Position {char_pos}")
else:
    print(f"The keyword '{keyword_to_search}' was not found in the PDF.")
