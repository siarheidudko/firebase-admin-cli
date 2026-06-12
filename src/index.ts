import type * as admin from "firebase-admin";
import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Database } from "firebase-admin/database";
import type { Firestore } from "firebase-admin/firestore";
import type { Storage } from "firebase-admin/storage";
import type * as firestoreNs from "firebase-admin/firestore";
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
      app: App;
      auth: Auth;
      rtdb: Database;
      db: Firestore;
      storage: Storage;
      bucket: Bucket;
      types: typeof firestoreNs;
    }>;
  }
).tools;
