from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from typing import List
import os
import shutil


# Paths
CHROMA_PATH = "chroma"
DATA_PATH = "data/"  # Folder containing your PDFs


def main():
    generate_data_store()


def generate_data_store():
    documents = load_documents()
    chunks = split_text(documents)
    save_to_chroma(chunks)


def load_documents():
    loader = DirectoryLoader(
        DATA_PATH,
        glob="*.pdf",
        loader_cls=PyPDFLoader
    )
    documents = loader.load()
    print(f"✅ Loaded {len(documents)} documents.")
    return documents


def split_text(documents: List[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=100,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"📄 Split {len(documents)} documents into {len(chunks)} chunks.")

    # Show an example chunk
    example = chunks[10]
    print("🔍 Example chunk:\n", example.page_content[:300])
    print("📌 Metadata:", example.metadata)

    return chunks


def save_to_chroma(chunks: List[Document]):
    # Delete previous DB if it exists
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

    # Use a local embedding model
    embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    db = Chroma.from_documents(
        chunks,
        embedding,
        persist_directory=CHROMA_PATH
    )
    db.persist()
    print(f"✅ Saved {len(chunks)} chunks to {CHROMA_PATH}.")


if __name__ == "__main__":
    main()
