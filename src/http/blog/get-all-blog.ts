import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Blog } from "@/types/blog/blog";

interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

interface GetAllBlogResponse {
  data: Blog[];
  pagination: PaginationMeta;
}

export interface GetAllBlogParams {
  page?: number;
}

export const GetAllBlogHandler = async (
  params?: GetAllBlogParams
): Promise<GetAllBlogResponse> => {
  const { data } = await api.get<GetAllBlogResponse>("/blogs", {
    params,
  });

  return data;
};

export const useGetAllBlog = (
  params?: GetAllBlogParams,
  options?: Partial<UseQueryOptions<GetAllBlogResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["blog-list", params],
    queryFn: () => GetAllBlogHandler(params),
    ...options,
  });
};
