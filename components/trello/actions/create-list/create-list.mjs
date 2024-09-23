import app from "../../trello.app.mjs";

export default {
  key: "trello-create-list",
  name: "Create a List",
  description: "Creates a new list. [See the documentation](https://developer.atlassian.com/cloud/trello/rest/api-group-lists/#api-lists-post).",
  version: "0.2.0",
  type: "action",
  props: {
    app,
    idBoard: {
      type: "string",
      label: "Board ID",
      description: "The long ID of the board the list should be created on.",
      propDefinition: [
        app,
        "board",
      ],
    },
    name: {
      type: "string",
      label: "Name",
      description: "Name for the list.",
    },
    idListSource: {
      type: "string",
      label: "List Source ID",
      description: "ID of the list to copy into the new list.",
      optional: true,
      propDefinition: [
        app,
        "lists",
        ({ idBoard }) => ({
          board: idBoard,
        }),
      ],
    },
    pos: {
      propDefinition: [
        app,
        "pos",
      ],
    },
  },
  methods: {
    createList(args = {}) {
      return this.app.post({
        path: "/lists",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createList,
      name,
      idBoard,
      idListSource,
      pos,
    } = this;

    const response = await createList({
      $,
      params: {
        name,
        idBoard,
        idListSource,
        pos,
      },
    });

    $.export("$summary", "Successfully created list.");

    return response;
  },
};
