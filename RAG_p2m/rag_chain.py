# rag_chain.py
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

CHROMA_PATH = "chroma"

prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""
You are a medical assistant designed to support healthcare professionals.
Answer the question using only the information provided in the context below.
If the context does not contain enough information to answer the question, say: "The context does not provide enough information to answer this question."
Do not make up information or rely on outside knowledge.

Context:
{context}

Question:
{question}

Answer (same language as the question):
"""
)

def get_rag_chain():
    embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding)
    retriever = db.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 4, "fetch_k": 15, "lambda_mult": 0.5}
    )
    llm = OllamaLLM(
        model="mistral",
        streaming=True,
        model_kwargs={
            "temperature": 0.7,
            "top_p": 0.9,
            "max_tokens": 1024
        }
    )

    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )
