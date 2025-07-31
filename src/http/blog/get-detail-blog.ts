import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Blog } from "@/types/blog/blog";

interface GetDetailBlogResponse {
  data: Blog;
}

export const GetDetailBlogHandler = async (
  slug: string
): Promise<GetDetailBlogResponse> => {
  const { data } = await api.get<GetDetailBlogResponse>(`/blogs/${slug}`);

  return data;
};

export const useGetDetailBlog = (
  slug: string,
  options?: Partial<UseQueryOptions<GetDetailBlogResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["blog-detail", slug],
    queryFn: () => GetDetailBlogHandler(slug),
    ...options,
  });
};
