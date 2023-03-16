import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export const ifUserIsSignedIn = async () => {
  const firebaseAuth = inject(Auth);
  const router = inject(Router);
  const isUserSignedIn = await new Promise((resolve) => {
    firebaseAuth.onAuthStateChanged((user) => {
      resolve(user != null);
    });
  });

  if (isUserSignedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const ifUserIsGuess = async () => {
  const firebaseAuth = inject(Auth);
  return await new Promise((resolve) => {
    firebaseAuth.onAuthStateChanged((user) => {
      resolve(user === null);
    });
  });
};
