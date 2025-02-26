import { Injectable } from '@angular/core';
import { Clerk } from '@clerk/clerk-js';
import { UserResource } from '@clerk/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClerkService {
  private clerk!: Clerk;

  private userSubject = new BehaviorSubject<UserResource | null>(null);
  user$: Observable<UserResource | null> = this.userSubject.asObservable();

  constructor() {
    this.clerk = new Clerk(
      'pk_test_dXB3YXJkLWJ1bm55LTc0LmNsZXJrLmFjY291bnRzLmRldiQ'
    );
    this.clerk
      .load()
      .then(() => {
        this.userSubject.next(this.clerk.user!);
        this.clerk.addListener(({ user }) => {
          this.userSubject.next(user!);
        });
      })
      .catch(console.error);
  }

  openSignIn() {
    return this.clerk.openSignIn();
  }

  openSignUp() {
    return this.clerk.openSignUp();
  }

  signOut() {
    return this.clerk.signOut();
  }

  get user() {
    return this.clerk.user;
  }
}
