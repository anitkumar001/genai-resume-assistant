import chromadb
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer

# Load embedding model (downloads automatically on first run)
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Create persistent Chroma database
client = chromadb.PersistentClient(path="chroma_db")

collection = client.get_or_create_collection(
    name="resume_collection"
)


def store_resume(text: str):
    """
    Split resume into chunks, create embeddings,
    and store them in ChromaDB.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_text(text)

    # Clear old resume before adding a new one
    try:
        collection.delete(ids=collection.get()["ids"])
    except Exception:
        pass

    for i, chunk in enumerate(chunks):
        embedding = embedding_model.encode(chunk).tolist()

        collection.add(
            ids=[str(i)],
            documents=[chunk],
            embeddings=[embedding]
        )

    return len(chunks)

def search_resume(query: str, top_k: int = 3):
    """
    Search the most relevant resume chunks.
    """

    query_embedding = embedding_model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results["documents"][0]