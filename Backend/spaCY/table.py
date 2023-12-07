import tabula

pdf_file_path = 'D:\Data\Codes\SIH-2023\Backend\spaCY\Sample\SY IT Syllabus-11-41.pdf'

tables = tabula.read_pdf(pdf_file_path, pages='all', multiple_tables=True)

for table in tables:
    print(table)