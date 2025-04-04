from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Path to your vector database
CHROMA_PATH = "chroma"

prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""
You are a medical assistant designed to support healthcare professionals such as doctors, nurses, and clinical staff.
Based on the information provided in the context, answer the question in the **same language** it is asked in.
Your response should be clear, concise, and professional.
If the context does not contain enough information, say so and avoid inventing content.

Context:
{context}

Question:
{question}

Answer (in the same language as the question):
"""
)

def main():
    # Load embedding model (must match what was used to create DB)
    embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    # Load Chroma vector store
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding)
    retriever = db.as_retriever(search_kwargs={"k": 3 , "fetch_k":15 , "lambda_mult":0.5} , search_type='mmr')

    # Set up LLaMA 2 via Ollama (make sure `ollama run llama2` works)
    llm = OllamaLLM(model="mistral")

    # Create the RAG chain
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )

    # Ask your question
    query = input("💬 Enter your question: ")
    result = qa.invoke({"query": query})

    # Print the answer
    print("\n🧠 Answer:")
    print(result["result"])

    # Show sources
    print("\n📚 Sources:")
    for doc in result["source_documents"]:
        print(f"- Page {doc.metadata.get('page')} from {doc.metadata.get('source')} : {doc.page_content}")


if __name__ == "__main__":
    main()
