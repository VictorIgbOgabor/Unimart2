// src/hooks/useAuth.ts
'use client';
import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthChange } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { User } from '@/types';

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          if (userDoc.exists()) {
            setUser({ id: userDoc.id, ...userDoc.data() } as unknown as User);
          }
        } catch (_) {
          // Firebase not configured - use mock user
          setUser({
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'Student',
            university: 'University of Lagos',
            campus: 'University of Lagos',
            joinedAt: new Date(),
            rating: 4.8,
            totalSales: 12,
            verified: true,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, firebaseUser, loading, isAuthenticated: !!firebaseUser };
}
