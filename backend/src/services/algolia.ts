import { algoliasearch } from "algoliasearch";
import dotenv from "dotenv";

dotenv.config();

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID || "",
  process.env.ALGOLIA_API_KEY || ""
);

export default algoliaClient;
