import app from "../../app/twitter.app";
import { defineAction } from "@pipedream/types";
import {
  getMultiItemSummary,
  getUserId,
  getTweetFields,
} from "../../common/methods";
import { tweetFieldProps } from "../../common/propGroups";
import { GetUserMentionsParams } from "../../common/types/requestParams";
import {
  PaginatedResponseObject, Tweet,
} from "../../common/types/responseSchemas";

const DOCS_LINK =
  "https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-mentions";
const MIN_RESULTS = 5;
const DEFAULT_RESULTS = 10;
const MAX_RESULTS_PER_PAGE = 100;

export default defineAction({
  key: "twitter-list-mentions",
  name: "List Mentions",
  description: `Return the most recent mentions for the specified user. [See docs here](${DOCS_LINK})`,
  version: "1.0.0",
  type: "action",
  props: {
    app,
    userNameOrId: {
      propDefinition: [
        app,
        "userNameOrId",
      ],
    },
    ...tweetFieldProps,
    maxResults: {
      propDefinition: [
        app,
        "maxResults",
      ],
      min: MIN_RESULTS,
      max: MAX_RESULTS_PER_PAGE * 5,
      default: DEFAULT_RESULTS,
    },
  },
  methods: {
    getMultiItemSummary,
    getUserId,
    getTweetFields,
  },
  async run({ $ }): Promise<PaginatedResponseObject<Tweet>> {
    const userId = await this.getUserId();

    const params: GetUserMentionsParams = {
      $,
      maxPerPage: MAX_RESULTS_PER_PAGE,
      maxResults: this.maxResults,
      params: this.getTweetFields(),
      userId,
    };

    const response = await this.app.getUserMentions(params);
    $.export("$summary", this.getMultiItemSummary("mention", response.data?.length));

    return response;
  },
});
