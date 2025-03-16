import { inject, Injectable } from '@angular/core';
import { Client, Databases, Storage, ID, Query } from 'appwrite';
import { environment } from '../../environments/environment';
import { AuthService } from './auth/auth.service';
import { Song } from '../shared/models/song.model';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';

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

  uploadFile(file: File, bucketId: string): Observable<string> {
    return from(this.storage.createFile(bucketId, ID.unique(), file)).pipe(
      map((response) => response.$id),
      catchError((error) => {
        console.error('Error uploading file:', error);
        return throwError(
          () => new Error('Failed to upload file. Please try again.')
        );
      })
    );
  }

  async uploadSong(songData: Song) {
    const isAuthenticated = await this.authService.isAuthenticated();

    if (!isAuthenticated) {
      console.error('User not authenticated.');
      return;
    }

    const userId = this.authService.user?.id;

    if (!userId) {
      console.error('User ID not found.');
      return;
    }

    try {
      const response = await this.database.createDocument(
        environment.appwrite.databaseId,
        environment.appwrite.songsCollectionId,
        ID.unique(),
        { ...songData, userId: userId }
      );

      console.log('Song uploaded:', response);
      return response;
    } catch (error) {
      console.error('Error uploading song:', error);
      throw error;
    }
  }

  fetchSongs(): Observable<Song[]> {
    return from(this.authService.isAuthenticated()).pipe(
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          console.error('User not authenticated.');
          return of([]);
        }

        const userId = this.authService.user?.id;
        if (!userId) {
          console.error('User not authenticated.');
          return throwError(() => new Error('User not authenticated'));
        }

        return from(
          this.database.listDocuments(
            environment.appwrite.databaseId,
            environment.appwrite.songsCollectionId,
            [Query.equal('userId', userId)]
          )
        ).pipe(
          map((response) =>
            response.documents.map((doc) => ({
              id: doc.$id,
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
              liked: doc['liked'],
            }))
          ),
          catchError((error) => {
            console.error('Error fetching songs:', error);
            return of([]);
          })
        );
      })
    );
  }

  getFileView(fileId: string, bucketId: string) {
    return this.storage.getFileView(bucketId, fileId);
  }

  async toggleLike(song: Song): Promise<void> {
    const updatedSong = { ...song, liked: !song.liked };

    await this.database.updateDocument(
      environment.appwrite.databaseId,
      environment.appwrite.songsCollectionId,
      song.id,
      { liked: updatedSong.liked }
    );
  }
}
