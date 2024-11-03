import os

import chromadb
import numpy as np

client = chromadb.Client()
collection = client.get_or_create_collection(name="docstore", metadata={'hnsw:space': 'cosine'})

docs = []
ids = []

for filename in os.listdir('/Users/nnhien/src/ideate/docs'):
    path = os.path.join('/Users/nnhien/src/ideate/docs', filename)
    ids.append(filename)
    with open(path, 'r') as file:
        docs.append('\n'.join(file.readlines()))

collection.add(documents=docs, ids=ids)

results = collection.query(query_texts=docs, n_results=4)

similarities = 1 - np.array(results['distances'])
similarities = np.delete(similarities, 0, 1)

cutoff = np.quantile(similarities, 0.70)

for i, matched_ids in enumerate(results['ids']):
    doc_id = matched_ids[0]
    matched_ids = np.array(matched_ids)[1:]
    similarities = 1 - np.array(results["distances"][i][1:])
    similarities = np.where(similarities >= cutoff, similarities, 0)
    edges = np.nonzero(similarities)

    print(f'{doc_id}: {matched_ids[edges]} {similarities[edges]}')
