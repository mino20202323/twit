# Twit Starter

This is a starter structure for a social media mobile app built with Expo and React Native. It includes authentication, a simple feed, post creation, likes, comments and profile pages using Firebase services.

## Features

- **Expo Router** navigation.
- **Firebase Authentication** for login and registration.
- **Firestore** for users, posts, likes and comments collections.
- **NativeWind/TailwindCSS** for styling.
- Modular components such as `PostCard`, `CommentBox`, and `ProfileHeader`.

## Firebase Data Structure

```
users/{userId} {
  name: string,
  bio: string,
  photoURL: string,
  followers: number,
  following: number,
  createdAt: timestamp
}

posts/{postId} {
  userId: string,
  authorName: string,
  content: string,
  createdAt: timestamp
}

posts/{postId}/likes/{userId} {
  createdAt: timestamp
}

posts/{postId}/comments/{commentId} {
  userId: string,
  authorName: string,
  text: string,
  createdAt: timestamp
}
```

## Getting Started

1. Install dependencies with `npm install`.
2. Create a Firebase project and fill in the values in `config/firebase.js`.
3. Run the project with `npm start`.

## Components

- **PostCard** – displays a post with like button and comment box.
- **CommentBox** – allows adding a comment to a post.
- **ProfileHeader** – shows user information on profile screens.

This starter provides login and feed screens. You can extend it with additional features such as editing profiles or uploading images.

## Datenschutz und Sicherheit

Dieses Projekt speichert nur die notwendigen Profilinformationen der Nutzer.
Alle Authentifizierungsdaten werden von Firebase verwaltet und Passwörter
werden nicht im Quellcode abgelegt. Für produktive Umgebungen sollten die
Firebase-Schlüssel über Umgebungsvariablen eingebunden werden, um eine sichere
Handhabung personenbezogener Daten zu gewährleisten. Weitere Details zur
Datenschutzkonformität bietet die Firebase-Dokumentation.
