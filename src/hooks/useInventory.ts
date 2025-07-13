import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '../services/inventoryService';
import toast from 'react-hot-toast';

// Query keys
export const INVENTORY_KEYS = {
  all: ['inventory'],
  home: ['inventory', 'home'],
  userItems: (email: string) => ['inventory', 'user', email],
  item: (id: string) => ['inventory', 'item', id],
};

// Custom hooks for inventory operations
export const useInventoryHooks = () => {
  const queryClient = useQueryClient();

  // Get home items
  const useHomeItems = () => {
    return useQuery({
      queryKey: INVENTORY_KEYS.home,
      queryFn: inventoryService.getHomeItems,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get all items
  const useAllItems = () => {
    return useQuery({
      queryKey: INVENTORY_KEYS.all,
      queryFn: inventoryService.getAllItems,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Get item by ID
  const useItemById = (id: string) => {
    return useQuery({
      queryKey: INVENTORY_KEYS.item(id),
      queryFn: () => inventoryService.getItemById(id),
      enabled: !!id,
    });
  };

  // Get user items
  const useUserItems = (email: string) => {
    return useQuery({
      queryKey: INVENTORY_KEYS.userItems(email),
      queryFn: () => inventoryService.getUserItems(email),
      enabled: !!email,
    });
  };

  // Create item mutation
  const useCreateItem = () => {
    return useMutation({
      mutationFn: inventoryService.createItem,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
        queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.home });
        toast.success('Item created successfully');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to create item');
      },
    });
  };

  // Update item mutation
  const useUpdateItem = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => inventoryService.updateItem(id, data),
      onSuccess: (_data: any, variables: { id: string; data: any }) => {
        queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
        queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.home });
        queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.item(variables.id) });
        toast.success('Item updated successfully');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to update item');
      },
    });
  };

  // Delete item mutation
  const useDeleteItem = () => {
    return useMutation({
      mutationFn: inventoryService.deleteItem,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
        queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.home });
        toast.success('Item deleted successfully');
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to delete item');
      },
    });
  };

  return {
    useHomeItems,
    useAllItems,
    useItemById,
    useUserItems,
    useCreateItem,
    useUpdateItem,
    useDeleteItem,
  };
};

// Export individual hooks for convenience
export const useHomeItems = () => {
  return useQuery({
    queryKey: INVENTORY_KEYS.home,
    queryFn: inventoryService.getHomeItems,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAllItems = () => {
  return useQuery({
    queryKey: INVENTORY_KEYS.all,
    queryFn: inventoryService.getAllItems,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useItemById = (id: string) => {
  return useQuery({
    queryKey: INVENTORY_KEYS.item(id),
    queryFn: () => inventoryService.getItemById(id),
    enabled: !!id,
  });
};

export const useUserItems = (email: string) => {
  return useQuery({
    queryKey: INVENTORY_KEYS.userItems(email),
    queryFn: () => inventoryService.getUserItems(email),
    enabled: !!email,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inventoryService.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.home });
      toast.success('Item created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create item');
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => inventoryService.updateItem(id, data),
    onSuccess: (_data: any, variables: { id: string; data: any }) => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.home });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.item(variables.id) });
      toast.success('Item updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update item');
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inventoryService.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.home });
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete item');
    },
  });
};
