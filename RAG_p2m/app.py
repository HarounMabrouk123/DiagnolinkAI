from flask import Flask, request, jsonify
from rag_chain import get_rag_chain

from flask_cors import CORS

app = Flask(__name__)

CORS(app)
qa = get_rag_chain()

@app.route("/api/query", methods=["POST"])
def query():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    result = qa.invoke({"query": question})

    sources = [
        {
            "content": doc.page_content,
            "page": doc.metadata.get("page"),
            "source": doc.metadata.get("source")
        }
        for doc in result["source_documents"]
    ]

    return jsonify({
        "response": result["result"],
        "sources": sources
    })

if __name__ == "__main__":
    app.run(debug=True)
