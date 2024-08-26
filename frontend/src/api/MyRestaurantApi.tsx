import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {

    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if(!response.ok) {
            throw new Error("Failed to create restaurant.");
        }

        return response.json();
    };

    const { 
        mutate: createRestaurant, 
        isLoading, 
        isSuccess,
        error } = useMutation(createMyRestaurantRequest);

    if(isSuccess) {
        toast.success("Restaurant Created");
    }

    if(error) {
        toast.error("Unable to update Restaurant");
    }

    return { createRestaurant, isLoading };

};

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const GetMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if(!response.ok) {
            throw new Error("Failed to get restaurant");
        }

        return response.json()
    };

    const {
        data: restaurant,
        isLoading
    } = useQuery("fetchMyRestaurant",GetMyRestaurantRequest);

    return { restaurant, isLoading }; 
};

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData,
        });

        if(!response.ok) {
            throw new Error("Failed to Update Restaurant");
        }

        return response.json();
    };

    const {
        mutate: updateRestaurant,
        isLoading,
        error,
        isSuccess
    } = useMutation(updateRestaurantRequest);

    if(isSuccess) {
        toast.success("Restaurant Updated.");
    }

    if(error) {
        toast.error("Failed to update Restaurant");
    }

    return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0();
    const GetMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });

        if(!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        return response.json();
    }

    const { data: orders, isLoading } = useQuery("fetchMyRestaurantOrders", GetMyRestaurantOrdersRequest);

    return { orders, isLoading };
}

type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
}

export const useUpdateMyRestaurantOrder = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updateMyRestaurantOrder = async (updateOrderStatusRequest: UpdateOrderStatusRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await 
        fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateOrderStatusRequest.orderId}/status`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: updateOrderStatusRequest.status }),
        });

        if(!response.ok) {
            throw new Error('Faild to update status');
        }

        return response.json();
    }

    const {
        mutateAsync: updateRestaurantOrderStatus,
        isLoading,
        error,
        isSuccess,
        reset
    } = useMutation(updateMyRestaurantOrder);

    if(isSuccess) {
        toast.success("Order Updated");
    }

    if(error) {
        toast.error("Unable to update order");
        reset();
    }

    return {updateRestaurantOrderStatus, isLoading};
}