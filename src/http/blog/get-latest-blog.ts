import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Blog } from "@/types/blog/blog";

interface GetAllLatestBlogResponse {
  data: Blog;
}

export const GetAllLatestBlogHandler =
  async (): Promise<GetAllLatestBlogResponse> => {
    const { data } = await api.get<GetAllLatestBlogResponse>("/blogs/latest");

    return data;
  };

export const useGetAllLatestBlog = (
  options?: Partial<UseQueryOptions<GetAllLatestBlogResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["blog-latest"],
    queryFn: () => GetAllLatestBlogHandler(),
    ...options,
  });
};
