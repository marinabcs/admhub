import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

const COLLECTION_NAME = 'documentos';

export function useDocuments(filters = {}) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    let q = query(collection(db, COLLECTION_NAME), orderBy('dataValidade', 'asc'));

    if (filters.categoria) {
      q = query(collection(db, COLLECTION_NAME),
        where('categoria', '==', filters.categoria),
        orderBy('dataValidade', 'asc')
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          dataEmissao: doc.data().dataEmissao?.toDate?.() || null,
          dataValidade: doc.data().dataValidade?.toDate?.() || null,
          createdAt: doc.data().createdAt?.toDate?.() || null,
          updatedAt: doc.data().updatedAt?.toDate?.() || null,
        }));

        // Filtros client-side para status e criticidade
        if (filters.status) {
          docs = docs.filter((doc) => doc.status === filters.status);
        }
        if (filters.criticidade) {
          docs = docs.filter((doc) => doc.criticidade === filters.criticidade);
        }

        setDocuments(docs);
        setLoading(false);
      },
      (err) => {
        console.error('Erro ao buscar documentos:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [filters.categoria, filters.status, filters.criticidade]);

  const addDocument = useCallback(async (data) => {
    try {
      const docData = {
        ...data,
        dataEmissao: data.dataEmissao ? Timestamp.fromDate(new Date(data.dataEmissao)) : null,
        dataValidade: data.dataValidade ? Timestamp.fromDate(new Date(data.dataValidade)) : null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
      return { id: docRef.id, ...docData };
    } catch (err) {
      console.error('Erro ao adicionar documento:', err);
      throw err;
    }
  }, []);

  const updateDocument = useCallback(async (id, data) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...data,
        dataEmissao: data.dataEmissao ? Timestamp.fromDate(new Date(data.dataEmissao)) : null,
        dataValidade: data.dataValidade ? Timestamp.fromDate(new Date(data.dataValidade)) : null,
        updatedAt: Timestamp.now(),
      };
      await updateDoc(docRef, updateData);
      return { id, ...updateData };
    } catch (err) {
      console.error('Erro ao atualizar documento:', err);
      throw err;
    }
  }, []);

  const deleteDocument = useCallback(async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return id;
    } catch (err) {
      console.error('Erro ao excluir documento:', err);
      throw err;
    }
  }, []);

  // Contagem de documentos pendentes (a_vencer ou vencido)
  const pendingCount = documents.filter(
    (doc) => doc.status === 'a_vencer' || doc.status === 'vencido'
  ).length;

  return {
    documents,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    pendingCount,
  };
}

export default useDocuments;
