import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Blog } from "@/types/blog/blog";

interface GetSearchBlogResponse {
  data: Blog[];
}

export interface GetSearchBlogParams {
  q?: string;
}

export const GetSearchBlogHandler = async (
  params?: GetSearchBlogParams
): Promise<GetSearchBlogResponse> => {
  const { data } = await api.get<GetSearchBlogResponse>("/blogs/search", {
    params,
  });

  return data;
};

export const useGetSearchBlog = (
  params?: GetSearchBlogParams,
  options?: Partial<UseQueryOptions<GetSearchBlogResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["search-blog-list", params],
    queryFn: () => GetSearchBlogHandler(params),
    ...options,
  });
};
