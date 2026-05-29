import { v4 as uuidv4 } from 'uuid';

export interface Document {
  id: string;
  ownerId: string;
  ownerType: 'USER' | 'ORGANIZATION' | 'TRANSACTION' | 'ESCROW' | 'COMPLIANCE';
  type: 'ID' | 'PASSPORT' | 'DRIVERS_LICENSE' | 'UTILITY_BILL' | 'BANK_STATEMENT' | 'CONTRACT' | 'INVOICE' | 'RECEIPT' | 'OTHER';
  name: string;
  mimeType: string;
  size: number;
  url: string;
  status: 'PENDING' | 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED';
  encryptionKey?: string;
  expiresAt?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

class DocumentStore {
  private documents: Map<string, Document> = new Map();

  async create(data: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Promise<Document> {
    const doc: Document = { ...data, id: uuidv4(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.documents.set(doc.id, doc); return doc;
  }

  async get(id: string): Promise<Document | null> { return this.documents.get(id) ?? null; }

  async update(id: string, data: Partial<Document>): Promise<Document> {
    const doc = this.documents.get(id); if (!doc) throw new Error('Document not found');
    const updated = { ...doc, ...data, updatedAt: new Date().toISOString() };
    this.documents.set(id, updated); return updated;
  }

  async getByOwner(ownerId: string, ownerType?: Document['ownerType']): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(d => d.ownerId === ownerId && (!ownerType || d.ownerType === ownerType));
  }

  async delete(id: string): Promise<void> { this.documents.delete(id); }
}

export class DocumentService {
  private store: DocumentStore;
  constructor() { this.store = new DocumentStore(); }

  async upload(data: { ownerId: string; ownerType: Document['ownerType']; type: Document['type']; name: string; mimeType: string; size: number; base64?: string; metadata?: Record<string, unknown> }): Promise<Document> {
    const url = `https://documents.cuboid.io/${uuidv4()}`;
    return this.store.create({ ...data, url, status: 'UPLOADING', metadata: data.metadata ?? {} });
  }

  async processDocument(documentId: string): Promise<Document> {
    return this.store.update(documentId, { status: 'READY' });
  }

  async getDocument(documentId: string): Promise<Document | null> {
    return this.store.get(documentId);
  }

  async getOwnerDocuments(ownerId: string, ownerType?: Document['ownerType']): Promise<Document[]> {
    return this.store.getByOwner(ownerId, ownerType);
  }

  async deleteDocument(documentId: string): Promise<void> {
    return this.store.delete(documentId);
  }

  async generateSignedUrl(documentId: string, expiresIn: number = 3600): Promise<{ url: string; expiresAt: string }> {
    const doc = await this.store.get(documentId);
    if (!doc) throw new Error('Document not found');
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
    return { url: doc.url, expiresAt };
  }
}

export default DocumentService;