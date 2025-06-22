import { ApiRequest } from "@/utils/api-request";
import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";

const useReactQuery = () => {

  const queryClient = useQueryClient();
  
  const postQuery: UseMutationResult<any, any, { endpoint: string, payload?: any, refreshEndpoint?: string|string[] }> = useMutation({
      mutationFn: ({ endpoint, payload }: { endpoint: string, payload?: any, refreshEndpoint?: string|string[] }) => {
          return ApiRequest({ endpoint, method: "POST", payload })
      },
          onSuccess: (data, variables, context) => {
            const refreshEndpoints = Array.isArray(variables.refreshEndpoint)
            ? variables.refreshEndpoint
            : variables.refreshEndpoint
            ? [variables.refreshEndpoint]
            : [];
          refreshEndpoints.forEach((endpoint) => {
            queryClient.invalidateQueries({ queryKey: [endpoint] }); // Invalidate each query key
          }); // Refresh GET data after POST
    },
  })

const getQueryInstance = async (endpoint: string) => {
  return await queryClient.fetchQuery({
    queryKey: [endpoint],
    queryFn: async () => {
            const response = await ApiRequest({ endpoint, method: "GET" });
            return response; // Ensure that only `data` is returned
        },
    //staleTime: 1000 * 60 * 5, // ✅ Cache is fresh for 5 minutes
  });
};

  const getQuery = (endpoint: string, staleTime?: number) => {
    const params = endpoint.split('?')[0];
    return useQuery({
       queryKey: [endpoint, params],
        queryFn: async () => {
            const response = await ApiRequest({ endpoint, method: "GET" });
            return response; // Ensure that only `data` is returned
        },
        refetchInterval: false,
        //staleTime: 1000 * 60 * 1, // 5 minutes caching
    });
};
  
  return {
    postQuery,
    getQuery,
    getQueryInstance
  }
}

export default useReactQuery
