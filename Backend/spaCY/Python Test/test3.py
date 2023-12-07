import fitz  # PyMuPDF
import re

# Function to extract module names in bold containing the keyword
def extract_modules_with_keyword(pdf_file_path, keyword):
    doc = fitz.open(pdf_file_path)
    
    module_names = []
    current_module = ""
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        blocks = page.get_text("blocks")
        
        for b in blocks:
            text = b[4]  # Text content
            font_name = b[5]  # Font name

            # Check if the font name contains "Bold" or "Bold" variations (case-insensitive)
            if re.search(r'\bBold\b', font_name, re.IGNORECASE):
                # Extract the module name from the bold text
                module_match = re.search(r'\b(.+?):\b', text)
                if module_match:
                    current_module = module_match.group(1).strip()
                    continue

            # Check if the keyword exists in the extracted text
            if keyword in text and current_module:
                module_names.append(current_module)

    return module_names

# Example usage
pdf_file_path = '   ' 
search_keyword = input("Enter the keyword to search for: ")
module_names_with_keyword = extract_modules_with_keyword(pdf_file_path, search_keyword)

if module_names_with_keyword:
    print(f"Modules containing the keyword '{search_keyword}':")
    for module_name in module_names_with_keyword:
        print(module_name)
else:
    print(f"No modules containing the keyword '{search_keyword}' were found in the PDF.")
