/**
 * Type for a page or layout server component's props
 *
 * @param TParams Type for the URL parameter
 * @param TSearchParams Type for the search parameters
 */
export interface PageProps<TParams = {}, TSearchParams = {}> {
  // URL parameters
  params?: TParams;
  // Search parameters
  searchParams?: TSearchParams;
}
