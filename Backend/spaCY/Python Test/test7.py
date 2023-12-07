import spacy
from pdfminer.high_level import extract_text
from collections import Counter
import os

# Load the English language model
nlp = spacy.load("en_core_web_sm")

# Define a function to extract noun phrases (common phrases) from text
def extract_phrases(text):
    doc = nlp(text)
    # Define a list to store extracted phrases
    phrases = []
    # Extract noun phrases (2-4 words)
    for chunk in doc.noun_chunks:
        # Check if the chunk consists of 2-4 words
        if 4 <= len(chunk) <= 5:
            phrases.append(chunk.text)
    return phrases

# Define a function to extract phrases from a PDF file
def extract_phrases_from_pdf(pdf_path):
    try:
        pdf_text = extract_text(pdf_path)
        phrases = extract_phrases(pdf_text)
        return phrases
    except Exception as e:
        print(f"Error processing PDF '{pdf_path}': {str(e)}")
        return []

# List of PDF file paths
pdf_files = [
    './Sample/DJS22 SY B. Tech Scheme and Syllabus _compressed.pdf',
    './Sample/SY Syllabus III & IV Sem(SVU) updated July 2022.pdf',
    './Sample/SEM-3-new.pdf',
    # Add more PDF file paths as needed
]

# Create a list to store all extracted phrases across all PDFs
all_phrases = []

# Extract phrases from each PDF and aggregate them
for pdf_file in pdf_files:
    phrases = extract_phrases_from_pdf(pdf_file)
    all_phrases.extend(phrases)

# Count the frequency of each phrase
phrase_counts = Counter(all_phrases)

# List the most common phrases
most_common_phrases = phrase_counts.most_common(50)  # Change 10 to the desired number

# Print the most common phrases
for phrase, count in most_common_phrases:
    print(f"Phrase: '{phrase}', Count: {count}")
