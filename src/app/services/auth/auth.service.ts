import { Injectable } from '@angular/core';
import { Clerk } from '@clerk/clerk-js';
import { UserResource } from '@clerk/types';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clerk: Clerk;
  private userSubject = new BehaviorSubject<UserResource | null>(null);
  user$: Observable<UserResource | null> = this.userSubject.asObservable();

  constructor() {
    this.clerk = new Clerk(environment.clerk.publishableKey);
    this.loadClerk();
  }

  loadClerk() {
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

  signIn() {
    return this.clerk.openSignIn();
  }

  signUp() {
    return this.clerk.openSignUp();
  }

  signOut() {
    return this.clerk.signOut();
  }

  get user() {
    return this.clerk.user;
  }

  async isAuthenticated(): Promise<boolean> {
    await this.clerk.load();
    return !!this.clerk.user;
  }
}
