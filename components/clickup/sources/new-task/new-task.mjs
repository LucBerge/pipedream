import builder from "../../common/builder.mjs";
import common from "../common/common.mjs";
import sampleEmit from "./test-event.mjs";

export default {
  ...common,
  key: "clickup-new-task",
  name: "New Task (Instant)",
  description: "Emit new event when a new task is created",
  version: "0.1.5",
  dedupe: "unique",
  type: "source",
  props: {
    ...common.props,
    spaceId: {
      propDefinition: [
        common.props.app,
        "spaces",
        (c) => ({
          workspaceId: c.workspaceId,
        }),
      ],
    },
    listWithFolder: {
      optional: true,
      propDefinition: [
        common.props.app,
        "listWithFolder",
      ],
    },
  },
  additionalProps: builder.buildListProps({
    listPropsOptional: true,
  }),
  methods: {
    ...common.methods,
    _getMeta({ task_id: taskId }) {
      return {
        id: taskId,
        summary: String(taskId),
        ts: Date.now(),
      };
    },
    _getEventsList() {
      return [
        "taskCreated",
      ];
    },
  },
  async run(httpRequest) {
    console.log("Event received");
    this.checkSignature(httpRequest);

    const { body } = httpRequest;
    const { listId } = this;
    if (listId) {
      const { task_id: taskId } = body;
      const { list: { id } } = await this.app.getTask({
        taskId,
      });

      if (id !== listId) return;
    }

    this.$emit(body, this._getMeta(body));
  },
  sampleEmit,
};
