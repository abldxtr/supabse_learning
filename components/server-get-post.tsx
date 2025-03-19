import { queryOptions } from "@tanstack/react-query";

export const postsOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: async () => {
    const response = await fetch("/api/posts");

    return response.json();
  },
});
