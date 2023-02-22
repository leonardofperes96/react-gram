import { useState, useEffect } from "react";
import { updateDoc, doc, db } from "../utils/firebase/firebase";

export const useUpdatePhoto = (docCollection) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
 

  const updatePhoto = async (id, data) => {
  
    setLoading(true);

    try {
      const docRef = await doc(db, docCollection, id);

      const updatedDoc = await updateDoc(docRef, data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  

  return { loading, error, updatePhoto };
};
