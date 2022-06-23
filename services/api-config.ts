/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;
  
  /**
   * The URL NODE of the api.
   */
  url_node: string;
  
  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: process.env.API_URL,
  url_node: process.env.API_URL_NODE,
  timeout: 30000
};
