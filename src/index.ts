import type admin from "firebase-admin";
import { type Bucket } from "@google-cloud/storage";

export interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export interface ProjectSettings {
  serviceAccountKeyPath: string;
  serviceAccount: ServiceAccount;
}

export const tools = (
  global as unknown as {
    tools: Readonly<{
      projectInfo: ProjectSettings;
      admin: typeof admin;
      app: admin.app.App;
      auth: admin.auth.Auth;
      rtdb: admin.database.Database;
      db: admin.firestore.Firestore;
      storage: admin.storage.Storage;
      bucket: Bucket;
      types: typeof admin.firestore;
    }>;
  }
).tools;
