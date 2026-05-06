import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export const ContentStatus = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const ContentType = z.enum(['PAGE', 'ARTICLE', 'BLOG', 'CASE_STUDY', 'DOCUMENTATION', 'FAQ']);

export const ContentSchema = z.object({
  id: z.string(),
  type: ContentType,
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  status: ContentStatus,
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  publishedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Content = z.infer<typeof ContentSchema>;
export type ContentStatus = z.infer<typeof ContentStatus>;
export type ContentType = z.infer<typeof ContentType>;

export interface BlogPost extends Content {
  type: 'BLOG';
  featuredImage?: string;
  readTime?: number;
}

export interface Documentation extends Content {
  type: 'DOCUMENTATION';
  category: string;
  order: number;
}

export interface FAQ extends Content {
  type: 'FAQ';
  question: string;
  answer: string;
}

class CMSStore {
  private content: Map<string, Content> = new Map();
  private slugIndex: Map<string, string> = new Map();

  async create(data: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>): Promise<Content> {
    const now = new Date().toISOString();
    const item: Content = {
      ...data,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    this.content.set(item.id, item);
    this.slugIndex.set(item.slug, item.id);
    return item;
  }

  async get(id: string): Promise<Content | null> {
    return this.content.get(id) ?? null;
  }

  async getBySlug(slug: string): Promise<Content | null> {
    const id = this.slugIndex.get(slug);
    return id ? this.content.get(id) ?? null : null;
  }

  async update(id: string, data: Partial<Content>): Promise<Content> {
    const existing = this.content.get(id);
    if (!existing) throw new Error('Content not found');
    const updated: Content = { ...existing, ...data, updatedAt: new Date().toISOString() };
    this.content.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const existing = this.content.get(id);
    if (existing) {
      this.slugIndex.delete(existing.slug);
      this.content.delete(id);
    }
  }

  async list(params?: {
    type?: ContentType;
    status?: ContentStatus;
    tags?: string[];
    limit?: number;
  }): Promise<Content[]> {
    let items = Array.from(this.content.values());

    if (params?.type) items = items.filter(i => i.type === params.type);
    if (params?.status) items = items.filter(i => i.status === params.status);
    if (params?.tags?.length) {
      items = items.filter(i => params.tags!.some(t => i.tags.includes(t)));
    }

    items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    if (params?.limit) items = items.slice(0, params.limit);
    return items;
  }
}

export class CMSService {
  private store: CMSStore;

  constructor() {
    this.store = new CMSStore();
    this.seedContent();
  }

  private async seedContent() {
    const defaultContent: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        type: 'PAGE',
        slug: 'home',
        title: 'Cuboid — Institutional Economic Infrastructure',
        description: 'Trust infrastructure for the movement of value across Africa.',
        content: '<h1>Welcome to Cuboid</h1><p>Building the future of African financial infrastructure.</p>',
        author: 'system',
        tags: ['home', 'landing'],
        status: 'PUBLISHED',
        publishedAt: new Date().toISOString(),
      },
      {
        type: 'PAGE',
        slug: 'about',
        title: 'About Cuboid',
        description: 'Learn about our mission and vision.',
        content: '<h1>About Us</h1><p>Cuboid provides institutional infrastructure for African FX.</p>',
        author: 'system',
        tags: ['about', 'company'],
        status: 'PUBLISHED',
        publishedAt: new Date().toISOString(),
      },
      {
        type: 'BLOG',
        slug: 'getting-started',
        title: 'Getting Started with Cuboid',
        description: 'A guide to integrating Cuboid into your application.',
        content: '# Getting Started\n\n## Overview\n\nThis guide will help you get started...',
        author: 'system',
        tags: ['tutorial', 'integration'],
        status: 'PUBLISHED',
        publishedAt: new Date().toISOString(),
      },
      {
        type: 'FAQ',
        slug: 'what-is-cuboid',
        title: 'What is Cuboid?',
        description: '',
        content: 'What is Cuboid?',
        author: 'system',
        tags: ['faq', 'basic'],
        status: 'PUBLISHED',
      },
    ];

    for (const item of defaultContent) {
      await this.store.create(item);
    }
  }

  async getPage(slug: string): Promise<Content | null> {
    return this.store.getBySlug(slug);
  }

  async getBlogPosts(limit?: number): Promise<Content[]> {
    return this.store.list({ type: 'BLOG', status: 'PUBLISHED', limit });
  }

  async getFAQ(): Promise<Content[]> {
    return this.store.list({ type: 'FAQ', status: 'PUBLISHED' });
  }

  async createContent(data: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>): Promise<Content> {
    return this.store.create(data);
  }

  async updateContent(id: string, data: Partial<Content>): Promise<Content> {
    return this.store.update(id, data);
  }

  async publishContent(id: string): Promise<Content> {
    return this.store.update(id, { status: 'PUBLISHED', publishedAt: new Date().toISOString() });
  }

  async search(query: string): Promise<Content[]> {
    const all = await this.store.list({ status: 'PUBLISHED' });
    const q = query.toLowerCase();
    return all.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    );
  }
}

export default CMSService;