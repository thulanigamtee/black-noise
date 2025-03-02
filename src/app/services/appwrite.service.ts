import { Injectable } from '@angular/core';
import { Client, Databases, Storage, ID } from 'appwrite';
import { ClerkService } from './clerk.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private client: Client;
  private database: Databases;
  private storage: Storage;

  constructor(private clerkService: ClerkService) {
    this.client = new Client()
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.projectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);

    this.clerkService.user$.subscribe((user) => {
      if (user) {
        this.saveUserData();
      }
    });
  }

  async saveUserData() {
    const user = this.clerkService.user;
    if (!user) return;

    const userData = {
      name: user.firstName,
      email: user.primaryEmailAddress?.emailAddress,
    };

    try {
      const response = await this.database.createDocument(
        environment.appwrite.databaseId,
        environment.appwrite.usersCollectionId,
        user.id,
        userData
      );
      return response;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }

  async uploadFile(file: File, bucketId: string): Promise<string> {
    const response = await this.storage.createFile(bucketId, ID.unique(), file);
    return response.$id;
  }

  async saveSong(songData: any) {
    return this.database.createDocument(
      environment.appwrite.databaseId,
      environment.appwrite.songsCollectionId,
      ID.unique(),
      songData
    );
  }
}
