from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.schema import Document

# Paths
CHROMA_PATH = "chroma"

# Main answer prompt
main_prompt = PromptTemplate(
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

Answer (in the same language as the question):
"""
)

# Verification prompt to check grounding
verification_prompt = PromptTemplate(
    input_variables=["context", "answer"],
    template="""
You're a strict evaluator.

Check whether the following answer is fully supported by the context.
Only respond "YES" if every part of the answer is clearly stated or logically derived from the context. Otherwise, respond "NO".

Context:
{context}

Answer:
{answer}

Supported?:
"""
)

def main():
    # Embeddings
    embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    # Load DB + Retriever
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding)
    retriever = db.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 3, "fetch_k": 15, "lambda_mult": 0.5}
    )

    # LLM with streaming
    llm = OllamaLLM(
        model="mistral",
        callbacks=[StreamingStdOutCallbackHandler()],
        streaming=True
    )

    # Main RAG chain
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": main_prompt}
    )

    # Ask question
    query = input("💬 Enter your question: ")
    result = qa.invoke({"query": query})

    # Answer is streamed, so we don't print result["result"]

    # Show chunks used
    print("\n\n📚 Sources:")
    for doc in result["source_documents"]:
        page = doc.metadata.get("page", "?")
        src = doc.metadata.get("source", "?")
        print(f"- Page {page} from {src}:\n{doc.page_content}\n")

    # === Optional: Check for hallucination ===
    # Extract context
    context = "\n\n".join([doc.page_content for doc in result["source_documents"]])
    answer = result["result"]

    verifier_llm = OllamaLLM(model="mistral")
    verifier_chain = PromptTemplate.from_template(verification_prompt.template).format(context=context, answer=answer)
    verification = verifier_llm.invoke(verifier_chain).strip().lower()

    print("🔎 Hallucination Check:", "✅ Grounded" if "yes" in verification else "❌ Possible Hallucination")


if __name__ == "__main__":
    main()
