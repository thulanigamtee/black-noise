import { inject, Injectable } from '@angular/core';
import { Client, Databases, Storage, ID } from 'appwrite';
import { environment } from '../../environments/environment';
import { AuthService } from './auth/auth.service';
import { Song } from '../shared/models/song.model';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private client: Client;
  private database: Databases;
  private storage: Storage;

  private authService = inject(AuthService);

  constructor() {
    this.client = new Client()
      .setEndpoint(environment.appwrite.endpoint)
      .setProject(environment.appwrite.projectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);

    this.authService.user$.subscribe((user) => {
      if (user) this.saveUserData();
    });
  }

  async saveUserData() {
    const user = this.authService.user;
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

  async saveSong(songData: Song) {
    return this.database.createDocument(
      environment.appwrite.databaseId,
      environment.appwrite.songsCollectionId,
      ID.unique(),
      songData
    );
  }

  async fetchSongs(): Promise<Song[]> {
    try {
      const response = await this.database.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.songsCollectionId
      );

      return response.documents.map((doc) => ({
        title: doc['title'],
        artist: doc['artist'],
        thumbnail: this.getFileView(
          doc['thumbnail'],
          environment.appwrite.thumbnailBuckedId
        ),
        audio: this.getFileView(
          doc['audio'],
          environment.appwrite.audioBucketId
        ),
      }));
    } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
    }
  }

  getFileView(fileId: string, bucketId: string) {
    return this.storage.getFileView(bucketId, fileId);
  }
}
