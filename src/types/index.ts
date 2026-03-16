export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  baseUrl: string;
  logoUrl?: string;
  description?: string;
  isActive: boolean;
}

export interface UserProduct {
  id: string;
  userId: string;
  productId: string;
  externalUserId: string;
  customDomain?: string;
  metadata?: Record<string, any>;
  isActive: boolean;
  product: Product;
  productEmail?: string;
  encryptedPassword?: string;
  apiToken?: string;
  enableMetrics?: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface SSOAccessResponse {
  accessToken: string;
  redirectUrl: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AssignProductData {
  productId: string;
  externalUserId: string;
  customDomain?: string;
  metadata?: Record<string, any>;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
}

export interface ConnectProductData {
  productEmail: string;
  password: string;
  subdomain?: string;
  apiToken?: string;
}

export interface ConnectProductResponse {
  connected: boolean;
  message: string;
  product: { name: string; slug: string };
}

export interface MetricsItem {
  productSlug: string;
  productName: string;
  metrics?: Record<string, any>;
  error?: string;
}

export interface MetricsResponse {
  metrics: MetricsItem[];
}

// Creator Marketplace
export type CreatorPlatform = 'facebook' | 'instagram' | 'tiktok';

export interface CreatorSummary {
  id: string;
  platform: CreatorPlatform;
  username: string;
  name: string;
  profilePictureUrl?: string;
  followersCount: number;
  engagementRate: number;
  categories?: string[];
  isVerified?: boolean;
}

export interface CreatorProfile extends CreatorSummary {
  biography?: string;
  profileUrl?: string;
  coverPhotoUrl?: string;
  interests?: string[];
  email?: string;
  gender?: string;
  ageBucket?: string;
  mediaCount?: number;
  avgLikes?: number;
  avgComments?: number;
  creatorPrice?: number;
  currency?: string;
  medianViews?: number;
  recentMedia?: Array<{
    id: string;
    type: 'IMAGE' | 'VIDEO' | 'CAROUSEL';
    thumbnailUrl?: string;
    caption?: string;
    likeCount: number;
    commentCount: number;
    viewCount?: number;
    timestamp?: string;
  }>;
}

export interface CreatorSearchResult {
  creators: CreatorSummary[];
  paging: {
    cursors?: { before?: string; after?: string };
    hasNextPage: boolean;
  };
  totalCount?: number;
}

// Proposals (Propuesta Comercial Adpro)
export type ProposalStatus = 'pending' | 'processing' | 'done' | 'failed';
export type ProposalClassification = 'HIGH' | 'MEDIUM' | 'LOW';
export type ProposalPlatform = 'linkedin' | 'facebook' | 'instagram' | 'tiktok' | 'twitter';

export interface ProposalListItem {
  id: string;
  linkedinCompanyUrl: string;
  platforms: ProposalPlatform[];
  status: ProposalStatus;
  createdAt: string;
  completedAt?: string;
  companyName?: string;
  companyLogo?: string;
  companyIndustry?: string;
  companyDescription?: string;
}

export interface ProposalEmployee {
  id: string;
  linkedinUrl: string;
  name?: string;
  title?: string;
  location?: string;
  avatar?: string;
  linkedinFollowers: number;
  linkedinArticles: { title?: string; url?: string; likes?: number }[];
  avgArticleLikes: number;
}

export interface ProposalProjection {
  id: string;
  platform: ProposalPlatform;
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgReposts: number;
  currentER: number;
  projectedLikes: number;
  growthFactor: number;
  ambassadorCount: number;
  ambassadorFollowers?: number;
  potentialReach?: number;
  ambassadorAvgLikes: number;
  classification: ProposalClassification;
  recommendations: string[];
}

export interface ProposalDetail extends ProposalListItem {
  adminUserId: string;
  errorMessage?: string;
  company?: {
    id: string;
    name?: string;
    industry?: string;
    description?: string;
    logo?: string;
    website?: string;
    employeeCount?: number;
    followers?: number;
    headquarters?: string;
    linkedinPosts?: { url: string; date_published?: string; likes: number; comments: number; reposts: number; text?: string; imageUrl?: string; contentType?: 'image' | 'document' | 'video' | 'text'; documentTitle?: string; documentPageCount?: number; coverImageUrl?: string }[];
    instagramData?: Record<string, any>;
    facebookData?: Record<string, any>;
    tiktokData?: Record<string, any>;
    twitterData?: Record<string, any>;
  };
  employees: ProposalEmployee[];
  projections: ProposalProjection[];
}

export interface ProposalAIAnalysisResult {
  summary: string;
  platformInsights: { platform: string; insight: string; opportunity: string }[];
  keyBenefits: string[];
  callToAction: string;
}

export interface CreateProposalDto {
  linkedinCompanyUrl?: string;
  companyName?: string;
  platforms?: ProposalPlatform[];
  facebookUrl?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
  twitterHandle?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
