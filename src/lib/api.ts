const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.netlify.app/api'
  : 'http://localhost:5000/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    username: string;
    email: string;
    phone: string;
    password: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async sendOTP(type: 'email' | 'mobile', language: string) {
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ type, language }),
    });
  }

  async verifyOTP(otp: string, type: 'email' | 'mobile', language: string) {
    return this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ otp, type, language }),
    });
  }

  // Questions endpoints
  async getQuestions(params?: {
    page?: number;
    limit?: number;
    sort?: string;
    tags?: string[];
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            searchParams.append(key, value.join(','));
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
    }

    return this.request(`/questions?${searchParams.toString()}`);
  }

  async getQuestion(id: string) {
    return this.request(`/questions/${id}`);
  }

  async createQuestion(questionData: {
    title: string;
    body: string;
    tags: string[];
  }) {
    return this.request('/questions', {
      method: 'POST',
      body: JSON.stringify(questionData),
    });
  }

  async voteQuestion(id: string, type: 'upvote' | 'downvote') {
    return this.request(`/questions/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ type }),
    });
  }

  // Answers endpoints
  async getAnswers(questionId: string) {
    return this.request(`/answers/question/${questionId}`);
  }

  async createAnswer(answerData: {
    body: string;
    questionId: string;
  }) {
    return this.request('/answers', {
      method: 'POST',
      body: JSON.stringify(answerData),
    });
  }

  async voteAnswer(id: string, type: 'upvote' | 'downvote') {
    return this.request(`/answers/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ type }),
    });
  }

  // Users endpoints
  async getUser(username: string) {
    return this.request(`/users/${username}`);
  }

  async updateProfile(profileData: {
    bio?: string;
    avatarUrl?: string;
  }) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async addFriend(userId: string) {
    return this.request(`/users/${userId}/friend`, {
      method: 'POST',
    });
  }

  // Feed endpoints
  async getFeedPosts(page = 1, limit = 10) {
    return this.request(`/feed?page=${page}&limit=${limit}`);
  }

  async createFeedPost(postData: {
    caption?: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
  }) {
    return this.request('/feed', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async likeFeedPost(id: string) {
    return this.request(`/feed/${id}/like`, {
      method: 'POST',
    });
  }

  // Tags endpoints
  async getTags(search?: string) {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.request(`/tags${params}`);
  }

  async getPopularTags() {
    return this.request('/tags/popular');
  }

  // Upload endpoint
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/upload', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;