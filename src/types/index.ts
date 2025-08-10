// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Inventory types
export interface IInventoryItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  supplier?: string;
  email?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInventoryCreatePayload {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  supplier?: string;
  email?: string;
  image?: string;
}

export interface IInventoryUpdatePayload {
  quantity: number;
}

// Authentication types
export interface ILoginCredentials {
  email: string;
}

export interface ILoginResponse {
  token: string;
}

// User types
export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Firebase types
export interface IFirebaseError {
  code: string;
  message: string;
}

// Component Props types
export interface IProtectedRouteProps {
  children: React.ReactNode;
}

export interface IInventoryItemCardProps {
  item: IInventoryItem;
}

// Hook return types
export interface IInventoryHookResult {
  data: IInventoryItem[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface IInventoryItemHookResult {
  data: IInventoryItem | undefined;
  isLoading: boolean;
  error: Error | null;
}

// Mutation types
export interface ICreateItemMutation {
  mutate: (data: IInventoryCreatePayload) => void;
  isLoading: boolean;
  error: Error | null;
}

export interface IUpdateItemMutation {
  mutate: (data: { id: string; data: IInventoryUpdatePayload }) => void;
  isLoading: boolean;
  error: Error | null;
}

export interface IDeleteItemMutation {
  mutate: (id: string) => void;
  isLoading: boolean;
  error: Error | null;
}
